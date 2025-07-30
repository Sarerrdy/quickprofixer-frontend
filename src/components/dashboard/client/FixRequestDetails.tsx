import React, { useState } from "react";
import {
  Box,
  Link,
  Typography,
  IconButton,
  Divider,
  Paper,
  Grid,
  Chip,
  Tooltip,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";

const FixRequestDetails: React.FC<{ request: any; onBack: () => void }> = ({
  request,
  onBack,
}) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImg, setViewerImg] = useState<any>(null);

  if (!request) return null;

  const address = request.address
    ? `${request.address.addressLine || ""}, ${request.address.town || ""}, ${request.address.state || ""}`
    : "No address provided";

  // Gather all resources (images, documents, files, links)
 const images: any[] = [];
  if (request.supportingImage) images.push(request.supportingImage);
  if (Array.isArray(request.supportingImages)) images.push(...request.supportingImages);
  if (Array.isArray(request.supportingFiles)) {
    images.push(...request.supportingFiles.filter((f: any) =>
      f.fileType?.startsWith("image/")
    ));
  }

   const documents: any[] = [];
  if (request.supportingDocument) documents.push(request.supportingDocument);
  if (Array.isArray(request.supportingDocuments)) documents.push(...request.supportingDocuments);
  if (Array.isArray(request.supportingFiles)) {
    documents.push(
      ...request.supportingFiles.filter((f: any) =>
        f.fileType &&
        !f.fileType.startsWith("image/") &&
        (
          f.fileType.startsWith("application/pdf") ||
          f.fileType.startsWith("text/")
        )
      )
    );
  }

  const links = Array.isArray(request.supportingLinks) ? request.supportingLinks : [];

  // Handlers for image viewer
  const handleThumbnailClick = (img: any) => {
    setViewerImg(img);
    setViewerOpen(true);
  };
  const handleViewerClose = () => {
    setViewerOpen(false);
    setViewerImg(null);
  };

  return (
    <Box      
      sx={{
        p: { xs: 2, md: 1 },
        borderRadius: 4,
        maxWidth: 1100,
        mx: "auto",
        mt: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={onBack}
          aria-label="Close details"
          size="small"
          sx={{
            bgcolor: "#fee2e2",
            color: "#b91c1c",
            "&:hover": { bgcolor: "#fecaca" },
            borderRadius: 2,
            boxShadow: "none",
            width: 28,
            height: 28,
          }}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {request.title || "Request Details"}
      </Typography>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={7}>
          {/* Status Section */}
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#6366f1",
                letterSpacing: 0.5,
              }}
            >
              Status:
            </Typography>
            <Box>
              <Chip
                label={request.status || "No status"}
                color={
                  request.status === "Completed"
                    ? "success"
                    : request.status === "Rejected"
                    ? "error"
                    : request.status === "Pending"
                    ? "warning"
                    : request.status === "Booked"
                    ? "primary"
                    : request.status === "In Progress"
                    ? "info"
                    : "default"
                }
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  minWidth: 90,
                  textTransform: "capitalize",
                }}
              />
            </Box>
          </Box>

           {/* Description Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Description:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 400 }}>
              {request.jobDescription || "No description provided"}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Specialization Section */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Specialization:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {request.specialization?.name || "No specialization"}
            </Typography>
          </Box>
          {/* Date Section */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Date:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {request.preferredSchedule
                ? new Date(request.preferredSchedule).toLocaleDateString()
                : "No date"}
            </Typography>
          </Box>
          {/* Location Section */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Location:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {request.location || "No location"}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Address Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Address:
            </Typography>
            <Typography variant="body2">{address}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />         

          {/* Resources Section */}
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
                      onClick={() => handleThumbnailClick(img)}
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
          <Divider sx={{ my: 2 }} />

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
          <Divider sx={{ my: 2 }} />

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
          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
              Assigned Fixers:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {Array.isArray(request.fixerStatuses) && request.fixerStatuses.length > 0
                ? request.fixerStatuses.map((fs: any, idx: number) => (
                    <Chip
                      key={idx}
                      label={`${fs.fixerId} (${fs.status})`}
                      size="small"
                      color={
                        fs.status === "Accepted"
                          ? "success"
                          : fs.status === "Rejected"
                          ? "error"
                          : "default"
                      }
                    />
                  ))
                : (
                  <Typography color="text.secondary">None</Typography>
                )}
            </Box>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5}>
          {/* Large preview of selected image or first image if available */}
          {viewerImg ? (
            <Dialog open={viewerOpen} onClose={handleViewerClose} maxWidth="md">
              <DialogContent sx={{ p: 0, position: "relative", bgcolor: "#111827" }}>
                <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
                  <IconButton
                    onClick={handleViewerClose}
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
                    src={viewerImg.fileUrl}
                    alt={viewerImg.fileName || "Preview"}
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
                      href={viewerImg.fileUrl}
                      download={viewerImg.fileName}
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
          ) : images.length > 0 ? (
            <Box sx={{ mb: 2, textAlign: { xs: "left", md: "center" }, cursor: "pointer" }}>
              <img
                src={images[0].fileUrl}
                alt={images[0].fileName || "Preview"}
                style={{
                  maxWidth: "100%",
                  maxHeight: 300,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                onClick={() => handleThumbnailClick(images[0])}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <Box sx={{ mt: 1 }}>
                <Button
                  href={images[0].fileUrl}
                  download={images[0].fileName}
                  size="small"
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  Download
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mb: 2, textAlign: { xs: "left", md: "center" } }}>
              <ImageIcon sx={{ fontSize: 60, color: "#e0e7ef" }} />
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                No preview image
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FixRequestDetails;