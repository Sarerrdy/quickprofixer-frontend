import React from 'react';
import { Typography, Snackbar, Alert, Box } from '@mui/material';
import FixerList from '../fixers/FixerList';

/**
 * Props for AvailableFixersTab component.
 * Displays available fixers, loading/error states, and notifications.
 */
interface AvailableFixersTabProps {
  fixersTabHeading: string;
  isLoading: boolean;
  error: any;
  fixers: any[];
  previewData: any;
  clientId: string;
  snackbarOpen: boolean;
  snackbarMsg: string;
  snackbarSeverity: 'success' | 'error' | 'info' | 'warning';
  setSnackbarOpen: (open: boolean) => void;
}

/**
 * AvailableFixersTab
 * Renders the heading, loading state, fixer list, and snackbar notifications.
 * Uses Material UI Box for layout and Tailwind for spacing if needed.
 */
const AvailableFixersTab: React.FC<AvailableFixersTabProps> = ({
  fixersTabHeading,
  isLoading,
  error,
  fixers,
  previewData,
  clientId,
  snackbarOpen,
  snackbarMsg,
  snackbarSeverity,
  setSnackbarOpen,
}) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: { xs: '100%', sm: '100vw', md: '60vw', lg: '50%' },
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: 'center',
    }}
    className="py-4" // Tailwind for vertical padding
  >
    {/* Heading for the fixers tab */}
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        color:
          fixersTabHeading === 'Available Fixers'
            ? 'text.primary'
            : fixersTabHeading.startsWith('Error')
            ? 'error.main'
            : 'warning.main',
        textAlign: 'center',
      }}
    >
      {fixersTabHeading}
    </Typography>

    {/* Loading state */}
    {isLoading && (
      <Typography sx={{ textAlign: 'center', mt: 2 }}>
        Loading fixers...
      </Typography>
    )}

    {/* Fixer list if available */}
    {!isLoading && !error && fixers.length > 0 && (
      <FixerList fixers={fixers} previewData={previewData} clientId={clientId} />
    )}

    {/* Snackbar notification for errors or info */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        sx={{ width: '100%' }}
      >
        {snackbarMsg}
      </Alert>
    </Snackbar>
  </Box>
);

export default AvailableFixersTab;