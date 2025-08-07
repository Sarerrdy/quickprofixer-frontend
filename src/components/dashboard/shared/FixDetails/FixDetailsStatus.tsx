// FixDetailsStatus.tsx
import { Box, Typography, Chip } from "@mui/material";

const statusColor = (status: string) => {
  switch (status) {
    case "Completed": return "success";
    case "Rejected": return "error";
    case "Pending": return "warning";
    case "Booked": return "primary";
    case "In Progress": return "info";
    default: return "default";
  }
};

const FixDetailsStatus: React.FC<{ status: string; bookingStatus?: string; bookingDate?: string }> = ({
  status,
  bookingStatus,
  bookingDate,
}) => (
  <>
    <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#6366f1",
          letterSpacing: 0.5,
        }}
      >
        Request status:
      </Typography>
      <Chip
        label={status || "No status"}
        color={statusColor(status)}
        sx={{
          fontWeight: 700,
          fontSize: "1rem",
          px: 2,
          py: 1,
          borderRadius: 2,
          minWidth: 90,
          textTransform: "capitalize",
        }}
      />
    </Box>
    {bookingStatus && (
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#6366f1",
            letterSpacing: 0.5,
          }}
        >
          Booking status:
        </Typography>
        <Chip
          label={bookingStatus || "No status"}
          color={statusColor(bookingStatus)}
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            px: 2,
            py: 1,
            borderRadius: 2,
            minWidth: 90,
            textTransform: "capitalize",
          }}
        />
      </Box>
    )}
    {bookingDate && (
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
          Booking Date:
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {new Date(bookingDate).toLocaleDateString()}
        </Typography>
      </Box>
    )}
  </>
);

export default FixDetailsStatus;