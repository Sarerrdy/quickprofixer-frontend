import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Box, Button, Typography, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddressForm from './AddressForm';
import MapComponent from './MapComponent';
import { useFetch } from '../../api/hooks/useApi';
import { useQueryClient } from 'react-query';

/**
 * Utility to normalize any address field (town, lga, etc.).
 * Capitalizes each word and trims extra spaces.
 */
function normalizeAddressField(value: string): string {
  if (!value) return '';
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Interface for a registered address object.
 */
interface RegisteredAddress {
  addressLine: string;
  landmark?: string;
  town: string;
  lga: string;
  state: string;
  country: string;
}

/**
 * Props for the LocationTab component.
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
  addressId: number;
  setAddressId: (id: number) => void;
}

/**
 * Form for adding a new address.
 * Uses Material UI Box for layout.
 */
const AddNewAddressForm: React.FC<Omit<LocationTabProps, 'currentLocation' | 'setCurrentLocation' | 'manualLocation' | 'setManualLocation' | 'addressId' | 'setAddressId'>> = ({
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
}) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: { xs: '100%', sm: 600 },
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
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
  </Box>
);

/**
 * Map display for current or manual location.
 * Uses Material UI Box for layout and shadow.
 */
const CurrentLocationMap: React.FC<{
  currentLocation: { lat: number; lng: number } | null;
  manualLocation: { lat: number; lng: number } | null;
  setManualLocation: (location: { lat: number; lng: number } | null) => void;
  setMapError: (msg: string | null) => void;
}> = ({ currentLocation, manualLocation, setManualLocation, setMapError }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: { xs: '100%', sm: 900, md: 1100, lg: 1200 },
      mx: 'auto',
      my: 2,
      minHeight: 250,
      height: { xs: 250, sm: 320, md: 350 },
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 1,
      bgcolor: 'grey.100',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <MapComponent
      currentLocation={currentLocation}
      manualLocation={manualLocation}
      setManualLocation={setManualLocation}
      onError={setMapError}
    />
  </Box>
);

