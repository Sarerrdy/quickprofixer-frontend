import React from "react";
import { Box, Link } from "@mui/material";

/**
 * Displays details for a single fix request.
 * @param request The fix request object
 * @param onBack Callback for "Back to List"
 */
const FixRequestDetails: React.FC<{ request: any; onBack: () => void }> = ({ request, onBack }) => {
  if (!request) return null;

  // Address fallback
  const address = request.address
    ? `${request.address.addressLine || ''}, ${request.address.town || ''}, ${request.address.state || ''}`
    : "No address provided";

  return (
    <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <button onClick={onBack} style={{ marginBottom: 16 }}>← Back to List</button>
      <h2>Request Details</h2>
      <Box fontWeight={600}>{request.jobDescription || "No description provided"}</Box>
      <Box fontSize={14} color="text.secondary">
        {request.specialization?.name || "No specialization"} &bull; {request.status || "No status"} &bull; {request.preferredSchedule ? new Date(request.preferredSchedule).toLocaleDateString() : "No date"}
      </Box>
      <Box fontSize={13} color="text.secondary">
        {request.location || "No location"}
      </Box>
      <Box mt={2}>
        <strong>Address:</strong> {address}
      </Box>
      {/* Supporting Image */}
      {request.supportingImage?.fileUrl ? (
        <Box mt={2}>
          <strong>Supporting Image:</strong>
          <img
            src={request.supportingImage.fileUrl}
            alt={request.supportingImage.fileName || "Supporting"}
            style={{ maxWidth: 200, display: 'block', marginTop: 8, borderRadius: 8 }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </Box>
      ) : (
        <Box mt={2} color="text.secondary">
          <strong>Supporting Image:</strong> None provided
        </Box>
      )}
      {/* Supporting Document */}
      {request.supportingDocument?.fileUrl ? (
        <Box mt={2}>
          <strong>Supporting Document:</strong>{" "}
          <Link href={request.supportingDocument.fileUrl} target="_blank" rel="noopener">
            {request.supportingDocument.fileName || "View Document"}
          </Link>
        </Box>
      ) : (
        <Box mt={2} color="text.secondary">
          <strong>Supporting Document:</strong> None provided
        </Box>
      )}
      {/* Other Supporting Files */}
      {Array.isArray(request.supportingFiles) && request.supportingFiles.length > 0 ? (
        <Box mt={2}>
          <strong>Other Supporting Files:</strong>
          <ul>
            {request.supportingFiles.map((file: any, idx: number) => (
              <li key={idx}>
                {file.fileUrl ? (
                  <Link href={file.fileUrl} target="_blank" rel="noopener">
                    {file.fileName || "File"}
                  </Link>
                ) : (
                  file.fileName || "Unnamed file"
                )}
              </li>
            ))}
          </ul>
        </Box>
      ) : (
        <Box mt={2} color="text.secondary">
          <strong>Other Supporting Files:</strong> None provided
        </Box>
      )}
      <Box mt={2}>
        <strong>Assigned Fixers:</strong> {request.fixerIds?.join(', ') || 'None'}
      </Box>
    </Box>
  );
};

export default FixRequestDetails;