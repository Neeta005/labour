import React from 'react';

export interface Category {
  name: string;
  icon: React.FC<{ className?: string }>;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Worker {
  id: number;
  name: string;
  service: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  imageUrl: string;
  verified: boolean;
  description: string;
  skills: string[];
  reviews: Review[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface Booking {
  id: number;
  userId: number;
  worker: Worker;
  date: Date;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string | React.ReactNode;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface PricingEstimate {
  laborEstimate: string;
  materialsEstimate: string;
  totalEstimate: string;
  reasoning: string;
}