/**
 * LocationTab component for selecting and confirming address/location.
 * - Allows user to choose between registered, current, or new address.
 * - Uses Material UI for layout and controls.
 * - No inline styles; all layout via MUI sx prop.
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
  addressId,
  setAddressId,
}) => {
  const [locationOption, setLocationOption] = useState('registered');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Fetch the registered address when the "registered" option is selected
  const { data: registeredAddress, error: fetchError } = useFetch<RegisteredAddress>(
    ['address', 1],
    '/address/1',
    {},
    { enabled: locationOption === 'registered', staleTime: 0, cacheTime: 0 }
  );

  /**
   * Updates address fields based on selected location option.
   * - Registered: uses fetched address.
   * - Current/New: uses geocoded coordinates.
   */
  useEffect(() => {
    if (locationOption === 'registered' && registeredAddress) {
      const formattedAddress = `${normalizeAddressField(registeredAddress.addressLine)}, `
        + `${registeredAddress.landmark ? normalizeAddressField(registeredAddress.landmark) + ', ' : ''}`
        + `${normalizeAddressField(registeredAddress.town)}, `
        + `${normalizeAddressField(registeredAddress.lga)}, `
        + `${normalizeAddressField(registeredAddress.state)}, `
        + `${normalizeAddressField(registeredAddress.country)}`;
      setNewAddress(formattedAddress);
      setLandmark(normalizeAddressField(registeredAddress.landmark || ''));
      setTown(normalizeAddressField(registeredAddress.town));
      setLga(normalizeAddressField(registeredAddress.lga));
      setCountry(normalizeAddressField(registeredAddress.country));
    } else if (
      (locationOption === 'current' && currentLocation) ||
      (locationOption === 'new' && manualLocation)
    ) {
      const loc = locationOption === 'current' ? currentLocation : manualLocation;
      if (loc && loc.lat && loc.lng) {
        getAddressFromCoordinates(loc.lat, loc.lng);
      }
    }
  }, [locationOption, registeredAddress, currentLocation, manualLocation]);

  /**
   * Handles change of location option (radio group).
   */
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationOption((event.target as HTMLInputElement).value);
  };

  /**
   * Checks if coordinates are precise enough for geocoding.
   */
  const isPreciseLocation = (lat: number, lng: number) => {
    const latPrecision = lat.toString().split('.')[1]?.length || 0;
    const lngPrecision = lng.toString().split('.')[1]?.length || 0;
    return latPrecision > 8 && lngPrecision > 8;
  };

  /**
   * Confirms and geocodes the current location.
   */
  const handleConfirmLocation = () => {
    if (locationOption === 'current') {
      if (currentLocation) {
        if (isPreciseLocation(currentLocation.lat, currentLocation.lng)) {
          getAddressFromCoordinates(currentLocation.lat, currentLocation.lng);
        } else {
          if (manualLocation) {
            getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
          } else {
            setLocationError('Manual location is not available.');
          }
        }
      } else {
        setLocationError('No valid location option selected.');
      }
    }
  };

  /**
   * Gets a human-readable address from a plus code.
   */
  const getHumanReadableAddress = async (plusCode: string) => {
    const response = await fetch(`https://plus.codes/api?address=${plusCode}`);
    const data = await response.json();
    return data.plus_code?.compound_code || plusCode;
  };

  /**
   * Geocodes coordinates to address and updates address fields.
   */
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, async (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results && results[0]) {
        const addressComponents = results[0].address_components;
        const formattedAddress = results[0].formatted_address;
        const plusCode = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('plus_code'))?.long_name || '';
        const locality = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('locality'))?.long_name || '';
        const administrativeArea = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('administrative_area_level_1'))?.long_name || '';
        const country = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('country'))?.long_name || '';
        let humanReadablePlusCode = '';
        if (plusCode) {
          humanReadablePlusCode = await getHumanReadableAddress(plusCode);
        }
        const address = formattedAddress || `${humanReadablePlusCode}, ${normalizeAddressField(locality)}, ${normalizeAddressField(administrativeArea)}, ${normalizeAddressField(country)}`.trim();
        setNewAddress(address);
        setTown(normalizeAddressField(locality));
        setLga(normalizeAddressField(administrativeArea));
        setCountry(normalizeAddressField(country));
      } else {
        setMapError('Geocoder failed.');
      }
    });
  };

  /**
   * Requests browser geolocation when "current" location is selected.
   */
  useEffect(() => {
    if (locationOption === 'current') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLocationError(null);
          },
          (error) => {
            console.error('Geolocation error:', error);
            setLocationError(
              `Error getting current location (${error.code}: ${error.message}). Please use the manual location option.`
            );
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
   * Updates address from manual location coordinates if available.
   */
  useEffect(() => {
    if (locationOption === 'current' && manualLocation && manualLocation.lat && manualLocation.lng) {
      getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
    }
  }, [manualLocation, locationOption]);

  const queryClient = useQueryClient();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 600, md: '65vw', lg: '65%' },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {/* Refresh registered address button */}
      <Button onClick={() => queryClient.invalidateQueries(['address', 1])} sx={{ alignSelf: 'flex-end', mb: 1 }}>
        Refresh Address
      </Button>
      {/* Location option radio group */}
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <RadioGroup value={locationOption} onChange={handleLocationChange}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <FormControlLabel value="registered" control={<Radio />} label="Use my registered address" />
            <FormControlLabel value="current" control={<Radio />} label="Use my current location" />
            <FormControlLabel value="new" control={<Radio />} label="Add a new address" />
          </Box>
        </RadioGroup>
      </FormControl>
      {/* Error messages */}
      {locationError && <Typography color="error">{locationError}</Typography>}
      {Boolean(fetchError) && <Typography color="error">Error fetching registered address.</Typography>}
      {/* Display full address and refresh icon for current location */}
      <Typography variant="h6" gutterBottom sx={{ wordBreak: 'break-word' }}>
        Full Address: {newAddress}
        {locationOption === 'current' && (
          <IconButton onClick={handleConfirmLocation} aria-label="refresh" size="small">
            <RefreshIcon />
          </IconButton>
        )}
      </Typography>
      {/* Add new address form */}
      {locationOption === 'new' && (
        <AddNewAddressForm
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
      {/* Map for current location */}
      {locationOption === 'current' && currentLocation && (
        <CurrentLocationMap
          currentLocation={currentLocation}
          manualLocation={manualLocation}
          setManualLocation={setManualLocation}
          setMapError={setMapError}
        />
      )}
      {/* Map error message */}
      {mapError && <Typography color="error">{mapError}</Typography>}
    </Box>
  );
};

export default LocationTab;