import React, { useEffect } from 'react';

/**
 * Props for the MapComponent.
 * - currentLocation: user's current coordinates (if available)
 * - manualLocation: coordinates selected by user on the map
 * - setManualLocation: callback to update manual location
 * - onError: callback for error handling
 */
interface MapComponentProps {
  currentLocation: { lat: number; lng: number } | null;
  manualLocation: { lat: number; lng: number } | null;
  setManualLocation: (location: { lat: number; lng: number } | null) => void;
  onError: (error: any) => void;
}

/**
 * MapComponent displays a Google Map for location selection.
 * - Centers on currentLocation if available.
 * - Allows user to click on the map to select a manual location.
 * - Updates marker position on click.
 * - Uses Tailwind CSS for layout (no inline styles).
 */
const MapComponent: React.FC<MapComponentProps> = ({
  currentLocation,
  manualLocation,
  setManualLocation,
}) => {
  useEffect(() => {
    /**
     * Initializes the Google Map and sets up marker/click handler.
     */
    const initMap = () => {
      const map = new window.google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: currentLocation || { lat: 0, lng: 0 },
          zoom: currentLocation ? 15 : 2,
        }
      );

      let marker: google.maps.Marker | null = null;

      // Place marker at current location if available
      if (currentLocation) {
        marker = new window.google.maps.Marker({
          position: currentLocation,
          map: map,
        });
      }

      // Allow user to select a location by clicking on the map
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        const clickedLocation = event.latLng;
        if (clickedLocation) {
          setManualLocation({
            lat: clickedLocation.lat(),
            lng: clickedLocation.lng(),
          });

          if (marker) {
            marker.setPosition(clickedLocation);
          } else {
            marker = new window.google.maps.Marker({
              position: clickedLocation,
              map: map,
            });
          }
        }
      });
    };

    // Initialize map when Google Maps API is loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, [currentLocation, setManualLocation]);

  // Tailwind CSS for map container: full width, fixed height, margin top
  return (
    <div
      id="map"
      className="w-full h-[400px] mt-4 rounded shadow"
    />
  );
};

export default MapComponent;