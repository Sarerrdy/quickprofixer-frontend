import React from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface FilesTabProps {
  image: File | null;
  setImage: (file: File | null) => void;
  document: File | null;
  setDocument: (file: File | null) => void;
  links: { title: string; url: string }[];
  newLinkTitle: string;
  setNewLinkTitle: (title: string) => void;
  newLinkUrl: string;
  setNewLinkUrl: (url: string) => void;
  handleAddLink: () => void;
}

const FilesTab: React.FC<FilesTabProps> = ({
  image,
  setImage,
  document,
  setDocument,
  links,
  newLinkTitle,
  setNewLinkTitle,
  newLinkUrl,
  setNewLinkUrl,
  handleAddLink,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Image upload */}
      <Box>
        <Typography variant="h6">Upload Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
          style={{ width: '100%' }}
        />
      </Box>
      {/* Document upload */}
      <Box>
        <Typography variant="h6">Upload Document</Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setDocument(e.target.files ? e.target.files[0] : null)}
          style={{ width: '100%' }}
        />
      </Box>

      {/* Show added links above the add link form */}
      {links.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Added Links:
          </Typography>
          <List>
            {links.map((link, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemText
                primary={
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'underline', wordBreak: 'break-all' }}
                  >
                    {link.title}
                  </a>
                }
                secondary={link.url}
              />
            </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Add links form */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Add Links
      </Typography>
      <TextField
        label="Link Title"
        value={newLinkTitle}
        onChange={e => setNewLinkTitle(e.target.value)}
        sx={{ mb: 1 }}
      />
      <TextField
        label="Link URL"
        value={newLinkUrl}
        onChange={e => setNewLinkUrl(e.target.value)}
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={handleAddLink}>
        Add Link
      </Button>
    </Box>
  );
};

export default FilesTab;















// import React from 'react';
// import { Typography, TextField, Button, Box } from '@mui/material';

// interface FilesTabProps {
//   image: File | null;
//   setImage: (file: File | null) => void;
//   document: File | null;
//   setDocument: (file: File | null) => void;
//   links: { title: string; url: string }[];
//   newLinkTitle: string;
//   setNewLinkTitle: (title: string) => void;
//   newLinkUrl: string;
//   setNewLinkUrl: (url: string) => void;
//   handleAddLink: () => void;
// }

// const FilesTab: React.FC<FilesTabProps> = ({
//   image,
//   setImage,
//   document,
//   setDocument,
//   links,
//   newLinkTitle,
//   setNewLinkTitle,
//   newLinkUrl,
//   setNewLinkUrl,
//   handleAddLink,
// }) => {
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         maxWidth: { xs: '100%', sm: 600 },
//         mx: 'auto',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 3,
//       }}
//     >
//       <Box>
//         <Typography variant="h6">Upload Image</Typography>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
//           style={{ width: '100%' }}
//         />
//       </Box>
//       <Box>
//         <Typography variant="h6">Upload Document</Typography>
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
//           style={{ width: '100%' }}
//         />
//       </Box>
//       <Box>
//         <Typography variant="h6">Add Links</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 1 }}>
//           <TextField
//             label="Link Title"
//             variant="outlined"
//             fullWidth
//             value={newLinkTitle}
//             onChange={(e) => setNewLinkTitle(e.target.value)}
//           />
//           <TextField
//             label="Link URL"
//             variant="outlined"
//             fullWidth
//             value={newLinkUrl}
//             onChange={(e) => setNewLinkUrl(e.target.value)}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddLink}
//             sx={{ minWidth: 80 }}
//           >
//             Add
//           </Button>
//         </Box>
//         <ul style={{ marginTop: 8, paddingLeft: 16 }}>
//           {links.map((link, index) => (
//             <li key={index} style={{ color: '#2563eb', textDecoration: 'underline', wordBreak: 'break-all' }}>
//               <strong>{link.title}:</strong> {link.url}
//             </li>
//           ))}
//         </ul>
//       </Box>
//     </Box>
//   );
// };

// export default FilesTab;
