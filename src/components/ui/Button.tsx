// src/components/ui/Button.tsx
import React from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, children }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    {children}
  </Button>
);

export default CustomButton;