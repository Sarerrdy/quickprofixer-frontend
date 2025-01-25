import React from 'react';
import { TextField } from '@mui/material';

interface DescriptionTabProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ title, setTitle, description, setDescription }) => {
  return (
    <form className="space-y-4">
      <TextField
        label="Request Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
};

export default DescriptionTab;