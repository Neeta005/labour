
import React from 'react';
import { User, Booking } from '../types';

interface DashboardProps {
    user: User | null;
    bookings: Booking[];
    onCancelBooking: (bookingId: number) => void;
}

const BookingCard: React.FC<{booking: Booking, onCancel: (id: number) => void}> = ({ booking, onCancel }) => {
    const getStatusChipStyle = (status: Booking['status']) => {
        switch (status) {
            case 'Upcoming': return 'bg-cyan-500/20 text-cyan-400';
            case 'Cancelled': return 'bg-red-500/20 text-red-400';
            case 'Completed': return 'bg-slate-500/20 text-slate-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    }

    return (
        <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <img src={booking.worker.imageUrl} alt={booking.worker.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-emerald-400 font-semibold">{booking.worker.service}</p>
                <h3 className="text-xl font-bold text-white">{booking.worker.name}</h3>
                <p className="text-slate-400">Location: {booking.worker.location}</p>
            </div>
            <div className="text-center sm:text-right">
                <p className="font-semibold text-white">{new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-slate-300">{new Date(booking.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                <span className={`mt-2 inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium ${getStatusChipStyle(booking.status)}`}>{booking.status}</span>
            </div>
            {booking.status === 'Upcoming' && (
                <div className="sm:pl-5">
                     <button 
                        onClick={() => onCancel(booking.id)}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 font-bold text-sm py-2 px-4 rounded-lg transition-colors"
                     >
                         Cancel
                     </button>
                </div>
            )}
        </div>
    )
}

const Dashboard: React.FC<DashboardProps> = ({ user, bookings, onCancelBooking }) => {
    if (!user) return null;

    const upcomingBookings = bookings.filter(b => b.status === 'Upcoming').sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="container mx-auto px-6 py-28 min-h-screen">
            <h1 className="text-4xl font-bold text-white">Welcome back, {user.name.split(' ')[0]}!</h1>
            
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-white mb-4">Upcoming Bookings</h2>
                {upcomingBookings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {upcomingBookings.map(booking => (
                            <BookingCard key={booking.id} booking={booking} onCancel={onCancelBooking} />
                        ))}
                    </div>
                ) : (
                     <div className="mt-4 p-8 bg-slate-800 rounded-lg text-center">
                        <h3 className="text-xl text-white font-semibold">No Upcoming Bookings</h3>
                        <p className="text-slate-400 mt-2">You haven't scheduled any services yet. Find a pro to get started!</p>
                    </div>
                )}
            </div>

            {pastBookings.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-4">Booking History</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {pastBookings.map(booking => (
                            <BookingCard key={booking.id} booking={booking} onCancel={onCancelBooking} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
