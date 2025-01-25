import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Box, Button } from '@mui/material';
import AddressForm from './AddressForm';
import MapComponent from './MapComponent';

// Extend the Window interface to include the google and initMap properties
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const LocationTab: React.FC = () => {
  const [locationOption, setLocationOption] = useState('current');
  const [newAddress, setNewAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [town, setTown] = useState('');
  const [lga, setLga] = useState('');
  const [country, setCountry] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [manualLocation, setManualLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationOption((event.target as HTMLInputElement).value);
  };

  const handleConfirmLocation = () => {
    if (locationOption === 'current' && currentLocation) {
      setSelectedLocation(currentLocation);
    } else if (locationOption === 'new' && manualLocation) {
      setSelectedLocation(manualLocation);
    }
    // Add any additional logic for confirming the location here
    console.log('Confirmed Location:', selectedLocation);
  };

  useEffect(() => {
    if (locationOption === 'current') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, [locationOption]);

  return (
    <Box>
      <FormControl component="fieldset">
        <RadioGroup value={locationOption} onChange={handleLocationChange}>
          <Box display="flex" flexDirection="row">
            <FormControlLabel value="current" control={<Radio />} label="Use my current location" />
            <FormControlLabel value="registered" control={<Radio />} label="Use my registered address" />
            <FormControlLabel value="new" control={<Radio />} label="Add a new address" />
          </Box>
        </RadioGroup>
      </FormControl>
      {locationOption === 'new' && (
        <AddressForm
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          landmark={landmark}
          setLandmark={setLandmark}
          town={town}
          setTown={setTown}
          lga={lga}
          setLga={setLga}
          country={country}
          setCountry={setCountry}
        />
      )}
      {locationOption === 'current' && currentLocation && (
        <MapComponent
          currentLocation={currentLocation}
          manualLocation={manualLocation}
          setManualLocation={setManualLocation}
        />
      )}
      {(locationOption === 'current' || locationOption === 'new') && (
        <Button variant="contained" color="primary" onClick={handleConfirmLocation} sx={{ mt: 2 }}>
          Confirm Location
        </Button>
      )}
    </Box>
  );
};

export default LocationTab;