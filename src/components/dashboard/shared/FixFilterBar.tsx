import React from "react";
import { Stack } from "@mui/material";
import FilterBadgesBar from "./FilterBadgesBar";
import FixSearch from "./FixSearch";
import FixFilters from "./FixFilters";

interface FixFilterBarProps {
  badges: { label: string; onRemove: () => void }[];
  requests: any[];
  selectedRequestId: string | number | null;
  onSelect: (id: string | number | null) => void;
  serviceTypes: string[];
  statuses: string[];
  serviceType: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  setServiceType: (v: string) => void;
  setStatus: (v: string) => void;
  setDateFrom: (v: string) => void;
  setDateTo: (v: string) => void;
  onClear: () => void;
  type?: "request" | "booking";
}

const FixFilterBar: React.FC<FixFilterBarProps> = ({
  badges,
  requests,
  selectedRequestId,
  onSelect,
  serviceTypes,
  statuses,
  serviceType,
  status,
  dateFrom,
  dateTo,
  setServiceType,
  setStatus,
  setDateFrom,
  setDateTo,
  onClear,
  type = "request",
}) => {
  return (
    <>
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
        <FixSearch
          requests={requests}
          selectedRequestId={selectedRequestId}
          onSelect={onSelect}
        />
        <FixFilters
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
          onClear={onClear}
          type={type} // <-- Pass type here!
        />
      </Stack>
    </>
  );
};

export default FixFilterBar;