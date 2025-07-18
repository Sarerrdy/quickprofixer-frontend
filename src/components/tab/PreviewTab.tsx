import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow, Divider } from '@mui/material';

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
  // Helper to render file/link rows
  const renderFileRows = () => {
    const rows: { title: string; url: string }[] = [];

    if (image) {
      rows.push({ title: 'Image', url: image.name });
    }
    if (document) {
      rows.push({ title: 'Document', url: document.name });
    }
    links.forEach(link => {
      rows.push({ title: link.title, url: link.url });
    });

    return rows.map((item, idx) => (
      <React.Fragment key={idx}>
        <TableRow>
          <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
            link title
          </TableCell>
          <TableCell sx={{ textAlign: 'left' }}>{item.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: 600, width: 160, textAlign: 'right', pr: 2 }}>
            link address
          </TableCell>
          <TableCell sx={{ textAlign: 'left' }}>{item.url}</TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
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


















// import React from 'react';
// import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

// interface PreviewTabProps {
//   serviceType: string;
//   selectedDate: Date | null;
//   title: string;
//   description: string;
//   image: File | null;
//   document: File | null;
//   links: { title: string; url: string }[];
//   address: string;
//   landmark: string;
//   town: string;
//   lga: string;
//   country: string;
// }

// const PreviewTab: React.FC<PreviewTabProps> = ({
//   serviceType,
//   selectedDate,
//   title,
//   description,
//   image,
//   document,
//   links,
//   address,
//   landmark,
//   town,
//   lga,
//   country,
// }) => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Preview of Your Request
//       </Typography>
//       <Typography variant="h6">Service Type</Typography>
//       <Typography variant="body1">{serviceType}</Typography>
//       <Typography variant="h6" sx={{ mt: 2 }}>Date</Typography>
//       <Typography variant="body1">{selectedDate ? selectedDate.toLocaleString() : 'N/A'}</Typography>
//       <Typography variant="h6" sx={{ mt: 2 }}>Request Title</Typography>
//       <Typography variant="body1">{title}</Typography>
//       <Typography variant="h6" sx={{ mt: 2 }}>Description</Typography>
//       <Typography variant="body1">{description}</Typography>
//       <Typography variant="h6" sx={{ mt: 2 }}>Supporting Files</Typography>
//       <List>
//         {image && (
//           <ListItem>
//             <ListItemText primary="Image" secondary={image.name} />
//           </ListItem>
//         )}
//         {document && (
//           <ListItem>
//             <ListItemText primary="Document" secondary={document.name} />
//           </ListItem>
//         )}
//         {links.map((link, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={link.title} secondary={link.url} />
//           </ListItem>
//         ))}
//       </List>
//       <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
//       <Typography variant="body1">{address}</Typography>
//       <Typography variant="body1">{landmark}</Typography>
//       <Typography variant="body1">{town}</Typography>
//       <Typography variant="body1">{lga}</Typography>
//       <Typography variant="body1">{country}</Typography>
//     </Box>
//   );
// };

// export default PreviewTab;
