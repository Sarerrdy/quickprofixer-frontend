import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@mui/material';

interface FixerCardProps {
  fixer: {
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
    imageUrl: string; // Add imageUrl property
  };
}

const FixerCard: React.FC<FixerCardProps> = ({ fixer }) => {
  return (
    <Card sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', margin: 2 }}
        image={fixer.imageUrl}
        alt={`${fixer.firstName} ${fixer.lastName}`}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{`${fixer.firstName} ${fixer.lastName}`}</Typography>
        <Typography variant="body2" color="textSecondary">{fixer.specializations}</Typography>
        <Typography variant="body2">{`Rating: ${fixer.rating}`}</Typography>
        <Typography variant="body2">{`Location: ${fixer.location}`}</Typography>
        <Typography variant="body2">{`Experience: ${fixer.experienceYears} years`}</Typography>
        <Typography variant="body2">{`Rate: ${fixer.rateType} ${fixer.rate}`}</Typography>
        <Typography variant="body2">{`Availability: ${fixer.isAvailable ? 'Available' : 'Not Available'}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default FixerCard;