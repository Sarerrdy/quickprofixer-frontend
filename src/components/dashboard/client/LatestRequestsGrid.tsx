import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import RequestItem from "./RequestItem";

type Request = {
  id: string | number;
  jobDescription: string;
  preferredSchedule: string;
};

interface LatestRequestsGridProps {
  requests: Request[];
  onSelect: (id: string | number) => void;
  selectedRequestId: string | number | null; // <-- Add this prop
  maxVisible?: number;
}

const LatestRequestsGrid: React.FC<LatestRequestsGridProps> = ({
  requests,
  onSelect,
  selectedRequestId,
  maxVisible = 6,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleRequests = showAll ? requests : requests.slice(0, maxVisible);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {visibleRequests.map((req) => (
          <RequestItem
            key={req.id}
            title={req.jobDescription || "No description"}
            date={
              req.preferredSchedule
                ? new Date(req.preferredSchedule).toLocaleDateString()
                : "No date"
            }
            onClick={() => onSelect(req.id)}
            selected={selectedRequestId === req.id} // <-- Pass selected
          />
        ))}
      </Box>
      {!showAll && requests.length > maxVisible && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowAll(true)}
            sx={{ borderRadius: 2 }}
          >
            View More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LatestRequestsGrid;

















// import React, { useState } from "react";
// import { Box, Button } from "@mui/material";
// import RequestItem from "./RequestItem";

// type Request = {
//   id: string | number;
//   jobDescription: string;
//   preferredSchedule: string;
// };

// interface LatestRequestsGridProps {
//   requests: Request[];
//   onSelect: (id: string | number) => void;
//   maxVisible?: number;
// }

// const LatestRequestsGrid: React.FC<LatestRequestsGridProps> = ({
//   requests,
//   onSelect,
//   maxVisible = 6,
// }) => {
//   const [showAll, setShowAll] = useState(false);
//   const visibleRequests = showAll ? requests : requests.slice(0, maxVisible);

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         {visibleRequests.map((req) => (
//           <RequestItem
//             key={req.id}
//             title={req.jobDescription || "No description"}
//             date={
//               req.preferredSchedule
//                 ? new Date(req.preferredSchedule).toLocaleDateString()
//                 : "No date"
//             }
//             onClick={() => onSelect(req.id)}
//           />
//         ))}
//       </Box>
//       {!showAll && requests.length > maxVisible && (
//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setShowAll(true)}
//             sx={{ borderRadius: 2 }}
//           >
//             View More
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default LatestRequestsGrid;