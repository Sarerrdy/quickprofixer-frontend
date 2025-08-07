import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SubmittedQuotes from "./SubmittedQuotes";
import { sample } from "../../../sample";

// --- Extracted Components ---
import FixDetailsStatus from "./FixDetails/FixDetailsStatus";
import FixDetailsPhotos from "./FixDetails/FixDetailsPhotos";
import FixDetailsDocuments from "./FixDetails/FixDetailsDocuments";
import FixDetailsLinks from "./FixDetails/FixDetailsLinks";
import { RequestedFixers, BookedFixers } from "./FixDetails/FixerChipsList";
import FixDetailsImageViewer from "./FixDetails/FixDetailsImageViewer";
// ----------------------------

const FixDetails: React.FC<{ request: any; onBack: () => void }> = ({
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

  // Booked fixers: Only fixers with status "Booked" (for requests)
  const bookedFixers =
    Array.isArray(request.fixerStatuses)
      ? request.fixerStatuses.filter((fs: any) => fs.status === "Booked")
      : [];

  // For bookings, get the fixerId as the booked fixer (if present)
  const bookedFixerIds =
    request.bookingDate && request.fixerId
      ? [request.fixerId]
      : [];

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
          {/* Status, Booking, and Description */}
          <FixDetailsStatus
            status={request.status}
            bookingStatus={request.bookingStatus}
            bookingDate={request.bookingDate}
          />

          {/* Description */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Description:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 400 }}>
              {request.jobDescription || "No description provided"}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Specialization */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Specialization:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {request.specialization?.name || "No specialization"}
            </Typography>
          </Box>
          {/* Date */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Request Date:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {request.preferredSchedule
                ? new Date(request.preferredSchedule).toLocaleDateString()
                : "No date"}
            </Typography>
          </Box>
          {/* Location */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Location:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {request.location || "No location"}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Address */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 600 }}>
              Address:
            </Typography>
            <Typography variant="body2">{address}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Resources */}
          <FixDetailsPhotos images={images} onImageClick={handleThumbnailClick} />
          <Divider sx={{ my: 2 }} />
          <FixDetailsDocuments documents={documents} />
          <Divider sx={{ my: 2 }} />
          <FixDetailsLinks links={links} />
          <Divider sx={{ my: 2 }} />

          {/* Requested & Booked Fixers */}
          <RequestedFixers fixerStatuses={request.fixerStatuses} />
          <BookedFixers bookedFixerIds={bookedFixerIds} bookedFixers={bookedFixers} />

          {/* Submitted Quotes */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: "#6366f1", mb: 1 }}>
            Submitted Quotes:
          </Typography>
          <Box sx={{ mb: 2 }}>
            <SubmittedQuotes fixRequestId={request.id} />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={5}>
          {/* Large preview of selected image */}
          <FixDetailsImageViewer
            open={viewerOpen}
            image={viewerImg}
            onClose={handleViewerClose}
          />
          {/* Fallback preview if no viewer open */}
          {!viewerOpen && images.length > 0 && (
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
            </Box>
          )}
          {!viewerOpen && images.length === 0 && (
            <Box sx={{ mb: 2, textAlign: { xs: "left", md: "center" } }}>
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

export default FixDetails;