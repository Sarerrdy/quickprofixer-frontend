import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../api/hooks/useApi';

/**
 * Service interface for search results.
 */
interface Service {
  id: number;
  name: string;
}

/**
 * Props for the SearchSection component.
 */
interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectService: (serviceName: string, serviceId: number) => void;
}

/**
 * SearchSection component allows users to search and select a service.
 * - Uses Tailwind CSS for layout and Material UI for error messages.
 * - Shows a validation message if no service is selected after user interaction.
 * - Notifies parent when a valid service is selected or cleared.
 */
const SearchSection: React.FC<SearchSectionProps> = ({ searchTerm, setSearchTerm, onSelectService }) => {
  // State for filtered search results
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  // State for input focus
  const [isFocused, setIsFocused] = useState(false);
  // Placeholder text for the input
  const [placeholder, setPlaceholder] = useState('Search for services...');
  // Controls display of validation message
  const [showError, setShowError] = useState(false);
  // Tracks if user has interacted with the search box
  const [hasInteracted, setHasInteracted] = useState(false);
  // Ref for the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch available services from API
  const { data: services, isLoading, error } = useFetch<Service[]>('services', '/service');

  /**
   * Filters services based on the current search term.
   */
  useEffect(() => {
    if (services) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  /**
   * Tracks user interaction with the search box.
   * Used to determine when to show validation messages.
   */
  useEffect(() => {
    if (searchTerm !== '') {
      setHasInteracted(true);
    }
  }, [searchTerm]);

  /**
   * Notifies parent when search box is cleared and controls validation message.
   * If the user has interacted and the search box is empty, show error.
   */
  useEffect(() => {
    if (searchTerm.trim() === '') {
      onSelectService('', -1); // Clear service selection in parent
      if (hasInteracted) setShowError(true);
      else setShowError(false);
    } else {
      setShowError(false);
    }
  }, [searchTerm, onSelectService, hasInteracted]);

  /**
   * Handles input focus event.
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * Handles input blur event.
   * Delays hiding the dropdown to allow click selection.
   */
  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  /**
   * Handles selection of a service from the dropdown.
   * Updates search term, placeholder, and notifies parent.
   */
  const handleSelectService = (serviceName: string, serviceId: number) => {
    setSearchTerm(serviceName);
    setPlaceholder(serviceName);
    onSelectService(serviceName, serviceId);
    setIsFocused(false);
  };

  return (
    <>
      {/* Section label */}
      <label className="flex justify-center text-xl p-2">What type of Services are you looking for?</label>
      {/* Validation message if no service is selected after interaction */}
      {showError && (
        // Use Material UI Typography for error styling
        <p className="text-red-600 mt-8 text-center font-medium">
          Please select a service before proceeding.
        </p>
      )}
      <div className="flex flex-col items-center mt-8 relative w-full">
        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-2 border rounded-lg w-1/2"
          placeholder={placeholder}
        />
        {/* Dropdown for filtered services */}
        {isFocused && filteredServices.length > 0 && (
          <div className="bg-white border border-t-0 rounded-b-lg z-10 w-1/2">
            {filteredServices.slice(0, 10).map(service => (
              <div
                key={service.id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelectService(service.name, service.id)}
              >
                <h4 className="text-lg">{service.name}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Loading and error states */}
      {isLoading && <p className="mt-4 text-center text-gray-500">Loading services...</p>}
      {error && <p className="mt-4 text-center text-red-600">Error loading services</p>}
    </>
  );
};

export default SearchSection;