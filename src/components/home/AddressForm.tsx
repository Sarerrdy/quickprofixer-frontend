import React from 'react';
import { TextField, Box } from '@mui/material';

interface AddressFormProps {
  newAddress: string;
  setNewAddress: (address: string) => void;
  landmark: string;
  setLandmark: (landmark: string) => void;
  town: string;
  setTown: (town: string) => void;
  lga: string;
  setLga: (lga: string) => void;
  country: string;
  setCountry: (country: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  newAddress,
  setNewAddress,
  landmark,
  setLandmark,
  town,
  setTown,
  lga,
  setLga,
  country,
  setCountry,
}) => {
  return (
    <Box component="form" sx={{ mt: 2 }}>
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <TextField
        label="Nearest Landmark"
        variant="outlined"
        fullWidth
        margin="normal"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
      />
      <TextField
        label="Town"
        variant="outlined"
        fullWidth
        margin="normal"
        value={town}
        onChange={(e) => setTown(e.target.value)}
      />
      <TextField
        label="LGA"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lga}
        onChange={(e) => setLga(e.target.value)}
      />
      <TextField
        label="Country"
        variant="outlined"
        fullWidth
        margin="normal"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
    </Box>
  );
};

export default AddressForm;