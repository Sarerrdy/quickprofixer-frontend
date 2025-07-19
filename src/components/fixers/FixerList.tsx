import React from 'react';
import { Box, Typography } from '@mui/material';
import FixerCard from './FixerCard';
import { Fixer } from './Fixer';

/**
 * Props for FixerList component.
 * - fixers: array of available fixers to display
 * - clientId: ID of the client making the request
 * - previewData: request details to send to FixerCard
 */
interface FixerListProps {
  fixers: Fixer[];
  clientId: string;
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
}

/**
 * FixerList displays a list of available fixers matching the search criteria.
 * - Uses Material UI Box for layout and spacing.
 * - Uses FixerCard for each fixer.
 * - No inline styles; layout via MUI sx prop.
 */
const FixerList: React.FC<FixerListProps> = ({ fixers, previewData, clientId }) => {
  return (
    <Box className="w-full max-w-3xl mx-auto py-4 px-2">
      <Typography variant="h5" gutterBottom>
        Available Fixers
      </Typography>
      {fixers.length === 0 ? (
        <Typography>No fixers found.</Typography>
      ) : (
        <div className="flex flex-col gap-4">
          {fixers.map((fixer) => (
            <FixerCard key={fixer.id} fixer={fixer} previewData={previewData} clientId={clientId} />
          ))}
        </div>
      )}
    </Box>
  );
};

export default FixerList;