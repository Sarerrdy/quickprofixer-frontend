import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia, Button } from '@mui/material';
import { usePost } from '../../../api/hooks/useApi';

interface SupportingFileDto {
  FileName: string;
  FileType: string;
  FileContent: string;
}

interface FixRequestDto {
  JobDescription: string;
  SpecializationId: number | null;
  AddressId: number | null;
  Location: string;
  PreferredSchedule: string;
  FixerIds: string[];
  ClientId: string;
  Status: string;
  SupportingImage?: SupportingFileDto | null;
  SupportingDocument?: SupportingFileDto | null;
  SupportingFiles: string[];
}

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
  clientId: string; // Add clientId prop
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
  }; // Add previewData prop
}

const FixerCard: React.FC<FixerCardProps> = ({ fixer, clientId, previewData }) => {
  const { mutate: createFixRequest, isLoading, isError, isSuccess } = usePost<FixRequestDto>('fixrequest/fix-request');

  const handleSendFixRequest = async () => {
    const fixRequestDto: FixRequestDto = {
      JobDescription: previewData.description,
      SpecializationId: previewData.serviceTypeId,
      AddressId: previewData.addressId === null ? 0 : previewData.addressId, // Set to 0 if addressId is null
      Location: previewData.town,
      PreferredSchedule: previewData.selectedDate ? previewData.selectedDate.toISOString() : '',
      FixerIds: [fixer.id.toString()],
      ClientId: clientId,
      Status: 'Pending',
      SupportingImage: previewData.image
        ? {
            FileName: previewData.image.name,
            FileType: previewData.image.type,
            FileContent: await previewData.image.text(), // Assuming the image content is base64 encoded
          }
        : null,
      SupportingDocument: previewData.document
        ? {
            FileName: previewData.document.name,
            FileType: previewData.document.type,
            FileContent: await previewData.document.text(), // Assuming the document content is base64 encoded
          }
        : null,
      SupportingFiles: previewData.links.map(link => link.url),
    };

    createFixRequest(fixRequestDto);
  };

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
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSendFixRequest}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Fix Request'}
        </Button>
        {isError && <Typography color="error">Error creating fix request.</Typography>}
        {isSuccess && <Typography color="success">Fix request created successfully!</Typography>}
      </CardContent>
    </Card>
  );
};

export default FixerCard;