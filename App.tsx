
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedPros from './components/FeaturedPros';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import WorkerProfileModal from './components/WorkerProfileModal';
import BookingModal from './components/BookingModal';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import SmartMatchModal from './components/SmartMatchModal';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';
import ChatbotIcon from './components/ChatbotIcon';
import ChatbotModal from './components/ChatbotModal';
import PricingEstimatorModal from './components/PricingEstimatorModal';

import { WORKERS } from './constants';
import { Worker, User, Booking, ToastMessage } from './types';

type View = 'home' | 'search' | 'dashboard';

const App: React.FC = () => {
    // Page view state
    const [view, setView] = useState<View>('home');

    // Data state
    const [workers] = useState<Worker[]>(WORKERS);
    const [searchResults, setSearchResults] = useState<Worker[]>([]);
    const [searchQuery, setSearchQuery] = useState({ service: '', location: '' });
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    
    // User and booking state
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Modal states
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isSmartMatchModalOpen, setIsSmartMatchModalOpen] = useState(false);
    const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

    // Toast notifications
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    
    useEffect(() => {
        // Mock user persistence
        const storedUser = localStorage.getItem('urbanlink_user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            const userBookings = JSON.parse(localStorage.getItem(`urbanlink_bookings_${user.id}`) || '[]');
            setBookings(userBookings);
        }
    }, []);

    const showToast = (type: ToastMessage['type'], message: string) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, message }]);
    };
    
    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Handlers
    const handleSearch = (service: string, location: string) => {
        setIsLoadingSearch(true);
        setSearchQuery({ service, location });
        setView('search');
        // Simulate API call
        setTimeout(() => {
            const filtered = WORKERS.filter(w => 
                w.service.toLowerCase().includes(service.toLowerCase()) &&
                (location ? w.location.toLowerCase().includes(location.toLowerCase()) : true)
            );
            setSearchResults(filtered);
            setIsLoadingSearch(false);
        }, 1000);
    };

    const handleCategorySelect = (categoryName: string) => {
        handleSearch(categoryName, '');
    };

    const handleViewProfile = (worker: Worker) => {
        setSelectedWorker(worker);
        setIsProfileModalOpen(true);
    };
    
    const handleOpenPricingModal = () => {
        if (selectedWorker) {
            setIsProfileModalOpen(false);
            setIsPricingModalOpen(true);
        }
    };

    const handleBookNow = (worker: Worker) => {
        if (!currentUser) {
            showToast('info', 'Please log in to book a service.');
            setIsLoginModalOpen(true);
            return;
        }
        setSelectedWorker(worker);
        setIsBookingModalOpen(true);
    };

    const handleConfirmBooking = (worker: Worker, date: Date) => {
        if (!currentUser) return;
        const newBooking: Booking = {
            id: Date.now(),
            userId: currentUser.id,
            worker,
            date,
            status: 'Upcoming'
        };
        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem(`urbanlink_bookings_${currentUser.id}`, JSON.stringify(updatedBookings));
        setIsBookingModalOpen(false);

        const formattedDate = date.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        showToast('success', `Booking confirmed with ${worker.name} for ${formattedDate} at ${formattedTime}.`);
        setView('dashboard');
    };

    const handleCancelBooking = (bookingId: number) => {
         if (!currentUser) return;
        // Fix: Use 'as const' to prevent TypeScript from widening the status literal type to string.
        const updatedBookings = bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b);
        setBookings(updatedBookings);
        localStorage.setItem(`urbanlink_bookings_${currentUser.id}`, JSON.stringify(updatedBookings));
        showToast('info', 'Booking has been cancelled.');
    };

    const handleLogin = (email: string, pass: string) => {
        const users = JSON.parse(localStorage.getItem('urbanlink_users') || '{}');
        if (users[email] && users[email].password === pass) {
            const user = users[email];
            setCurrentUser(user);
            localStorage.setItem('urbanlink_user', JSON.stringify(user));
            const userBookings = JSON.parse(localStorage.getItem(`urbanlink_bookings_${user.id}`) || '[]');
            setBookings(userBookings);
            setIsLoginModalOpen(false);
            showToast('success', `Welcome back, ${user.name.split(' ')[0]}!`);
        } else {
             showToast('error', 'Invalid email or password.');
        }
    };

    const handleSignup = (name: string, email: string, pass: string) => {
        const users = JSON.parse(localStorage.getItem('urbanlink_users') || '{}');
        if (users[email]) {
            showToast('error', 'An account with this email already exists.');
            return;
        }
        const newUser: User = { id: Date.now(), name, email, password: pass };
        users[email] = newUser;
        localStorage.setItem('urbanlink_users', JSON.stringify(users));
        setCurrentUser(newUser);
        localStorage.setItem('urbanlink_user', JSON.stringify(newUser));
        setBookings([]);
        setIsSignupModalOpen(false);
        showToast('success', `Welcome, ${name.split(' ')[0]}!`);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('urbanlink_user');
        setView('home');
        showToast('info', 'You have been logged out.');
    };
    
    const handleSmartMatchSelect = (worker: Worker) => {
        setIsSmartMatchModalOpen(false);
        handleViewProfile(worker);
    };

    const renderContent = () => {
        switch (view) {
            case 'search':
                return <SearchResults 
                            workers={searchResults} 
                            isLoading={isLoadingSearch}
                            onViewProfile={handleViewProfile} 
                            onBookNow={handleBookNow} 
                            searchQuery={searchQuery}
                        />;
            case 'dashboard':
                return <Dashboard user={currentUser} bookings={bookings} onCancelBooking={handleCancelBooking} />;
            case 'home':
            default:
                return (
                    <>
                        <Hero onSearch={handleSearch} onOpenSmartMatch={() => setIsSmartMatchModalOpen(true)} showToast={showToast} />
                        <Categories onCategorySelect={handleCategorySelect} />
                        <FeaturedPros onViewProfile={handleViewProfile} onBookNow={handleBookNow} />
                        <HowItWorks />
                    </>
                );
        }
    };

    return (
        <div className="bg-slate-950 text-white min-h-screen font-sans">
            <Header 
                currentUser={currentUser} 
                onLoginClick={() => setIsLoginModalOpen(true)}
                onSignupClick={() => setIsSignupModalOpen(true)}
                onLogout={handleLogout}
                onDashboardClick={() => { if(currentUser) setView('dashboard')}}
                onHomeClick={() => setView('home')}
            />
            <main className="pt-20">
                {renderContent()}
            </main>
            <Footer />

            {/* Modals */}
            <WorkerProfileModal 
                worker={selectedWorker} 
                onClose={() => setIsProfileModalOpen(false)} 
                onBookNow={handleBookNow}
                onGetEstimate={handleOpenPricingModal}
            />
            <BookingModal worker={selectedWorker} onClose={() => setIsBookingModalOpen(false)} onConfirmBooking={handleConfirmBooking} />
            <PricingEstimatorModal 
                isOpen={isPricingModalOpen}
                onClose={() => setIsPricingModalOpen(false)}
                worker={selectedWorker}
            />
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
                onLogin={handleLogin}
                onSwitchToSignup={() => { setIsLoginModalOpen(false); setIsSignupModalOpen(true); }}
            />
            <SignupModal 
                isOpen={isSignupModalOpen} 
                onClose={() => setIsSignupModalOpen(false)} 
                onSignup={handleSignup}
                onSwitchToLogin={() => { setIsSignupModalOpen(false); setIsLoginModalOpen(true); }}
            />
            <SmartMatchModal 
                isOpen={isSmartMatchModalOpen}
                onClose={() => setIsSmartMatchModalOpen(false)}
                workers={workers}
                onWorkerSelect={handleSmartMatchSelect}
            />
            <ChatbotModal 
                isOpen={isChatbotModalOpen}
                onClose={() => setIsChatbotModalOpen(false)}
            />
            {!isChatbotModalOpen && <ChatbotIcon onClick={() => setIsChatbotModalOpen(true)} />}

            {/* Toast Container */}
            <div className="fixed top-24 right-6 z-[100]">
                {toasts.map(toast => (
                    <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </div>
    );
};

export default App;
