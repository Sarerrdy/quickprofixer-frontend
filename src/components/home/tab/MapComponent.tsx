import React, { useEffect } from 'react';

interface MapComponentProps {
  currentLocation: { lat: number; lng: number } | null;
  manualLocation: { lat: number; lng: number } | null;
  setManualLocation: (location: { lat: number; lng: number } | null) => void;
  onError: (error: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ currentLocation, manualLocation, setManualLocation }) => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: currentLocation || { lat: 0, lng: 0 },
        zoom: currentLocation ? 15 : 2,
      });

      let marker: google.maps.Marker | null = null;

      if (currentLocation) {
        marker = new window.google.maps.Marker({
          position: currentLocation,
          map: map,
        });
      }

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

    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, [currentLocation, setManualLocation]);

  return <div id="map" style={{ width: '100%', height: '400px', marginTop: '16px' }} />;
};

export default MapComponent;