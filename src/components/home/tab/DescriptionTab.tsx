import React from 'react';
import { TextField, Box } from '@mui/material';

interface DescriptionTabProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ title, setTitle, description, setDescription }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      component="form"
    >
      <TextField
        label="Request Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={6} // Set to a moderate default height
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
};

export default DescriptionTab;

















// import React from 'react';
// import { TextField } from '@mui/material';

// interface DescriptionTabProps {
//   title: string;
//   setTitle: (title: string) => void;
//   description: string;
//   setDescription: (description: string) => void;
// }

// const DescriptionTab: React.FC<DescriptionTabProps> = ({ title, setTitle, description, setDescription }) => {
//   return (
//     <form className="space-y-4">
//       <TextField
//         label="Request Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <TextField
//         label="Description"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//     </form>
//   );
// };

// export default DescriptionTab;