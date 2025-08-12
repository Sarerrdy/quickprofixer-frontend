// Sample data for dashboard design, population, and testing

import { sampleClients } from "./sampleClients";
import { sampleFixers } from "./sampleFixers";
import { sampleFixRequests } from "./sampleFixRequests";
import { sampleBookings } from "./sampleBookings";
import { sampleQuotes } from "./sampleQuotes";

// Dummy sample data for additional types
const samplePayments = [
  {
    id: 401,
    clientId: "client-001",
    fixerId: "fixer-001",
    bookingId: 201,
    amount: 15000,
    clientPaymentStatus: "Paid",
    fixerPaymentStatus: "Received",
    createdAt: "2024-07-25T12:00:00Z",
  },
  {
    id: 402,
    clientId: "client-002",
    fixerId: "fixer-002",
    bookingId: 202,
    amount: 20000,
    clientPaymentStatus: "Paid",
    fixerPaymentStatus: "Received",
    createdAt: "2024-07-20T12:00:00Z",
  },
  {
    id: 403,
    clientId: "client-003",
    fixerId: "fixer-001",
    bookingId: 203,
    amount: 25000,
    clientPaymentStatus: "Pending",
    fixerPaymentStatus: "Pending",
    createdAt: "2024-07-30T12:00:00Z",
  },
];

const sampleInvoices = [
  {
    id: 501,
    clientId: "client-001",
    fixerId: "fixer-001",
    bookingId: 201,
    amount: 15000,
    createdAt: "2024-07-25T12:00:00Z",
    invoiceNumber: "INV-20240725-001",
  },
  {
    id: 502,
    clientId: "client-002",
    fixerId: "fixer-002",
    bookingId: 202,
    amount: 20000,
    createdAt: "2024-07-20T12:00:00Z",
    invoiceNumber: "INV-20240720-002",
  },
  {
    id: 503,
    clientId: "client-003",
    fixerId: "fixer-001",
    bookingId: 203,
    amount: 25000,
    createdAt: "2024-07-30T12:00:00Z",
    invoiceNumber: "INV-20240730-003",
  },
];

const sampleNotifications = [
  {
    id: 601,
    userId: "client-001",
    title: "Booking Confirmed",
    message: "Your booking for 'Fix leaking kitchen sink' is confirmed.",
    type: "Booking",
    isRead: false,
    createdAt: "2024-07-24T09:00:00Z",
    relatedEntityId: "201",
  },
  {
    id: 602,
    userId: "client-002",
    title: "Payment Successful",
    message: "Your payment of ₦20,000 was successful.",
    type: "Payment",
    isRead: true,
    createdAt: "2024-07-20T12:05:00Z",
    relatedEntityId: "402",
  },
  {
    id: 603,
    userId: "client-003",
    title: "Quote Received",
    message: "You have received a new quote for your water heater installation.",
    type: "Quote",
    isRead: false,
    createdAt: "2024-07-28T10:00:00Z",
    relatedEntityId: "303",
  },
];

const sampleFixerRatings = [
  {
    id: 701,
    clientId: "client-001",
    fixerId: "fixer-001",
    rating: 5,
    review: "Excellent work, very professional.",
    createdAt: "2024-07-26T10:00:00Z",
  },
  {
    id: 702,
    clientId: "client-002",
    fixerId: "fixer-002",
    rating: 4,
    review: "Good job, but arrived late.",
    createdAt: "2024-07-21T11:00:00Z",
  },
  {
    id: 703,
    clientId: "client-003",
    fixerId: "fixer-001",
    rating: 5,
    review: "Fast and clean installation.",
    createdAt: "2024-07-31T11:00:00Z",
  },
];

const sampleChatMessages = [
  {
    id: 801,
    senderId: "client-001",
    receiverId: "fixer-001",
    message: "Hi, when will you arrive?",
    sentAt: "2024-07-25T09:00:00Z",
    isRead: true,
    relatedFixRequestId: 101,
  },
  {
    id: 802,
    senderId: "fixer-001",
    receiverId: "client-001",
    message: "I'll be there by 10am.",
    sentAt: "2024-07-25T09:05:00Z",
    isRead: false,
    relatedFixRequestId: 101,
  },
  {
    id: 803,
    senderId: "client-002",
    receiverId: "fixer-002",
    message: "Can you come tomorrow?",
    sentAt: "2024-07-19T18:00:00Z",
    isRead: true,
    relatedFixRequestId: 102,
  },
  {
    id: 804,
    senderId: "fixer-002",
    receiverId: "client-002",
    message: "Yes, I'll be there.",
    sentAt: "2024-07-19T18:10:00Z",
    isRead: true,
    relatedFixRequestId: 102,
  },
  {
    id: 805,
    senderId: "client-003",
    receiverId: "fixer-001",
    message: "When can you install the heater?",
    sentAt: "2024-07-29T08:00:00Z",
    isRead: false,
    relatedFixRequestId: 103,
  },
];

export const sample = {
  clients: sampleClients,
  fixers: sampleFixers,
  fixRequests: sampleFixRequests,
  bookings: sampleBookings,
  quotes: sampleQuotes,
  payments: samplePayments,
  invoices: sampleInvoices,
  notifications: sampleNotifications,
  fixerRatings: sampleFixerRatings,
  chatMessages: sampleChatMessages,
};