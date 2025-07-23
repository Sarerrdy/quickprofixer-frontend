import React from "react";
import { Box } from "@mui/material";

/**
 * Displays a list of fix requests.
 * @param requests Array of fix request objects
 * @param onViewDetails Callback when "View Details" is clicked
 * @param title Section title
 */
const FixRequestList: React.FC<{
  requests: any[];
  onViewDetails: (req: any) => void;
  title: string;
}> = ({ requests, onViewDetails, title }) => (
  <Box>
    <Box mb={2}>
      <h2>{title}</h2>
    </Box>
    {requests.length === 0 ? (
      <Box color="text.secondary">No requests found.</Box>
    ) : (
      <Box>
        {requests.map((req) => (
          <Box
            key={req.id}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: '#fff',
              borderRadius: 2,
              boxShadow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box fontWeight={600}>{req.jobDescription}</Box>
            <Box fontSize={14} color="text.secondary">
              {req.specialization?.name} &bull; {req.status} &bull; {new Date(req.preferredSchedule).toLocaleDateString()}
            </Box>
            <Box fontSize={13} color="text.secondary">
              {req.location}
            </Box>
            <Box>
              <button onClick={() => onViewDetails(req)} style={{ marginTop: 8 }}>
                View Details
              </button>
            </Box>
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

export default FixRequestList;