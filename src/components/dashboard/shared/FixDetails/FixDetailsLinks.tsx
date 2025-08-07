// FixDetailsLinks.tsx
import { Box, Typography, Link } from "@mui/material";

const FixDetailsLinks: React.FC<{ links: any[] }> = ({ links }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
      Links:
    </Typography>
    {links.length > 0 ? (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
        {links.map((lnk: any, idx: number) => (
          <Link
            key={idx}
            href={lnk.url}
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ fontSize: 13 }}
          >
            {lnk.label || lnk.url}
          </Link>
        ))}
      </Box>
    ) : (
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        No links attached
      </Typography>
    )}
  </Box>
);

export default FixDetailsLinks;