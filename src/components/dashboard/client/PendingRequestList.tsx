import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

const PendingRequestList: React.FC<{
  requests: any[];
  onViewDetails: (req: any) => void;
  title?: string;
}> = ({ requests, onViewDetails, title = "Pending Requests" }) => (
  <Box>
    <Typography variant="h6" fontWeight={700} mb={2}>
      {title}
    </Typography>
    {requests.length === 0 ? (
      <Typography color="text.secondary">No pending requests found.</Typography>
    ) : (
      <Box>
        {requests.map((req) => (
          <Paper
            key={req.id}
            elevation={2}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography fontWeight={600}>{req.jobDescription}</Typography>
            <Typography fontSize={14} color="text.secondary">
              {req.specialization?.name} &bull; {req.status} &bull; {new Date(req.preferredSchedule).toLocaleDateString()}
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              {req.location}
            </Typography>
            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => onViewDetails(req)}
                sx={{ mt: 1, textTransform: "none" }}
              >
                View Details
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    )}
  </Box>
);

export default PendingRequestList;