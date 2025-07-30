// ...existing imports...
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Divider, Paper } from "@mui/material";
import FixRequestDetails from "./FixRequestDetails";
import RequestSelectDropdown from "./RequestSelectDropdown";
import RequestFilters from "./RequestFilters";
import FilterBadgesBar from "./FilterBadgesBar";
import { sample } from "../../../sample";
import LatestRequestsGrid from "./LatestRequestsGrid";
import { REQUEST_STATUSES } from "../shared/statuses";
import RequestSummaryBar from "../shared/RequestSummaryBar";

const FixRequestTab: React.FC = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<string | number | null>(null);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [visibleCount, setVisibleCount] = useState(5); // For gradual loading

  // Get all requests ordered by date
  const allRequests = [...sample.fixRequests].sort(
    (a, b) => new Date(b.preferredSchedule).getTime() - new Date(a.preferredSchedule).getTime()
  );

  // Unique service types for filter dropdown
  const serviceTypes = Array.from(new Set(allRequests.map((r) => r.specialization?.name).filter(Boolean)));
  // Use shared statuses constant for dropdown
  const statuses = REQUEST_STATUSES;

  // Filter logic (only main request status)
  const filteredRequests = allRequests.filter((req) => {
    const matchesService =
      serviceType === "" || req.specialization?.name === serviceType;
    const matchesStatus =
      status === "" || req.status === status;
    const matchesDate =
      (!dateFrom || new Date(req.preferredSchedule) >= new Date(dateFrom)) &&
      (!dateTo || new Date(req.preferredSchedule) <= new Date(dateTo));
    return matchesService && matchesStatus && matchesDate;
  });

  const selectedRequest = allRequests.find((r) => r.id === selectedRequestId);

  // Build badges array from filter state
  const badges: { label: string; onRemove: () => void }[] = [];
  if (serviceType)
    badges.push({
      label: serviceType,
      onRemove: () => setServiceType(""),
    });
  if (status)
    badges.push({
      label: status,
      onRemove: () => setStatus(""),
    });
  if (dateFrom)
    badges.push({
      label: `From: ${dateFrom}`,
      onRemove: () => setDateFrom(""),
    });
  if (dateTo)
    badges.push({
      label: `To: ${dateTo}`,
      onRemove: () => setDateTo(""),
    });

  // If the selected request is no longer in filteredRequests, close the details page
  useEffect(() => {
    if (
      selectedRequestId &&
      !filteredRequests.some((req) => req.id === selectedRequestId)
    ) {
      setSelectedRequestId(null);
    }
    // Reset visibleCount if filters change
    setVisibleCount(5);
  }, [serviceType, status, dateFrom, dateTo]);

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", mx: "auto", py: 3, position: "relative" }}>
      {/* Group 1: Fix Requests Title & Summary */}
      <Box        
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#f8fafc",
          boxShadow: "none",
        //   border: "1px solid #e8eaee", // very thin, subtle shade of background
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2} sx={{ letterSpacing: 0.5 }}>
          Fix Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <RequestSummaryBar allRequests={allRequests} serviceTypes={serviceTypes} />
      </Box>

      {/* Group 2: Filters, Dropdown, and Badges */}
      <Box       
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#f8fafc",
          boxShadow: "none",
        //   border: "1px solid #e8eaee", // very thin, subtle shade of background
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
          Search requests..
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FilterBadgesBar badges={badges} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={2}
          sx={{
            alignItems: { sm: "center" },
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <RequestSelectDropdown
            requests={filteredRequests}
            selectedRequestId={selectedRequestId}
            onSelect={setSelectedRequestId}
          />
          <RequestFilters
            serviceTypes={serviceTypes}
            statuses={statuses}
            serviceType={serviceType}
            status={status}
            dateFrom={dateFrom}
            dateTo={dateTo}
            setServiceType={setServiceType}
            setStatus={setStatus}
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
            onClear={() => {
              setServiceType("");
              setStatus("");
              setDateFrom("");
              setDateTo("");
              setSelectedRequestId(null);
            }}
          />
        </Stack>      
      </Box>

      {/* Group 3: Latest Requests List */}
      <Box        
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#fafbfc",
          boxShadow: "none",
          // Add a thin border if you want: border: "1px solid #eceff1",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
          Latest Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            maxHeight: { xs: 340, sm: 400 }, // max height for mobile and up
            overflowY: "auto",
            pr: 1, // space for scrollbar
          }}
        >
          <LatestRequestsGrid
            requests={filteredRequests.slice(0, visibleCount)}
            onSelect={setSelectedRequestId}
            selectedRequestId={selectedRequestId}
            // maxVisible={visibleCount}
          />
        </Box>
        {visibleCount < filteredRequests.length && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <button
              style={{
                border: "1px solid #d1d5db",
                background: "#f8fafc",
                color: "#222",
                borderRadius: 8,
                padding: "6px 18px",
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 500,
              }}
              onClick={() => setVisibleCount((c) => c + 5)}
            >
              Load More
            </button>
          </Box>
        )}
      </Box>

      {/* Group 4: Request Details */}
      {selectedRequest && (
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            mb: 3,
            bgcolor: "#fafbfc",
            // No border, no shadow, no elevation
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
            Request Details...
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <FixRequestDetails request={selectedRequest} onBack={() => setSelectedRequestId(null)} />
        </Box>
      )}
    </Box>
  );
};

export default FixRequestTab;