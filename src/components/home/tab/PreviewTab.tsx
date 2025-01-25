import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

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
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Preview of Your Request
      </Typography>
      <Typography variant="h6">Service Type</Typography>
      <Typography variant="body1">{serviceType}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Date</Typography>
      <Typography variant="body1">{selectedDate ? selectedDate.toLocaleString() : 'N/A'}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Request Title</Typography>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Description</Typography>
      <Typography variant="body1">{description}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Supporting Files</Typography>
      <List>
        {image && (
          <ListItem>
            <ListItemText primary="Image" secondary={image.name} />
          </ListItem>
        )}
        {document && (
          <ListItem>
            <ListItemText primary="Document" secondary={document.name} />
          </ListItem>
        )}
        {links.map((link, index) => (
          <ListItem key={index}>
            <ListItemText primary={link.title} secondary={link.url} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
      <Typography variant="body1">{address}</Typography>
      <Typography variant="body1">{landmark}</Typography>
      <Typography variant="body1">{town}</Typography>
      <Typography variant="body1">{lga}</Typography>
      <Typography variant="body1">{country}</Typography>
    </Box>
  );
};

export default PreviewTab;