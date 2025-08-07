// FixDetailsImageViewer.tsx
import { Dialog, DialogContent, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

const FixDetailsImageViewer: React.FC<{
  open: boolean;
  image: any;
  onClose: () => void;
}> = ({ open, image, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md">
    <DialogContent sx={{ p: 0, position: "relative", bgcolor: "#111827" }}>
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: "#fee2e2",
            color: "#b91c1c",
            "&:hover": { bgcolor: "#fecaca" },
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <img
          src={image?.fileUrl}
          alt={image?.fileName || "Preview"}
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            background: "#111827",
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            href={image?.fileUrl}
            download={image?.fileName}
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
          >
            Download Image
          </Button>
        </Box>
      </Box>
    </DialogContent>
  </Dialog>
);

export default FixDetailsImageViewer;