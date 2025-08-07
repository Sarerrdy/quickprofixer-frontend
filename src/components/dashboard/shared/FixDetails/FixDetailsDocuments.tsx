// FixDetailsDocuments.tsx
import { Box, Tooltip, Button, Typography, Link } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";

const FixDetailsDocuments: React.FC<{ documents: any[] }> = ({ documents }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
      Documents:
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
      {documents.length > 0 ? (
        documents.map((doc: any, idx: number) => (
          <Tooltip key={idx} title={doc.fileName || "Document"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#f9fafb",
                borderRadius: 1,
                px: 1,
                py: 0.5,
                minWidth: 120,
                maxWidth: 180,
              }}
            >
              <InsertDriveFileIcon sx={{ color: "#6366f1", fontSize: 28, mr: 1 }} />
              <Link
                href={doc.fileUrl}
                target="_blank"
                rel="noopener"
                underline="hover"
                sx={{ fontSize: 13, wordBreak: "break-all" }}
              >
                {doc.fileName || "Document"}
              </Link>
              <Button
                href={doc.fileUrl}
                download={doc.fileName}
                size="small"
                sx={{
                  minWidth: 0,
                  p: "2px",
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  boxShadow: 1,
                }}
              >
                <DownloadIcon sx={{ fontSize: 18, color: "#6366f1" }} />
              </Button>
            </Box>
          </Tooltip>
        ))
      ) : (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No supporting documents uploaded
        </Typography>
      )}
    </Box>
  </Box>
);

export default FixDetailsDocuments;