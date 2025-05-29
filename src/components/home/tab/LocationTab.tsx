import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Box, Button, Typography, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddressForm from './AddressForm';
import MapComponent from './MapComponent';
import { useFetch } from '../../../api/hooks/useApi';
import { useQueryClient } from 'react-query';

// Utility to normalize any address field (town, lga, etc.)
function normalizeAddressField(value: string): string {
  if (!value) return '';
  // Remove leading/trailing spaces, collapse multiple spaces, capitalize each word
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

interface RegisteredAddress {
  addressLine: string;
  landmark?: string;
  town: string;
  lga: string;
  state: string;
  country: string;
}

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
    // { enabled: locationOption === 'registered' }
     { enabled: locationOption === 'registered', staleTime: 0, cacheTime: 0 }
  );

  console.log('Registered Address:', registeredAddress);
  console.log('Fetch Error:', fetchError);

 

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
    }
  }, [locationOption, registeredAddress]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationOption((event.target as HTMLInputElement).value);
  };

  const isPreciseLocation = (lat: number, lng: number) => {
    const latPrecision = lat.toString().split('.')[1]?.length || 0;
    const lngPrecision = lng.toString().split('.')[1]?.length || 0;
    return latPrecision > 8 && lngPrecision > 8;
  };

  const handleConfirmLocation = () => {
    if (locationOption === 'current') {
      if (currentLocation) {
        if (isPreciseLocation(currentLocation.lat, currentLocation.lng)) {
          getAddressFromCoordinates(currentLocation.lat, currentLocation.lng);
        } else {
          console.warn('Current location is not precise enough. Falling back to manual location.');
          if (manualLocation) {
            getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
          } else {
            console.error('Manual location is not available.');
            setLocationError('Manual location is not available.');
          }
        }
      } else {
        console.error('No valid location option selected.');
        setLocationError('No valid location option selected.');
      }
    }
  };

  const getHumanReadableAddress = async (plusCode: string) => {
    const response = await fetch(`https://plus.codes/api?address=${plusCode}`);
    const data = await response.json();
    return data.plus_code?.compound_code || plusCode;
  };

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
        console.error('Geocoder failed due to:', status);
      }
    });
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

  useEffect(() => {
    if (locationOption === 'current') {
      handleConfirmLocation();
    }
  }, [locationOption, currentLocation, manualLocation]);

    const queryClient = useQueryClient();

  return (
    <Box>
    <Button onClick={() => queryClient.invalidateQueries(['address', 1])}>
      Refresh Address
    </Button>
      <>
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
          <IconButton onClick={handleConfirmLocation} aria-label="refresh" size="small">
            <RefreshIcon />
          </IconButton>
        )}
      </Typography>
      <>
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
            onError={(error: any) => setMapError(error)}
          />
        )}
      </>
      {mapError && <Typography color="error">{mapError}</Typography>}
      </>
    </Box>
  );
};

export default LocationTab;// import React, { useState, useEffect } from 'react';
// import { FormControl, FormControlLabel, Radio, RadioGroup, Box, Button, Typography, IconButton } from '@mui/material';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import AddressForm from './AddressForm';
// import MapComponent from './MapComponent';
// import { useFetch } from '../../../api/hooks/useApi';

// declare global {
//   interface Window {
//     google: any;
//     initMap: () => void;
//   }
// }

// interface RegisteredAddress {
//   addressLine: string;
//   landmark?: string;
//   town: string;
//   lga: string;
//   state: string;
//   country: string;
// }

// interface LocationTabProps {
//   newAddress: string;
//   setNewAddress: (address: string) => void;
//   landmark: string;
//   setLandmark: (landmark: string) => void;
//   town: string;
//   setTown: (town: string) => void;
//   lga: string;
//   setLga: (lga: string) => void;
//   country: string;
//   setCountry: (country: string) => void;
//   currentLocation: { lat: number; lng: number } | null;
//   setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
//   manualLocation: { lat: number; lng: number } | null;
//   setManualLocation: (location: { lat: number; lng: number } | null) => void;
//   addressId: number; // Ensure addressId is of type number
//   setAddressId: (id: number) => void; // Ensure setAddressId accepts only number
// }

// const LocationTab: React.FC<LocationTabProps> = ({
//   newAddress,
//   setNewAddress,
//   landmark,
//   setLandmark,
//   town,
//   setTown,
//   lga,
//   setLga,
//   country,
//   setCountry,
//   currentLocation,
//   setCurrentLocation,
//   manualLocation,
//   setManualLocation,
//   addressId,
//   setAddressId,
// }) => {
//   const [locationOption, setLocationOption] = useState('registered');
//   const [locationError, setLocationError] = useState<string | null>(null);
//   const [mapError, setMapError] = useState<string | null>(null);

//   // Fetch the registered address when the "registered" option is selected
//   const { data: registeredAddress, error: fetchError } = useFetch<RegisteredAddress>(
//     ['address', 1],
//     '/address/1',
//     {},
//     { enabled: locationOption === 'registered' }
//   );

//   useEffect(() => {
//     if (locationOption === 'registered' && registeredAddress) {
//       const formattedAddress = `${registeredAddress.addressLine}, ${registeredAddress.landmark ? registeredAddress.landmark + ', ' : ''}${registeredAddress.town}, ${registeredAddress.lga}, ${registeredAddress.state}, ${registeredAddress.country}`;
//       setNewAddress(formattedAddress);
//       setLandmark(registeredAddress.landmark || '');
//       setTown(registeredAddress.town);
//       setLga(registeredAddress.lga);
//       setCountry(registeredAddress.country);
//     }
//   }, [locationOption, registeredAddress]);

