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
}

interface FixerListProps {
  fixers: Fixer[];
}

const FixerList: React.FC<FixerListProps> = ({ fixers }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Available Fixers
      </Typography>
      {fixers.length === 0 ? (
        <Typography>No fixers found.</Typography>
      ) : (
        fixers.map((fixer) => <FixerCard key={fixer.id} fixer={fixer} />)
      )}
    </Box>
  );
};

export default FixerList;