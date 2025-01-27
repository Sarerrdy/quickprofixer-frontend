// src/components/home/SearchSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../../api/hooks/useApi';

interface Service {
  id: number;
  name: string;
}

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectService: (serviceName: string, serviceId: number) => void; // Update prop type
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchTerm, setSearchTerm, onSelectService }) => {
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Search for services...');
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: services, isLoading, error } = useFetch<Service[]>('services', '/service');

  useEffect(() => {
    if (services) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Delay to allow click on dropdown items
  };

  const handleSelectService = (serviceName: string, serviceId: number) => {
    setSearchTerm(serviceName); // Set the selected service name as the search term
    setPlaceholder(serviceName); // Update the placeholder text
    onSelectService(serviceName, serviceId); // Pass both name and ID
    setIsFocused(false);
  };

  return (
    <>
      <label className="flex justify-center text-xl p-2">What type of Services are you looking for?</label>
      <div className="flex flex-col items-center mt-8 relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="p-2 border rounded-lg w-1/2"
          placeholder={placeholder} // Display placeholder
        />
        {isFocused && filteredServices.length > 0 && (
          <div className="bg-white border border-t-0 rounded-b-lg z-10 w-1/2">
            {filteredServices.slice(0, 10).map(service => (
              <div
                key={service.id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelectService(service.name, service.id)} // Pass both name and ID
              >
                <h4 className="text-lg">{service.name}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
      {isLoading && <p>Loading services...</p>}
      {error && <p>Error loading services</p>}
    </>
  );
};

export default SearchSection;