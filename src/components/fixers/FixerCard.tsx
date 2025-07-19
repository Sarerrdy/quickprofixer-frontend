import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Snackbar, Alert } from '@mui/material';
import { usePost } from '../../api/hooks/useApi';
import { Fixer } from './Fixer';
import { useNavigate } from 'react-router-dom';

/**
 * DTO for supporting files (image/document).
 */
interface SupportingFileDto {
  FileName: string;
  FileType: string;
  FileContent: string;
}

/**
 * DTO for fix request payload.
 */
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

/**
 * Props for FixerCard component.
 */
interface FixerCardProps {
  fixer: Fixer;
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
 * FixerCard displays a single fixer's details and allows sending a fix request.
 * - Uses Material UI for layout and styling.
 * - Shows loading, error, and success states.
 * - Navigates to dashboard on successful request.
 * - Uses Snackbar/Alert for toast notifications.
 */
const FixerCard: React.FC<FixerCardProps> = ({ fixer, clientId, previewData }) => {
  const { mutate: createFixRequest, isLoading, isError, isSuccess } = usePost<FixRequestDto>('fixrequest/fix-request');
  const navigate = useNavigate();

  // Snackbar state for toast notifications
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  // Show toast on error or success
  React.useEffect(() => {
    if (isError) {
      setSnackbarMsg('Error creating fix request.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    if (isSuccess) {
      setSnackbarMsg('Fix request created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      const timeout = setTimeout(() => {
        navigate('./dashboardPage');
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [isError, isSuccess, navigate]);

  /**
   * Handles sending a fix request to the selected fixer.
   */
  const handleSendFixRequest = async () => {
    const fixRequestDto: FixRequestDto = {
      JobDescription: previewData.description,
      SpecializationId: previewData.serviceTypeId,
      AddressId: previewData.addressId === null ? 0 : previewData.addressId,
      Location: previewData.town,
      PreferredSchedule: previewData.selectedDate ? previewData.selectedDate.toISOString() : '',
      FixerIds: [fixer.id.toString()],
      ClientId: clientId,
      Status: 'Pending',
      SupportingImage: previewData.image
        ? {
            FileName: previewData.image.name,
            FileType: previewData.image.type,
            FileContent: await previewData.image.text(),
          }
        : null,
      SupportingDocument: previewData.document
        ? {
            FileName: previewData.document.name,
            FileType: previewData.document.type,
            FileContent: await previewData.document.text(),
          }
        : null,
      SupportingFiles: previewData.links.map(link => link.url),
    };

    createFixRequest(fixRequestDto);
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      {/* Fixer profile image */}
      <CardMedia
        component="img"
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: '50%',
          m: 2,
          bgcolor: '#c9ced7',
        }}
        image={fixer.imgUrl}
        alt={`${fixer.firstName} ${fixer.lastName}`}
        loading="lazy"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{`${fixer.firstName} ${fixer.lastName}`}</Typography>
        <Typography variant="body2" color="textSecondary">{fixer.specializationName}</Typography>
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
        {/* Toast notification for error and success */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default FixerCard;