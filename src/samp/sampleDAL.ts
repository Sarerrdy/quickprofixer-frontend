// Sample Data Access Layer (DAL) for demo/testing

import { sample } from "../samp/sample";

// --- Fix Requests CRUD ---
export const getAllFixRequests = () => sample.fixRequests; // Return the actual array for persistence

export const getFixRequestById = (id: string | number) =>
  sample.fixRequests.find(r => r.id === id);

export const addFixRequest = (newRequest: any) => {
  sample.fixRequests.push(newRequest);
};

export const updateFixRequest = (id: string | number, updates: any) => {
  const idx = sample.fixRequests.findIndex(r => r.id === id);
  if (idx !== -1) sample.fixRequests[idx] = { ...sample.fixRequests[idx], ...updates };
};

export const deleteFixRequest = (id: string | number) => {
  const idx = sample.fixRequests.findIndex(r => r.id === id);
  if (idx !== -1) sample.fixRequests.splice(idx, 1);
};

// --- Bookings CRUD ---
export const getAllBookings = () => sample.bookings; // Return the actual array for persistence

export const getBookingById = (id: string | number) =>
  sample.bookings.find(b => b.id === id);

export const addBooking = (newBooking: any) => {
  sample.bookings.push(newBooking);
};

export const updateBooking = (id: string | number, updates: any) => {
  const idx = sample.bookings.findIndex(b => b.id === id);
  if (idx !== -1) sample.bookings[idx] = { ...sample.bookings[idx], ...updates };
};

export const deleteBooking = (id: string | number) => {
  const idx = sample.bookings.findIndex(b => b.id === id);
  if (idx !== -1) sample.bookings.splice(idx, 1);
};

// --- Quotes CRUD (example) ---
export const getAllQuotes = () => sample.quotes;

export const addQuote = (newQuote: any) => {
  sample.quotes.push(newQuote);
};

export const updateQuote = (id: string | number, updates: any) => {
  const idx = sample.quotes.findIndex(q => q.id === id);
  if (idx !== -1) sample.quotes[idx] = { ...sample.quotes[idx], ...updates };
};

export const deleteQuote = (id: string | number) => {
  const idx = sample.quotes.findIndex(q => q.id === id);
  if (idx !== -1) sample.quotes.splice(idx, 1);
};

// --- Fixer Booking Status Update ---
// This will update the bookingStatus for a fixer in a fix request
export const updateFixerBookingStatus = (
  fixRequestId: string | number,
  fixerId: string,
  newStatus: string
) => {
  const req = sample.fixRequests.find(r => r.id === fixRequestId);
  if (req) {
    req.fixerStatuses = req.fixerStatuses.map((fs: any) =>
      fs.fixerId === fixerId
        ? { ...fs, bookingStatus: newStatus }
        : fs
    );
  }
};

// --- Book Now: Add booking if not exists and update status in fix request ---
export const bookFixerForRequest = (
  fixRequestId: string | number,
  fixerId: string,
  clientId: string
) => {
  // Do NOT update fixer's status here (leave as "Accepted")
  // Only add booking if not already present
  const exists = sample.bookings.some(
    b => b.fixRequestId === fixRequestId && b.fixerId === fixerId
  );
  if (!exists) {
    sample.bookings.push({
      id: Date.now(), // simple unique id
      fixRequestId: Number(fixRequestId),
      clientId,
      fixerId,
      quoteId: null,
      bookingDate: new Date().toISOString(),
      status: "Pending",
    });
  }
  // Update the request status to "Booked"
  const reqIdx = sample.fixRequests.findIndex(r => r.id === fixRequestId);
  if (reqIdx !== -1) {
    sample.fixRequests[reqIdx] = {
      ...sample.fixRequests[reqIdx],
      status: "Booked",
    };
  }
};