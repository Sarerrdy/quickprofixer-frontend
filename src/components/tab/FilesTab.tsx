import React from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

/**
 * Props for the FilesTab component.
 */
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

/**
 * FilesTab component for uploading images, documents, and adding supporting links.
 * - Uses Material UI for layout and input fields.
 * - No inline styles; all layout via MUI sx prop or Tailwind classes.
 */
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
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 600 },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Image upload section */}
      <Box>
        <Typography variant="h6">Upload Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full"
        />
      </Box>
      {/* Document upload section */}
      <Box>
        <Typography variant="h6">Upload Document</Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setDocument(e.target.files ? e.target.files[0] : null)}
          className="w-full"
        />
      </Box>

      {/* Display added links above the add link form */}
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
                      className="text-blue-600 underline break-all"
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
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Link URL"
        value={newLinkUrl}
        onChange={e => setNewLinkUrl(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleAddLink}
        disabled={!newLinkTitle.trim() || !newLinkUrl.trim()}
      >
        Add Link
      </Button>
    </Box>
  );
};

export default FilesTab;