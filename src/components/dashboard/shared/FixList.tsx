import React from "react";
import { Box, Paper, Typography } from "@mui/material";

/**
 * Displays a list of fix requests.
 * @param requests Array of fix request objects
 * @param onViewDetails Callback when "View Details" is clicked
 * @param title Section title
 * @param selectedId Optional: id of the currently focused/selected item
 */
const FixList: React.FC<{
  requests: any[];
  onViewDetails: (req: any) => void;
  title: string;
  selectedId?: string | number | null;
}> = ({ requests, onViewDetails, title, selectedId }) => (
  <Box>
    <Typography variant="h6" fontWeight={700} mb={2}>
      {title}
    </Typography>
    {requests.length === 0 ? (
      <Typography color="text.secondary">No requests found.</Typography>
    ) : (
      <Box>
        {requests.map((req) => (
          <Paper
            key={req.id}
            elevation={selectedId === req.id ? 6 : 2}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              cursor: 'pointer',
              border: selectedId === req.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
              boxShadow: selectedId === req.id ? '0 0 0 2px #1976d2' : undefined,
              backgroundColor: selectedId === req.id ? '#e3f2fd' : 'background.paper',
              transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
              '&:hover': {
                border: '2px solid #1976d2',
                boxShadow: '0 0 0 2px #1976d2',
                backgroundColor: '#e3f2fd',
              },
            }}
            onClick={() => onViewDetails(req)}
            tabIndex={0}
          >
            <Typography fontWeight={600}>{req.title}</Typography>
            <Typography fontSize={14} color="text.secondary">
              {req.specialization?.name} &bull; {req.status} &bull; {new Date(req.preferredSchedule).toLocaleDateString()}
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              {req.location}
            </Typography>
          </Paper>
        ))}
      </Box>
    )}
  </Box>
);

export default FixList;