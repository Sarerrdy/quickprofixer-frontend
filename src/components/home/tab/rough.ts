import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Box, Typography, IconButton, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddressForm from './AddressForm';
import MapComponent from './MapComponent';
import { useFetch } from '../../../api/hooks/useApi';

// Extend the Window interface to include the google and initMap properties
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

/**
 * Props for the LocationTab component
 */
interface LocationTabProps {
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
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  manualLocation: { lat: number; lng: number } | null;
  setManualLocation: (location: { lat: number; lng: number } | null) => void;
}

/**
 * LocationTab component allows users to select and confirm their location.
 * It supports using the current location, a registered address, or a manually entered address.
 */
const LocationTab: React.FC<LocationTabProps> = ({
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
  currentLocation,
  setCurrentLocation,
  manualLocation,
  setManualLocation,
}) => {
  const [locationOption, setLocationOption] = useState('registered');
  const [locationError, setLocationError] = useState<string | null>(null);

  // Fetch the registered address when the "registered" option is selected
  const { data: registeredAddress, error: fetchError } = useFetch(
    ['address', 6],
    '/address/6',
    {},
    { enabled: locationOption === 'registered' }
  );

  useEffect(() => {
    if (locationOption === 'registered' && registeredAddress) {
      const formattedAddress = `${registeredAddress.addressLine}, ${registeredAddress.landmark ? registeredAddress.landmark + ', ' : ''}${registeredAddress.town}, ${registeredAddress.lga}, ${registeredAddress.state}, ${registeredAddress.country}`;
      setNewAddress(formattedAddress);
      setLandmark(registeredAddress.landmark);
      setTown(registeredAddress.town);
      setLga(registeredAddress.lga);
      setCountry(registeredAddress.country);
    }
  }, [locationOption, registeredAddress]);

  /**
   * Handles the change of location option (current, registered, new).
   * @param event - The change event from the radio buttons.
   */
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationOption((event.target as HTMLInputElement).value);
  };

  /**
   * Checks if the provided latitude and longitude have sufficient precision.
   * @param lat - The latitude to check.
   * @param lng - The longitude to check.
   * @returns True if both latitude and longitude have more than 8 decimal places.
   */
  const isPreciseLocation = (lat: number, lng: number) => {
    const latPrecision = lat.toString().split('.')[1]?.length || 0;
    const lngPrecision = lng.toString().split('.')[1]?.length || 0;
    return latPrecision > 8 && lngPrecision > 8;
  };

  /**
   * Fetches a human-readable address from a plus code.
   * @param plusCode - The plus code to convert.
   * @returns The human-readable address or the original plus code if conversion fails.
   */
  const getHumanReadableAddress = async (plusCode: string) => {
    const response = await fetch(`https://plus.codes/api?address=${plusCode}`);
    const data = await response.json();
    return data.plus_code?.compound_code || plusCode;
  };

  /**
   * Fetches the address from the provided latitude and longitude coordinates.
   * Updates the state with the formatted address and other address components.
   * @param lat - The latitude of the location.
   * @param lng - The longitude of the location.
   */
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, async (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results[0]) {
        const addressComponents = results[0].address_components;
        const formattedAddress = results[0].formatted_address;
        console.log('Address Components:', addressComponents);
        console.log('Formatted Address:', formattedAddress);
        const plusCode = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('plus_code'))?.long_name || '';
        const locality = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('locality'))?.long_name || '';
        const administrativeArea = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('administrative_area_level_1'))?.long_name || '';
        const country = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('country'))?.long_name || '';
        let humanReadablePlusCode = '';
        if (plusCode) {
          humanReadablePlusCode = await getHumanReadableAddress(plusCode);
        }
        // Use formattedAddress for more useful information
        const address = formattedAddress || `${humanReadablePlusCode}, ${locality}, ${administrativeArea}, ${country}`.trim();
        setNewAddress(address);
        setTown(locality);
        setLga(administrativeArea);
        setCountry(country);
        console.log('Confirmed Location:', { lat, lng });
        console.log('Full Address:', address);
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  };

  /**
   * Effect hook to get the current location when the component mounts or the location option changes.
   * It uses the browser's geolocation API to get the current position.
   */
  useEffect(() => {
    if (locationOption === 'current') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (isPreciseLocation(latitude, longitude)) {
              setCurrentLocation({ lat: latitude, lng: longitude });
              getAddressFromCoordinates(latitude, longitude);
            } else {
              console.warn('Current location is not precise enough. Falling back to manual location.');
              if (manualLocation) {
                setCurrentLocation(manualLocation);
                getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
              } else {
                console.error('Manual location is not available.');
              }
            }
            setLocationError(null);
          },
          (error) => {
            console.error('Error getting current location:', error);
            setLocationError('Error getting current location. Please use the manual location option.');
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLocationError('Geolocation is not supported by this browser. Please use the manual location option.');
      }
    }
  }, [locationOption]);

  /**
   * Confirms the selected location and fetches the address from coordinates.
   */
  const refreshMap = () => {
    if (locationOption === 'current' && currentLocation) {
      if (isPreciseLocation(currentLocation.lat, currentLocation.lng)) {
        getAddressFromCoordinates(currentLocation.lat, currentLocation.lng);
      } else {
        console.warn('Current location is not precise enough. Falling back to manual location.');
        if (manualLocation) {
          getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
        } else {
          console.error('Manual location is not available.');
        }
      }
    } else if (locationOption === 'new' && manualLocation) {
      getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
    } else {
      console.error('No valid location option selected.');
    }
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <RadioGroup value={locationOption} onChange={handleLocationChange}>
          <Box display="flex" flexDirection="row">
            <FormControlLabel value="registered" control={<Radio />} label="Use my registered address" />
            <FormControlLabel value="current" control={<Radio />} label="Use my current location" />
            <FormControlLabel value="new" control={<Radio />} label="Add a new address" />
          </Box>
        </RadioGroup>
      </FormControl>
      {locationError && <Typography color="error">{locationError}</Typography>}
      {fetchError && <Typography color="error">Error fetching registered address.</Typography>}
      <Typography variant="h6" gutterBottom>
        Full Address: {newAddress}
        {locationOption === 'current' && (
          <IconButton onClick={refreshMap} aria-label="refresh" size="small">
            <RefreshIcon />
          </IconButton>
        )}
      </Typography>
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
        <Button variant="contained" color="primary" onClick={refreshMap} sx={{ mt: 2 }}>
          Confirm Location
        </Button>
      )}
    </Box>
  );
};

export default LocationTab;