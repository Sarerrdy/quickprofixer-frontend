import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  const { control, trigger, formState: { errors } } = useForm({
    defaultValues: {
      newAddress: newAddress || '',
      landmark: landmark || '',
      town: town || '',
      lga: lga || '',
      country: country || '',
    },
  });

  // const handleBlur = async (field: string) => {
  //   await trigger(field);
  // };

    const handleBlur = async (field: "newAddress" | "landmark" | "town" | "lga" | "country") => {
    await trigger(field);
  };

  return (
    <Box component="form" sx={{ mt: 2 }}>
      <Controller
        name="newAddress"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.newAddress}
            helperText={errors.newAddress ? errors.newAddress.message : ''}
            onBlur={() => handleBlur('newAddress')}
          />
        )}
      />
      <Controller
        name="landmark"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nearest Landmark"
            variant="outlined"
            fullWidth
            margin="normal"
            onBlur={() => handleBlur('landmark')}
          />
        )}
      />
      <Controller
        name="town"
        control={control}
        rules={{ required: 'Town is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Town"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.town}
            helperText={errors.town ? errors.town.message : ''}
            onBlur={() => handleBlur('town')}
          />
        )}
      />
      <Controller
        name="lga"
        control={control}
        rules={{ required: 'LGA is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="LGA"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.lga}
            helperText={errors.lga ? errors.lga.message : ''}
            onBlur={() => handleBlur('lga')}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Country"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.country}
            helperText={errors.country ? errors.country.message : ''}
            onBlur={() => handleBlur('country')}
          />
        )}
      />
    </Box>
  );
};

export default AddressForm;