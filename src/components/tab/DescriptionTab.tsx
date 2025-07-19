import React from 'react';
import { TextField, Box } from '@mui/material';

/**
 * Props for the DescriptionTab component.
 */
interface DescriptionTabProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

/**
 * DescriptionTab component for entering request title and description.
 * - Uses Material UI TextField for input fields.
 * - Uses Material UI Box for layout.
 * - No inline styles; all layout via MUI sx prop.
 */
const DescriptionTab: React.FC<DescriptionTabProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  titlePlaceholder = '',
  descriptionPlaceholder = '',
}) => (
  <Box
       sx={{
         width: '100%',
         maxWidth: { xs: '100%', sm: '100vw', md: '60vw', lg: '50%' },
         mx: 'auto',
         display: 'flex',
         flexDirection: 'column',
         gap: 2,
         alignItems: 'center',
       }}
     >
    {/* Title input field */}
    <TextField
      label="Title"
      value={title}
      onChange={e => setTitle(e.target.value)}
      placeholder={titlePlaceholder}
      fullWidth
      variant="outlined"
      inputProps={{ maxLength: 100 }}
    />
    {/* Description input field */}
    <TextField
      label="Description"
      value={description}
      onChange={e => setDescription(e.target.value)}
      placeholder={descriptionPlaceholder}
      fullWidth
      multiline
      minRows={4}
      variant="outlined"
      inputProps={{ maxLength: 1000 }}
      sx={{
        '& .MuiInputBase-input': {
          resize: 'vertical', // Allow user to resize vertically
          minHeight: '80px',  // Minimum height for better UX
          maxHeight: '280px', // Prevent exceeding the visible panel height
          overflow: 'auto',
        },
      }}
    />
  </Box>
);

export default DescriptionTab;