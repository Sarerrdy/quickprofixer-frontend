import React, { useRef } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import FixRequestList from "./FixRequestList";

const RequestSelectDropdown: React.FC<{
  requests: any[];
  selectedRequestId: string | number | null;
  onSelect: (id: string | number | null) => void;
}> = ({ requests, selectedRequestId, onSelect }) => {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = requests.filter(
    (req) =>
      req.jobDescription.toLowerCase().includes(search.toLowerCase()) ||
      req.location.toLowerCase().includes(search.toLowerCase())
  );

  // Hide dropdown when clicking outside
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

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex w-full">
        <div className="flex items-center bg-white border border-gray-300 rounded-l-xl h-9 flex-1">
          <span className="pl-2 text-gray-400">
            <SearchIcon fontSize="small" />
          </span>
          <input
            type="text"
            className="bg-transparent outline-none px-2 py-1 w-full text-sm"
            placeholder="Search Requests"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setOpen(true)}
          />
        </div>
        <button
          type="button"
          className="bg-white border border-l-0 border-gray-300 rounded-r-xl h-9 px-3 flex items-center text-gray-500 text-sm"
          onClick={() => setOpen((prev) => !prev)}
          tabIndex={-1}
        >
          ▼
        </button>
      </div>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-72 overflow-y-auto">
          <FixRequestList
            requests={filtered}
            onViewDetails={(req) => {
              onSelect(req.id);
              setOpen(false);
            }}
            title=""
            selectedId={selectedRequestId}
          />
        </div>
      )}
    </div>
  );
};

export default RequestSelectDropdown;