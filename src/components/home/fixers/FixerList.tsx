import React from 'react';
import { Box, Typography } from '@mui/material';
import FixerCard from './FixerCard';

interface Fixer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  specializations: string;
  certifications?: string;
  verificationDocument: string;
  isVerified: boolean;
  rating: number;
  location: string;
  isAvailable: boolean;
  reviews: string;
  experienceYears: number;
  portfolio: string;
  rateType: string;
  rate: number;
  imageUrl: string;
}

interface FixerListProps {
  fixers: Fixer[];
  previewData: {
    serviceType: string;
    selectedDate: Date | null;
    title: string;
    description: string;
    image: File | null;
    document: File | null;
    links: { title: string; url: string }[];
    address: string;
    landmark: string;
    town: string;
    lga: string;
    country: string;
    serviceTypeId: number | null;
    addressId: number | 0;
  };
  clientId: string;
}

const FixerList: React.FC<FixerListProps> = ({ fixers, previewData, clientId }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Available Fixers
      </Typography>
      {fixers.length === 0 ? (
        <Typography>No fixers found.</Typography>
      ) : (
        fixers.map((fixer) => (
          <FixerCard key={fixer.id} fixer={fixer} previewData={previewData} clientId={clientId} />
        ))
      )}
    </Box>
  );
};

export default FixerList;





// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import FixerCard from './FixerCard';

// interface Fixer {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   specializations: string;
//   certifications?: string;
//   verificationDocument: string;
//   isVerified: boolean;
//   rating: number;
//   location: string;
//   isAvailable: boolean;
//   reviews: string;
//   experienceYears: number;
//   portfolio: string;
//   rateType: string;
//   rate: number;
//   imageUrl: string;
// }

// interface FixerListProps {
//   fixers: Fixer[];
//   previewData: {
//     serviceType: string;
//     selectedDate: Date | null;
//     title: string;
//     description: string;
//     image: File | null;
//     document: File | null;
//     links: { title: string; url: string }[];
//     address: string;
//     landmark: string;
//     town: string;
//     lga: string;
//     country: string;
//     serviceTypeId: number | null;
//     addressId: number | 0;
//   };
//   clientId: string;
// }

// const FixerList: React.FC<FixerListProps> = ({ fixers, previewData, clientId }) => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Available Fixers
//       </Typography>
//       {fixers.length === 0 ? (
//         <Typography>No fixers found.</Typography>
//       ) : (
//         fixers.map((fixer) => (
//           <FixerCard key={fixer.id} fixer={fixer} previewData={previewData} clientId={clientId} />
//         ))
//       )}
//     </Box>
//   );
// };

// export default FixerList;