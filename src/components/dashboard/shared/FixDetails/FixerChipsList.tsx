// FixerChipsList.tsx
import { Box, Typography, Chip } from "@mui/material";
import { sample } from "../../../../sample";

const getFixerName = (fixerId: string) => {
  const fixer = sample.fixers.find(f => f.id === fixerId);
  if (!fixer) return fixerId;
  return `${fixer.firstName} ${fixer.lastName}`;
};

export const RequestedFixers: React.FC<{ fixerStatuses: any[] }> = ({ fixerStatuses }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
      Requested Fixers:
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
      {Array.isArray(fixerStatuses) && fixerStatuses.length > 0
        ? fixerStatuses.map((fs: any, idx: number) => (
            <Chip
              key={idx}
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
          ))
        : (
          <Typography color="text.secondary">None</Typography>
        )}
    </Box>
  </Box>
);

export const BookedFixers: React.FC<{ bookedFixerIds: string[]; bookedFixers: any[] }> = ({
  bookedFixerIds,
  bookedFixers,
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
      Booked Fixers:
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
      {bookedFixerIds.length > 0 ? (
        bookedFixerIds.map((id: string, idx: number) => (
          <Chip
            key={id || idx}
            label={getFixerName(id)}
            size="small"
            color="primary"
          />
        ))
      ) : bookedFixers.length > 0 ? (
        bookedFixers.map((fs: any, idx: number) => (
          <Chip
            key={fs.fixerId || idx}
            label={`${getFixerName(fs.fixerId)} (${fs.status})`}
            size="small"
            color="primary"
          />
        ))
      ) : (
        <Typography color="text.secondary">None</Typography>
      )}
    </Box>
  </Box>
);