//   const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLocationOption((event.target as HTMLInputElement).value);
//   };

//   const isPreciseLocation = (lat: number, lng: number) => {
//     const latPrecision = lat.toString().split('.')[1]?.length || 0;
//     const lngPrecision = lng.toString().split('.')[1]?.length || 0;
//     return latPrecision > 8 && lngPrecision > 8;
//   };

//   const handleConfirmLocation = () => {
//     if (locationOption === 'current') {
//       if (currentLocation) {
//         if (isPreciseLocation(currentLocation.lat, currentLocation.lng)) {
//           getAddressFromCoordinates(currentLocation.lat, currentLocation.lng);
//         } else {
//           console.warn('Current location is not precise enough. Falling back to manual location.');
//           if (manualLocation) {
//             getAddressFromCoordinates(manualLocation.lat, manualLocation.lng);
//           } else {
//             console.error('Manual location is not available.');
//             setLocationError('Manual location is not available.');
//           }
//         }
//       } else {
//         console.error('No valid location option selected.');
//         setLocationError('No valid location option selected.');
//       }
//     }
//   };

//   const getHumanReadableAddress = async (plusCode: string) => {
//     const response = await fetch(`https://plus.codes/api?address=${plusCode}`);
//     const data = await response.json();
//     return data.plus_code?.compound_code || plusCode;
//   };

//   const getAddressFromCoordinates = async (lat: number, lng: number) => {
//     const geocoder = new window.google.maps.Geocoder();
//     const latlng = { lat, lng };
//     geocoder.geocode({ location: latlng }, async (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
//       if (status === 'OK' && results[0]) {
//         const addressComponents = results[0].address_components;
//         const formattedAddress = results[0].formatted_address;
//         console.log('Address Components:', addressComponents);
//         console.log('Formatted Address:', formattedAddress);
//         const plusCode = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('plus_code'))?.long_name || '';
//         const locality = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('locality'))?.long_name || '';
//         const administrativeArea = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('administrative_area_level_1'))?.long_name || '';
//         const country = addressComponents.find((component: google.maps.GeocoderAddressComponent) => component.types.includes('country'))?.long_name || '';
//         let humanReadablePlusCode = '';
//         if (plusCode) {
//           humanReadablePlusCode = await getHumanReadableAddress(plusCode);
//         }
//         const address = formattedAddress || `${humanReadablePlusCode}, ${locality}, ${administrativeArea}, ${country}`.trim();
//         setNewAddress(address);
//         setTown(locality);
//         setLga(administrativeArea);
//         setCountry(country);
//         console.log('Confirmed Location:', { lat, lng });
//         console.log('Full Address:', address);
//       } else {
//         console.error('Geocoder failed due to:', status);
//       }
//     });
//   };

//   useEffect(() => {
//     if (locationOption === 'current') {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setCurrentLocation({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//             setLocationError(null);
//           },
//           (error) => {
//             console.error('Error getting current location:', error);
//             setLocationError('Error getting current location. Please use the manual location option.');
//           },
//           { enableHighAccuracy: true }
//         );
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//         setLocationError('Geolocation is not supported by this browser. Please use the manual location option.');
//       }
//     }
//   }, [locationOption]);

//   useEffect(() => {
//     if (locationOption === 'current') {
//       handleConfirmLocation();
//     }
//   }, [locationOption, currentLocation, manualLocation]);

//   return (
//     <Box>
//       <>
//       <FormControl component="fieldset">
//         <RadioGroup value={locationOption} onChange={handleLocationChange}>
//           <Box display="flex" flexDirection="row">
//             <FormControlLabel value="registered" control={<Radio />} label="Use my registered address" />
//             <FormControlLabel value="current" control={<Radio />} label="Use my current location" />
//             <FormControlLabel value="new" control={<Radio />} label="Add a new address" />
//           </Box>
//         </RadioGroup>
//       </FormControl>
//       {locationError && <Typography color="error">{locationError}</Typography>}
//       {fetchError && <Typography color="error">Error fetching registered address.</Typography>}
//       <Typography variant="h6" gutterBottom>
//         Full Address: {newAddress}
//         {locationOption === 'current' && (
//           <IconButton onClick={handleConfirmLocation} aria-label="refresh" size="small">
//             <RefreshIcon />
//           </IconButton>
//         )}
//       </Typography>
//       <>
//         {locationOption === 'new' && (
//           <AddressForm
//             newAddress={newAddress}
//             setNewAddress={setNewAddress}
//             landmark={landmark}
//             setLandmark={setLandmark}
//             town={town}
//             setTown={setTown}
//             lga={lga}
//             setLga={setLga}
//             country={country}
//             setCountry={setCountry}
//           />
//         )}
//         {locationOption === 'current' && currentLocation && (
//           <MapComponent
//             currentLocation={currentLocation}
//             manualLocation={manualLocation}
//             setManualLocation={setManualLocation}
//             onError={(error: any) => setMapError(error)} // Add type for error
//           />
//         )}
//       </>
//       {mapError && <Typography color="error">{mapError}</Typography>}
//       </>
//     </Box>
//   );
// };

// export default LocationTab;