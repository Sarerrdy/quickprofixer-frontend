import React, { useState } from "react";
import { Box, Typography, Chip, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { sample } from "../../../../samp/sample";

const getFixerName = (fixerId: string) => {
  const fixer = sample.fixers.find(f => f.id === fixerId);
  if (!fixer) return fixerId;
  return `${fixer.firstName} ${fixer.lastName}`;
};

// Requested Fixers: Only show "Book" for Accepted fixers, with confirmation dialog
export const RequestedFixers: React.FC<{
  fixerStatuses: any[];
  onBookFixer?: (fixerId: string) => void;
}> = ({ fixerStatuses, onBookFixer }) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    fixerId: string | null;
  }>({ open: false, fixerId: null });

  const handleOpenConfirm = (fixerId: string) => {
    setConfirmDialog({ open: true, fixerId });
  };
  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, fixerId: null });
  };
  const handleConfirm = () => {
    if (confirmDialog.fixerId && onBookFixer) {
      onBookFixer(confirmDialog.fixerId);
    }
    handleCloseConfirm();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
        Requested Fixers:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {Array.isArray(fixerStatuses) && fixerStatuses.length > 0
          ? fixerStatuses.map((fs: any, idx: number) => (
              <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={`${getFixerName(fs.fixerId)} (${fs.status})`}
                  size="small"
                  color={
                    fs.status === "Accepted"
                      ? "success"
                      : fs.status === "Rejected"
                      ? "error"
                      : fs.status === "Booked"
                      ? "primary"
                      : "default"
                  }
                />
                {fs.status === "Accepted" && onBookFixer && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ ml: 0.5, fontSize: 12, minWidth: 0, px: 1, py: 0.5 }}
                    onClick={() => handleOpenConfirm(fs.fixerId)}
                  >
                    Book Now
                  </Button>
                )}
              </Box>
            ))
          : (
            <Typography color="text.secondary">None</Typography>
          )}
      </Box>
      {/* Confirmation Dialog for Book Now */}
      <Dialog open={confirmDialog.open} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          Are you sure you want to book this fixer? This will update the <b>Request status</b> to <b>Booked</b>.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Booked Fixers: Only show "Update Status" dropdown when bookingMode is true
export const BookedFixers: React.FC<{
  bookedFixerIds: string[];
  bookedFixers: any[];
  bookingMode?: boolean;
  bookingStatuses?: string[];
  onBookingStatusChange?: (fixerId: string, status: string) => void;
}> = ({
  bookedFixerIds,
  bookedFixers,
  bookingMode = false,
  bookingStatuses = [],
  onBookingStatusChange,
}) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    fixerId: string | null;
    status: string | null;
  }>({ open: false, fixerId: null, status: null });

  const handleOpenConfirm = (fixerId: string, status: string) => {
    setConfirmDialog({ open: true, fixerId, status });
  };
  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, fixerId: null, status: null });
  };
  const handleConfirm = () => {
    if (confirmDialog.fixerId && confirmDialog.status && onBookingStatusChange) {
      onBookingStatusChange(confirmDialog.fixerId, confirmDialog.status);
    }
    handleCloseConfirm();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
        Booked Fixers:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {bookedFixers.length > 0 ? (
          bookedFixers.map((fs: any, idx: number) => (
            <Box key={fs.fixerId || idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                label={
                  bookingMode
                    ? `${getFixerName(fs.fixerId)} (${fs.bookingStatus || fs.status})`
                    : `${getFixerName(fs.fixerId)} (${fs.status})`
                }
                size="small"
                color={
                  bookingMode
                    ? fs.bookingStatus === "Completed"
                      ? "success"
                      : fs.bookingStatus === "In Progress"
                      ? "primary"
                      : fs.bookingStatus === "Pending"
                      ? "warning"
                      : "default"
                    : fs.status === "Booked"
                    ? "primary"
                    : "default"
                }
              />
              {bookingMode && bookingStatuses && bookingStatuses.length > 0 && onBookingStatusChange && (
                <Select
                  size="small"
                  value={fs.bookingStatus ?? ""}
                  onChange={e => handleOpenConfirm(fs.fixerId, e.target.value)}
                  sx={{ ml: 1, fontSize: 13, minWidth: 120 }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Update Status
                  </MenuItem>
                  {bookingStatuses.map(status => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">None</Typography>
        )}
      </Box>
      {/* Modal Dialog for booking status confirmation */}
      <Dialog open={confirmDialog.open} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          Are you sure you want to change the booking status to <b>{confirmDialog.status}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};