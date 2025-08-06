import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";

type Badge = {
  label: string;
  onRemove: () => void;
};

const FilterBadgesBar: React.FC<{ badges: Badge[] }> = ({ badges }) => {
  if (!badges.length) return null; // Auto-hide when empty

  return (
    <div
      className="w-full flex flex-wrap gap-2 z-50 justify-end pointer-events-auto lg:pr-32 py-2"
      style={{ minHeight: 40 }}
    >
      {badges.map((badge, idx) => (
        <span
          key={idx}
          className="inline-flex items-center bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border border-gray-400 shadow"
        >
          {badge.label}
          <button
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={badge.onRemove}
            tabIndex={0}
            aria-label={`Remove ${badge.label} filter`}
          >
            <CloseIcon fontSize="small" />
          </button>
        </span>
      ))}
    </div>
  );
};

export default FilterBadgesBar;