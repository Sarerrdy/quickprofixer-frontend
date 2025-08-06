import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import FixDetails from "../shared/FixDetails";
import FixSearch from "../shared/FixSearch";
import FixFilters from "../shared/FixFilters";
import FilterBadgesBar from "../shared/FilterBadgesBar";
import { sample } from "../../../sample";
import FixGrid from "../shared/FixGrid";
import { FIX_STATUSES } from "../shared/FixStatuses";
import FixSummaryBar from "../shared/FixSummaryBar";
import FixFilterBar from "../shared/FixFilterBar";

const RequestTab: React.FC = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<string | number | null>(null);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  // Get all requests ordered by date
  const allRequests = [...sample.fixRequests].sort(
    (a, b) => new Date(b.preferredSchedule).getTime() - new Date(a.preferredSchedule).getTime()
  );

  // Unique service types for filter dropdown
  const serviceTypes = Array.from(new Set(allRequests.map((r) => r.specialization?.name).filter(Boolean)));
  const statuses = FIX_STATUSES;

  // Filter logic
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
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2} sx={{ letterSpacing: 0.5 }}>
          Fix Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FixSummaryBar
          allRequests={allRequests}
          serviceTypes={serviceTypes}
          type="request"
        />
      </Box>

      {/* Group 2: Filters, Dropdown, and Badges */}
     <Box
  sx={{
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    mb: 3,
    bgcolor: "#f8fafc",
    boxShadow: "none",
  }}
>
  <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
    Search requests..
  </Typography>
  <Divider sx={{ mb: 2 }} />
  <FixFilterBar
    badges={badges}
    requests={filteredRequests}
    selectedRequestId={selectedRequestId}
    onSelect={setSelectedRequestId}
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
</Box>

      {/* Group 3: Latest Requests List */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 3,
          bgcolor: "#fafbfc",
          boxShadow: "none",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
          Latest Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            maxHeight: { xs: 340, sm: 400 },
            overflowY: "auto",
            pr: 1,
          }}
        >
          <FixGrid
            requests={filteredRequests.slice(0, visibleCount)}
            onSelect={setSelectedRequestId}
            selectedRequestId={selectedRequestId}
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
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ letterSpacing: 0.2 }}>
            Request Details...
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <FixDetails request={selectedRequest} onBack={() => setSelectedRequestId(null)} />
        </Box>
      )}
    </Box>
  );
};

export default RequestTab;