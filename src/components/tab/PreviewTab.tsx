import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow, Divider } from '@mui/material';

/**
 * Props for the PreviewTab component.
 * Displays a summary of the user's request before submission.
 */
interface PreviewTabProps {
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
}

/**
 * PreviewTab component renders a summary table of all request details,
 * including service, date, description, address, and supporting files/links.
 * - Uses Material UI Table and Typography for layout.
 * - No inline styles; all layout via MUI sx prop.
 */
const PreviewTab: React.FC<PreviewTabProps> = ({
  serviceType,
  selectedDate,
  title,
  description,
  image,
  document,
  links,
  address,
  landmark,
  town,
  lga,
  country,
}) => {
  /**
   * Helper to render file and link rows for the supporting files section.
   * Uploaded image/document are previewed as "Supporting Image" or "Supporting Document".
   */
  const renderFileRows = () => {
    const rows: React.ReactNode[] = [];

    if (image) {
      rows.push(
        <TableRow key="supporting-image">
          <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
            Supporting Image
          </TableCell>
          <TableCell sx={{ textAlign: 'left' }}>
            {image.name}
            {/* Optionally, show a thumbnail preview if image is available */}
            {image.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                className="mt-2 rounded shadow"
                style={{ maxWidth: '120px', maxHeight: '80px', display: 'block' }}
              />
            )}
          </TableCell>
        </TableRow>
      );
    }
    if (document) {
      rows.push(
        <TableRow key="supporting-document">
          <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
            Supporting Document
          </TableCell>
          <TableCell sx={{ textAlign: 'left' }}>
            {document.name}
          </TableCell>
        </TableRow>
      );
    }
    links.forEach((link, idx) => {
      rows.push(
        <React.Fragment key={`link-${idx}`}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
              Link Title
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{link.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
              Link Address
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{link.url}</TableCell>
          </TableRow>
        </React.Fragment>
      );
    });

    return rows;
  };

  return (
     <Box
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: { xs: '100%', sm: 700, md: '70vw', lg: '60vw' },
      mx: 'auto',
    }}
  >
      {/* Main heading */}
      <Typography variant="h5" gutterBottom>
        Preview of Your Request
      </Typography>

      {/* --- Request Details --- */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
        Request Details
      </Typography>
      <Table size="small" sx={{ width: '100%', mb: 3 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
              Service Type
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{serviceType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              Date
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>
              {selectedDate ? selectedDate.toLocaleString() : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              Request Title
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              Description
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider sx={{ my: 2 }} />

      {/* --- Address Details --- */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
        Address Details
      </Typography>
      <Table size="small" sx={{ width: '100%', mb: 3 }}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
              Address
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              Landmark
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{landmark}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              Town
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{town}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              LGA
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{lga}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right', pr: 2 }}>
              Country
            </TableCell>
            <TableCell sx={{ textAlign: 'left' }}>{country}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider sx={{ my: 2 }} />

      {/* --- Supporting Files & Links --- */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
        Supporting Files & Links
      </Typography>
      <Table size="small" sx={{ width: '100%', mb: 3 }}>
        <TableBody>
          {renderFileRows()}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PreviewTab;