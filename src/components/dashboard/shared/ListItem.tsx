import React from "react";
import { Box, Typography } from "@mui/material";

type RequestItemProps = {
  title: string;
  date: string;
  onClick: () => void;
  selected?: boolean;
};

const ListItem: React.FC<RequestItemProps> = ({ title, date, onClick, selected }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      px: 2,
      py: 1,
      bgcolor: selected ? "#eef2ff" : "#fff",
      borderRadius: 999,
      cursor: "pointer",
      boxShadow: "none", // No shadow
      gap: 1.5,
      transition: "background 0.2s, border 0.2s",
      "&:hover": { boxShadow: "none", bgcolor: selected ? "#e0e7ff" : "#f1f5f9" }, // No shadow on hover
      minWidth: 0,
      maxWidth: 320,
      mb: 1,
      border: selected ? "2.5px solid #6366f1" : "2px solid #e5e7eb",
      outline: selected ? "2px solid #6366f1" : "none",
    }}
    onClick={onClick}
  >
    <Typography
      variant="subtitle2"
      fontWeight={700}
      sx={{
        fontFamily: "Montserrat, Arial, sans-serif",
        color: selected ? "#4338ca" : "#222",
        fontSize: "1rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 180,
      }}
      title={title}
    >
      {title}
    </Typography>
    <Typography
      variant="caption"
      sx={{
        color: selected ? "#4338ca" : "#6366f1",
        fontFamily: "Fira Mono, monospace",
        fontSize: "0.95rem",
        ml: 1,
        whiteSpace: "nowrap",
      }}
    >
      {date}
    </Typography>
  </Box>
);

export default ListItem;