// src/components/home/SearchSection.tsx
import React, { useState } from 'react';

const SearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search functionality here
  };

  return (
    <>
     <label className="flex justify-center text-xl p-2">What type of Services are you looking for?</label>
    <form onSubmit={handleSearch} className="flex justify-center mt-8">     
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-l-lg w-1/2"
        placeholder="Search for services..."
        />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
        Search
      </button>
    </form>
        </>
  );
};

export default SearchSection;