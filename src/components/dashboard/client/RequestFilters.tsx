import React, { useRef, useState } from "react";
import { FilterAlt as FilterIcon } from "@mui/icons-material";
import { REQUEST_STATUSES } from "../shared/statuses";

const RequestFilters: React.FC<{
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
}> = ({
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
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const isActive =
    !!serviceType || !!status || !!dateFrom || !!dateTo;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <button
        type="button"
        className={`flex items-center bg-white border border-gray-300 rounded-xl h-9 px-3 w-full shadow-sm transition
          ${isActive ? "border-gray-600" : ""}
        `}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FilterIcon fontSize="small" className={`mr-2 ${isActive ? "text-gray-700" : "text-gray-400"}`} />
        <span className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-700"}`}>Filters</span>
        <span className={`ml-auto ${isActive ? "text-gray-700" : "text-gray-400"}`}>▼</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-3 flex flex-col gap-3
          sm:max-w-xs w-full
        ">
          <select
            className={`bg-transparent outline-none text-sm px-2 py-2 border border-gray-200 rounded-md focus:border-gray-600 transition w-full cursor-pointer
              focus:bg-gray-100 focus:text-gray-900
            `}
            value={serviceType}
            onChange={e => setServiceType(e.target.value)}
            onFocus={e => e.target.classList.add("ring-2", "ring-gray-400")}
            onBlur={e => e.target.classList.remove("ring-2", "ring-gray-400")}
          >
            <option value="">All Services</option>
            {serviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="border-t border-gray-400 my-2" style={{ height: "2px" }} />
          <select
            className={`bg-transparent outline-none text-sm px-2 py-2 border border-gray-200 rounded-md focus:border-gray-600 transition w-full cursor-pointer
              focus:bg-gray-100 focus:text-gray-900
            `}
            value={status}
            onChange={e => setStatus(e.target.value)}
            onFocus={e => e.target.classList.add("ring-2", "ring-gray-400")}
            onBlur={e => e.target.classList.remove("ring-2", "ring-gray-400")}
          >
            <option value="">All Statuses</option>
            {REQUEST_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="border-t border-gray-400 my-2" style={{ height: "2px" }} />
          <div className="flex flex-col gap-2 w-full bg-gray-100 rounded-md px-2 py-2">
            <input
              type="date"
              className="bg-transparent outline-none text-sm px-2 py-2 border border-gray-200 rounded-md focus:border-gray-600 transition w-full cursor-pointer
                focus:bg-gray-200 focus:text-gray-900
              "
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              onFocus={e => e.target.classList.add("ring-2", "ring-gray-400")}
              onBlur={e => e.target.classList.remove("ring-2", "ring-gray-400")}
            />
            <span className="text-gray-400 self-center">-</span>
            <input
              type="date"
              className="bg-transparent outline-none text-sm px-2 py-2 border border-gray-200 rounded-md focus:border-gray-600 transition w-full cursor-pointer
                focus:bg-gray-200 focus:text-gray-900
              "
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              onFocus={e => e.target.classList.add("ring-2", "ring-gray-400")}
              onBlur={e => e.target.classList.remove("ring-2", "ring-gray-400")}
            />
          </div>
          <div className="border-t border-gray-400 my-2" style={{ height: "2px" }} />
          <button
            type="button"
            className={`border rounded-md h-9 px-3 flex items-center text-sm mt-2 transition w-full
              ${isActive
                ? "bg-gray-700 border-gray-700 text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200 cursor-not-allowed"}
            `}
            onClick={onClear}
            disabled={!isActive}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestFilters;