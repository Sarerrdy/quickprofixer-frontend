import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import FixSummaryBar from "../shared/FixSummaryBar";
import FixFilterBar from "../shared/FixFilterBar";
import FixGrid from "../shared/FixGrid";
import FixDetails from "../shared/FixDetails";
import { BOOKING_STATUSES } from "../shared/FixStatuses";
import {
  getAllBookings,
  getAllFixRequests,
  updateBooking,
  updateFixerBookingStatus,
  bookFixerForRequest,
} from "../../../samp/sampleDAL";

const BookingTab = () => {
  // Local state for bookings and fix requests (simulate CRUD)
  const [bookings, setBookings] = useState(getAllBookings());
  const [fixRequests, setFixRequests] = useState(getAllFixRequests());

  // Merge bookings with their related requests for summary
  const bookingsWithRequest = bookings
    .map((booking) => {
      const req = fixRequests.find((r) => r.id === booking.fixRequestId);
      return req
        ? {
            ...req,
            ...booking, // booking fields (including status) override request fields
            bookingDate: booking.bookingDate,
            bookingStatus: booking.status, // always use booking.status
          }
        : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  // Unique service types for filter dropdown
  const serviceTypes = Array.from(
    new Set(bookingsWithRequest.map((r) => r.specialization?.name).filter(Boolean))
  );

  // Example filter state
  const [selectedBookingId, setSelectedBookingId] = useState<string | number | null>(null);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  // Filter logic for bookings
  const filteredBookings = bookingsWithRequest.filter((item) => {
    const matchesService = serviceType === "" || item.specialization?.name === serviceType;
    const matchesStatus =
      status === "" ||
      (item.bookingStatus ? item.bookingStatus === status : item.status === status);
    const scheduleDate = item.preferredSchedule ?? item.bookingDate;
    const matchesDate =
      (!dateFrom || new Date(scheduleDate) >= new Date(dateFrom)) &&
      (!dateTo || new Date(scheduleDate) <= new Date(dateTo));
    return matchesService && matchesStatus && matchesDate;
  });

  // Badges for active filters
  const badges: { label: string; onRemove: () => void }[] = [];
  if (serviceType)
    badges.push({
      label: serviceType,
      onRemove: () => setServiceType(""),
    });
  if (status)
    badges.push({
      label: status,
      onRemove: () => setStatus(""),
    });
  if (dateFrom)
    badges.push({
      label: `From: ${dateFrom}`,
      onRemove: () => setDateFrom(""),
    });
  if (dateTo)
    badges.push({
      label: `To: ${dateTo}`,
      onRemove: () => setDateTo(""),
    });

  // Booking statuses (excluding "Pending")
  const bookingStatuses = BOOKING_STATUSES.filter(s => s !== "Pending");

  // Sort bookings by bookingDate (latest first)
  const sortedBookings = [...filteredBookings].sort(
    (a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
  );

  // Find selected booking
  const selectedBooking = bookingsWithRequest.find((r) => r.id === selectedBookingId);

  // --- CRUD: Update Booking Status ---
  const handleBookingStatusChange = (fixerId: string, status: string) => {
    const booking = bookings.find(b => b.fixerId === fixerId);
    if (!booking) return;
    // Persist to DAL
    updateBooking(booking.id, { status });
    updateFixerBookingStatus(booking.fixRequestId, fixerId, status);
    // Refresh local state for live UI update
    setBookings(getAllBookings());
    setFixRequests(getAllFixRequests());
  };

  // --- CRUD: Book Fixer ---
  const handleBookFixer = (fixerId: string) => {
    if (!selectedBooking) return;
    const req = fixRequests.find(r => r.id === selectedBooking.fixRequestId);
    if (!req) return;
    // Use your DAL to book the fixer
    bookFixerForRequest(selectedBooking.fixRequestId, fixerId, req.clientId);
    // Refresh local state for live UI update
    setBookings(getAllBookings());
    setFixRequests(getAllFixRequests());
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", mx: "auto", py: 3, position: "relative" }}>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#f8fafc",
          boxShadow: "none",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2} sx={{ letterSpacing: 0.5 }}>
          Bookings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FixSummaryBar
          allRequests={bookingsWithRequest}
          serviceTypes={serviceTypes}
          type="booking"
        />
      </Box>

      {/* Filters, Search, and Badges */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#f8fafc",
          boxShadow: "none",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
          Search bookings..
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FixFilterBar
          badges={badges}
          requests={filteredBookings}
          selectedRequestId={selectedBookingId}
          onSelect={setSelectedBookingId}
          serviceTypes={serviceTypes}
          statuses={BOOKING_STATUSES}
          serviceType={serviceType}
          status={status}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setServiceType={setServiceType}
          setStatus={setStatus}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          onClear={() => {
            setServiceType("");
            setStatus("");
            setDateFrom("");
            setDateTo("");
            setSelectedBookingId(null);
          }}
          type="booking"
        />
      </Box>

      {/* Latest Bookings List */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#fafbfc",
          boxShadow: "none",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
          Latest Bookings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            maxHeight: { xs: 340, sm: 400 },
            overflowY: "auto",
            pr: 1,
          }}
        >
          <FixGrid
            requests={sortedBookings.slice(0, visibleCount)}
            onSelect={setSelectedBookingId}
            selectedRequestId={selectedBookingId}
          />
        </Box>
        {visibleCount < sortedBookings.length && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <button
              style={{
                border: "1px solid #d1d5db",
                background: "#f8fafc",
                color: "#222",
                borderRadius: 8,
                padding: "6px 18px",
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 500,
              }}
              onClick={() => setVisibleCount((c) => c + 5)}
            >
              Load More
            </button>
          </Box>
        )}
      </Box>

      {/* Booking Details */}
      {selectedBooking && (
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            mb: 3,
            bgcolor: "#fafbfc",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
            Booking Details...
          </Typography>
          <Divider sx={{ mb: 1 }} />
           <FixDetails
            request={selectedBooking}
            onBack={() => setSelectedBookingId(null)}
            bookingMode={true}
            bookingStatuses={bookingStatuses}
            onBookingStatusChange={handleBookingStatusChange}
            onBookFixer={handleBookFixer}
          />
        </Box>
      )}
    </Box>
  );
};

export default BookingTab;