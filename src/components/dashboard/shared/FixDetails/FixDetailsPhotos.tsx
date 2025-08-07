// FixDetailsPhotos.tsx
import { Box, Tooltip, Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const FixDetailsPhotos: React.FC<{
  images: any[];
  onImageClick: (img: any) => void;
}> = ({ images, onImageClick }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
      Photos:
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
      {images.length > 0 ? (
        images.map((img: any, idx: number) => (
          <Tooltip key={idx} title={img.fileName || "Image"}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 1,
                bgcolor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => onImageClick(img)}
            >
              <img
                src={img.fileUrl}
                alt={img.fileName || "Photo"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <Button
                href={img.fileUrl}
                download={img.fileName}
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  minWidth: 0,
                  p: "2px",
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  boxShadow: 1,
                }}
                onClick={e => e.stopPropagation()}
              >
                <DownloadIcon sx={{ fontSize: 18, color: "#6366f1" }} />
              </Button>
            </Box>
          </Tooltip>
        ))
      ) : (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No supporting images uploaded
        </Typography>
      )}
    </Box>
  </Box>
);

export default FixDetailsPhotos;