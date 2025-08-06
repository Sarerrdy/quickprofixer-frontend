import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { sample } from "../../../sample";
import FixSummaryBar from "../shared/FixSummaryBar";
import FixFilterBar from "../shared/FixFilterBar";
import FixGrid from "../shared/FixGrid"; // <-- Make sure this import exists and is correct
import FixDetails from "../shared/FixDetails"; // <-- Add this import

const BookingTab = () => {
  // Prepare booking data merged with their related requests for summary
  const bookingsWithRequest = sample.bookings
    .map((booking) => {
      const req = sample.fixRequests.find((r) => r.id === booking.fixRequestId);
      return req
        ? {
            ...booking,
            ...req,
            bookingDate: booking.bookingDate,
            bookingStatus: booking.status,
          }
        : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  // Unique service types for filter dropdown
  const serviceTypes = Array.from(
    new Set(bookingsWithRequest.map((r) => r.specialization?.name).filter(Boolean))
  );

  // Example filter state (you can expand as needed)
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

  // Booking statuses (you can import BOOKING_STATUSES if you have it)
  const statuses = ["Pending", "In Progress", "Completed", "Rejected"];

  // Sort bookings by bookingDate (latest first)
  const sortedBookings = [...filteredBookings].sort(
    (a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
  );

  // Find selected booking
  const selectedBooking = bookingsWithRequest.find((r) => r.id === selectedBookingId);

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
          statuses={statuses}
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
          <FixDetails request={selectedBooking} onBack={() => setSelectedBookingId(null)} />
        </Box>
      )}
    </Box>
  );
};

export default BookingTab;