/**
 * ClientOverview Component
 * 
 * This component renders the "Overview" dashboard page for a client user.
 * It provides a concise summary and quick access to the most important and actionable information,
 * including profile details, quick stats, recent activity, notifications, ratings, and shortcuts.
 * 
 * Layout:
 * - Left column: Profile summary and quick actions.
 * - Right column: Quick stats, recent activity, notifications, and ratings/reviews.
 * 
 * Responsive Design:
 * - Uses Material UI Grid and Stack for adaptive layout.
 * - Cards are spaced and sized for readability on all screen sizes.
 * 
 * Data Source:
 * - Populates content using sample data from `src/sample.ts`.
 * - Helper functions filter and aggregate relevant data for the current client.
 * 
 * Props:
 * - clientId (optional): The client to display. Defaults to "client-001".
 * 
 * Usage:
 * ```tsx
 * <ClientOverview clientId="client-001" />
 * ```
 * 
 * Author: Edmond Ina
 * Date: July 2025
 */

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  Tooltip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StarIcon from "@mui/icons-material/Star";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import { sample } from "../../../samp/sample";

// Helper functions
const getClient = (clientId: string) => sample.clients.find((c) => c.id === clientId);
const getClientFixRequests = (clientId: string) =>
  sample.fixRequests.filter((fr) => fr.clientId === clientId);
const getClientBookings = (clientId: string) =>
  sample.bookings.filter((b) => b.clientId === clientId);
const getClientPayments = (clientId: string) =>
  sample.payments.filter((p) => p.clientId === clientId);
const getClientNotifications = (clientId: string) =>
  sample.notifications.filter((n) => n.userId === clientId);
const getClientRatings = (clientId: string) =>
  sample.fixerRatings.filter((r) => r.clientId === clientId);

const getAverageRating = (clientId: string) => {
  const ratings = getClientRatings(clientId);
  if (!ratings.length) return 0;
  return (
    ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length
  ).toFixed(1);
};

const getRecent = <T,>(arr: T[], count = 3) => arr.slice(-count).reverse();

/**
 * Renders the client overview dashboard page.
 */
const ClientOverview: React.FC<{ clientId?: string }> = ({ clientId = "client-001" }) => {
  const client = getClient(clientId);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  if (!client) return <Typography color="error">Client not found.</Typography>;

  const fixRequests = getClientFixRequests(client.id);
  const bookings = getClientBookings(client.id);
  const payments = getClientPayments(client.id);
  const notifications = getClientNotifications(client.id);
  const ratings = getClientRatings(client.id);

  const activeBookings = bookings.filter((b) => b.status === "In Progress");
  const completedBookings = bookings.filter((b) => b.status === "Completed");
  const outstandingPayments = payments.filter((p) => p.clientPaymentStatus !== "Paid");

  const unreadNotifications = notifications.filter((n) => !n.isRead);

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: { xs: 2, md: 4 } }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight={700} mb={3}>
        Overview
      </Typography>
      <Grid container spacing={3}>
        {/* Left Column: Profile, Shortcuts */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Profile Summary Card */}
            <Card sx={{ borderRadius: 3, minHeight: 220 }}>
              <CardContent>
                <Stack alignItems="center" spacing={2}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      client.isVerified ? (
                        <Tooltip title="Verified">
                          <VerifiedIcon color="primary" />
                        </Tooltip>
                      ) : null
                    }
                  >
                    <Avatar
                      src={client.imgUrl}
                      alt={client.firstName}
                      sx={{ width: 80, height: 80 }}
                    />
                  </Badge>
                  <Box textAlign="center">
                    <Typography variant="h6" fontWeight={700}>
                      {client.firstName} {client.middleName} {client.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {client.address.town}, {client.address.state}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                    <Chip icon={<EmailIcon />} label={client.email} size="small" />
                    <Chip icon={<PhoneIcon />} label={client.phoneNumber} size="small" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            {/* Shortcuts / Quick Actions Card */}
            <Card sx={{ borderRadius: 3, minHeight: 220, display: "flex", alignItems: "center" }}>
              <CardContent sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    fullWidth
                  >
                    New Fix Request
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AssignmentIcon />}
                    fullWidth
                  >
                    View All Bookings
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<SupportAgentIcon />}
                    fullWidth
                  >
                    Contact Support
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column: Quick Stats, Activity, Notifications, Ratings */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Quick Stats / KPIs Card */}
            <Card sx={{ borderRadius: 3, minHeight: 100 }}>
              <CardContent>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h6">{fixRequests.length}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Fix Requests
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h6">{activeBookings.length}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Active Bookings
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h6">{completedBookings.length}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Completed
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h6">{outstandingPayments.length}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Outstanding
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Recent Activity & Notifications */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, minHeight: 220 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      Recent Activity
                    </Typography>
                    <List dense>
                      {getRecent(fixRequests, 2).map((fr) => (
                        <ListItem key={fr.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <AssignmentIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={fr.jobDescription}
                            secondary={`Status: ${fr.status} • ${new Date(fr.preferredSchedule).toLocaleDateString()}`}
                          />
                        </ListItem>
                      ))}
                      {getRecent(bookings, 1).map((b) => (
                        <ListItem key={b.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <AssignmentIcon color="primary" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`Booking #${b.id}`}
                            secondary={`Status: ${b.status} • ${new Date(b.bookingDate).toLocaleDateString()}`}
                          />
                        </ListItem>
                      ))}
                      {getRecent(payments, 1).map((p) => (
                        <ListItem key={p.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <PaymentIcon color="success" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`Payment ₦${p.amount.toLocaleString()}`}
                            secondary={`Status: ${p.clientPaymentStatus} • ${new Date(p.createdAt).toLocaleDateString()}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, minHeight: 220 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <NotificationsActiveIcon color="warning" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight={700}>
                        Notifications
                      </Typography>
                    </Box>
                    <List dense>
                      {getRecent(unreadNotifications, 3).length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                          No new notifications.
                        </Typography>
                      )}
                      {getRecent(unreadNotifications, 3).map((n) => (
                        <ListItem key={n.id}>
                          <ListItemText
                            primary={n.title}
                            secondary={n.message}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* Ratings & Reviews */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <StarIcon color="warning" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight={700}>
                    Ratings & Reviews
                  </Typography>
                  <Chip
                    label={`Avg. Rating: ${getAverageRating(client.id)}`}
                    icon={<StarIcon color="warning" />}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <List dense>
                  {getRecent(ratings, 2).length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No reviews yet.
                    </Typography>
                  )}
                  {getRecent(ratings, 2).map((r) => (
                    <ListItem key={r.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <StarIcon color="warning" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={r.review}
                        secondary={`Rated ${r.rating} • ${new Date(r.createdAt).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientOverview;