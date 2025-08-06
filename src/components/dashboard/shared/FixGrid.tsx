import React from "react";
import { Box } from "@mui/material";
import ListItem from "./ListItem";

type Request = {
  id: string | number;
  jobDescription: string;
  preferredSchedule: string;
  title: string;
};

interface LatestRequestsGridProps {
  requests: Request[];
  onSelect: (id: string | number) => void;
  selectedRequestId: string | number | null;
  maxVisible?: number;
}

const FixGrid: React.FC<LatestRequestsGridProps> = ({
  requests,
  onSelect,
  selectedRequestId,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {requests.map((req) => (
          <ListItem
            key={req.id}
            title={req.title || "No description"}
            date={
              req.preferredSchedule
                ? new Date(req.preferredSchedule).toLocaleDateString()
                : "No date"
            }
            onClick={() => onSelect(req.id)}
            selected={selectedRequestId === req.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FixGrid;