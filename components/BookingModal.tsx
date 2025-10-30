
import React, { useState } from 'react';
import { Worker } from '../types';

interface BookingModalProps {
    worker: Worker | null;
    onClose: () => void;
    onConfirmBooking: (worker: Worker, date: Date) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ worker, onClose, onConfirmBooking }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    
    if (!worker) return null;

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            const [year, month, day] = selectedDate.split('-').map(Number);
            const [hours, minutes] = selectedTime.split(':').map(Number);
            const bookingDate = new Date(year, month - 1, day, hours, minutes);
            onConfirmBooking(worker, bookingDate);
        } else {
            alert("Please select a date and time.");
        }
    };
    
    // Get tomorrow's date for min attribute of date input
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleBackdropClick}>
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md">
                <div className="p-6 border-b border-slate-700/80 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Book Service</h2>
                     <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                         <img src={worker.imageUrl} alt={worker.name} className="w-16 h-16 rounded-full object-cover"/>
                        <div>
                            <p className="text-slate-300">You are booking:</p>
                            <h3 className="font-bold text-white text-lg">{worker.name}</h3>
                            <p className="text-emerald-400">{worker.service}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-2">Select Date</label>
                            <input type="date" id="date" min={minDate} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full bg-slate-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-2">Select Time</label>
                            <input type="time" id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full bg-slate-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                    </div>
                </div>
                 <div className="flex-shrink-0 p-6 border-t border-slate-700/80 bg-slate-900/50">
                     <button onClick={handleConfirm} className="w-full text-center px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Confirm Booking</button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
