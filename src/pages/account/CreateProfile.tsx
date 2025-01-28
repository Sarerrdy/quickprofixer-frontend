import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useFetch } from '../../api/hooks/useApi';

const CreateProfile: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const { data, error, refetch } = useFetch<{ id: string }>('userProfile', '/auth/me', {}, {
    enabled: false, // Disable automatic fetching
  });

  // const { data, error, refetch } = useFetch<{ id: string }>('userProfile', '/auth/me', {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   },
  // }, {
  //   enabled: false, // Disable automatic fetching
  // });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Retrieved auth token in CreateProfile:', token);

    if (token) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    if (data) {
      console.log('Retrieved user ID:', data.id);
      setUserId(data.id);
    }
    if (error) {
      console.error('Error fetching user ID:', error);
    }
  }, [data, error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-6">Create Profile</h2>
          <p className="mb-4">Please select the type of profile you want to create:</p>
          <div className="space-y-4">
            <Link to="/fixer/profile" className="block w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700">Create Fixer Profile</Link>
            <Link to="/client/profile" className="block w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700">Create Client Profile</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProfile;