import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ErrorIcon from "@mui/icons-material/Error";

interface RequestSummaryBarProps {
  allRequests: any[];
  serviceTypes: string[];
}

const STATUS_ORDER = [
  { key: "Pending", label: "Pending", icon: <PendingActionsIcon sx={{ color: "#f59e42", fontSize: 28, mb: 0.5 }} /> },
  { key: "Booked", label: "Booked", icon: <EventAvailableIcon sx={{ color: "#6366f1", fontSize: 28, mb: 0.5 }} /> },
  { key: "In Progress", label: "In Progress", icon: <AssignmentIcon sx={{ color: "#0ea5e9", fontSize: 28, mb: 0.5 }} /> },
  { key: "Completed", label: "Completed", icon: <CheckCircleIcon sx={{ color: "#10b981", fontSize: 28, mb: 0.5 }} /> },
  { key: "Rejected", label: "Rejected", icon: <ErrorIcon sx={{ color: "#ef4444", fontSize: 28, mb: 0.5 }} /> },
];

const RequestSummaryBar: React.FC<RequestSummaryBarProps> = ({ allRequests, serviceTypes }) => {
  // Calculate days since last request
  const lastDate = allRequests.length > 0
    ? new Date(allRequests[0].preferredSchedule)
    : null;
  const daysSinceLast = lastDate
    ? Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    : "N/A";

  // Status counts
  const statusCounts = STATUS_ORDER.reduce((acc, status) => {
    acc[status.key] = allRequests.filter(r => r.status === status.key).length;
    return acc;
  }, {} as Record<string, number>);

  // Most requested service type
  const mostRequestedService =
    serviceTypes.length > 0
      ? serviceTypes
          .map(type => ({
            type,
            count: allRequests.filter(r => r.specialization?.name === type).length,
          }))
          .sort((a, b) => b.count - a.count)[0].type
      : "N/A";

    return (
    <Card
      sx={{
        borderRadius: 3,
        minHeight: 100,
        mb: 3,
        boxShadow: "none", // Remove shadow
        border: "1px solid #e6e8eb", // Optional: add subtle border for separation
      }}
    >
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          {/* Total Requests */}
          <Grid item xs={6} sm={3} md={2}>
            <Box textAlign="center">
              <AssignmentIcon sx={{ color: "#6366f1", fontSize: 28, mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{allRequests.length}</Typography>
              <Typography variant="caption" color="text.secondary">
                Total Requests
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
          {/* Most Requested Service Type */}
          <Grid item xs={6} sm={3} md={2}>
            <Box textAlign="center">
              <BuildIcon sx={{ color: "#10b981", fontSize: 28, mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>{mostRequestedService}</Typography>
              <Typography variant="caption" color="text.secondary">
                Most Requested Service
              </Typography>
            </Box>
          </Grid>
          {/* Days Since Last Request */}
          <Grid item xs={6} sm={3} md={2}>
            <Box textAlign="center">
              <CalendarTodayIcon sx={{ color: "#6366f1", fontSize: 28, mb: 0.5 }} />
              <Typography variant="h6" fontWeight={700}>
                {typeof daysSinceLast === "number" ? daysSinceLast : "N/A"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Days Since Last Request
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RequestSummaryBar;