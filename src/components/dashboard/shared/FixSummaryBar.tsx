import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ErrorIcon from "@mui/icons-material/Error";
import { BOOKING_STATUSES, FIX_STATUSES } from "./FixStatuses";

interface FixSummaryBarProps {
  allRequests: any[];
  serviceTypes: string[];
  type?: "request" | "booking";
}

const STATUS_ICONS: Record<string, JSX.Element> = {
  Pending: <PendingActionsIcon sx={{ color: "#f59e42", fontSize: 28, mb: 0.5 }} />,
  Booked: <EventAvailableIcon sx={{ color: "#6366f1", fontSize: 28, mb: 0.5 }} />,
  "In Progress": <AssignmentIcon sx={{ color: "#0ea5e9", fontSize: 28, mb: 0.5 }} />,
  Completed: <CheckCircleIcon sx={{ color: "#10b981", fontSize: 28, mb: 0.5 }} />,
  Rejected: <ErrorIcon sx={{ color: "#ef4444", fontSize: 28, mb: 0.5 }} />,
};

const FixSummaryBar: React.FC<FixSummaryBarProps> = ({
  allRequests,
  serviceTypes,
  type = "request",
}) => {
  const isBooking = type === "booking";

  // Statuses and labels for each mode
  const STATUS_ORDER = isBooking
    ? [
        { key: "Pending", label: "Pending", icon: STATUS_ICONS["Pending"] },
        { key: "In Progress", label: "In Progress", icon: STATUS_ICONS["In Progress"] },
        { key: "Completed", label: "Completed", icon: STATUS_ICONS["Completed"] },
        { key: "Rejected", label: "Rejected", icon: STATUS_ICONS["Rejected"] },
      ]
    : [
        { key: "Pending", label: "Pending", icon: STATUS_ICONS["Pending"] },
        { key: "Booked", label: "Booked", icon: STATUS_ICONS["Booked"] },
        { key: "In Progress", label: "In Progress", icon: STATUS_ICONS["In Progress"] },
        { key: "Completed", label: "Completed", icon: STATUS_ICONS["Completed"] },
        { key: "Rejected", label: "Rejected", icon: STATUS_ICONS["Rejected"] },
      ];

  // Days since last request/booking
  const lastDate = allRequests.length > 0
    ? new Date(
        isBooking
          ? allRequests[0].bookingDate ?? allRequests[0].preferredSchedule ?? allRequests[0].createdAt
          : allRequests[0].preferredSchedule ?? allRequests[0].createdAt
      )
    : null;
  const daysSinceLast = lastDate
    ? Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    : "N/A";

  // Status counts
  const statusCounts = STATUS_ORDER.reduce((acc, status) => {
    acc[status.key] = allRequests.filter(
      r => (isBooking ? r.bookingStatus || r.status : r.status) === status.key
    ).length;
    return acc;
  }, {} as Record<string, number>);

  // Most requested/booked service type
  const mostService =
    serviceTypes.length > 0
      ? serviceTypes
          .map(typeName => ({
            type: typeName,
            count: allRequests.filter(r => r.specialization?.name === typeName).length,
          }))
          .sort((a, b) => b.count - a.count)[0].type
      : "N/A";

  return (
    <Card
      sx={{
        borderRadius: 3,
        minHeight: 100,
        mb: 3,
        boxShadow: "none",
        border: "1px solid #e6e8eb",
      }}
    >
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          {/* Total Requests/Bookings */}
          <Grid item xs={6} sm={3} md={2}>
            <Box textAlign="center">
              <AssignmentIcon sx={{ color: "#6366f1", fontSize: 28, mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{allRequests.length}</Typography>
              <Typography variant="caption" color="text.secondary">
                {isBooking ? "Total Bookings" : "Total Requests"}
              </Typography>
            </Box>
          </Grid>
          {/* Each Status */}
          {STATUS_ORDER.map((status) => (
            <Grid item xs={6} sm={3} md={2} key={status.key}>
              <Box textAlign="center">
                {status.icon}
                <Typography variant="h6" fontWeight={700}>{statusCounts[status.key]}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {status.label}
                </Typography>
              </Box>
            </Grid>
          ))}
          {/* Most Requested/Booked Service Type */}
          <Grid item xs={6} sm={3} md={2}>
            <Box textAlign="center">
              <BuildIcon sx={{ color: "#10b981", fontSize: 28, mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{mostService}</Typography>
              <Typography variant="caption" color="text.secondary">
                {isBooking ? "Most Booked Service" : "Most Requested Service"}
              </Typography>
            </Box>
          </Grid>
          {/* Days Since Last */}
          <Grid item xs={6} sm={3} md={2}>
            <Box textAlign="center">
              <CalendarTodayIcon sx={{ color: "#6366f1", fontSize: 28, mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>
                {typeof daysSinceLast === "number" ? daysSinceLast : "N/A"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Days Since Last {isBooking ? "Booking" : "Request"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FixSummaryBar;