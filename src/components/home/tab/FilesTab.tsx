import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

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
    <div className="space-y-4">
      <div>
        <Typography variant="h6">Upload Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      <div>
        <Typography variant="h6">Upload Document</Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      <div>
        <Typography variant="h6">Add Links</Typography>
        <div className="flex space-x-2">
          <TextField
            label="Link Title"
            variant="outlined"
            fullWidth
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
          />
          <TextField
            label="Link URL"
            variant="outlined"
            fullWidth
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddLink}>
            Add
          </Button>
        </div>
        <ul className="mt-2 space-y-1">
          {links.map((link, index) => (
            <li key={index} className="text-blue-600 underline">
              <strong>{link.title}:</strong> {link.url}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilesTab;