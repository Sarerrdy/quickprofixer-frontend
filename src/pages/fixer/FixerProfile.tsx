import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useFetch, useUpdate } from '../../api/hooks/useApi';

interface FixerProfileInputs {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressId: number;
  address: string;
  imgUrl?: string;
  specializationId: number;
  specializationName: string;
  certifications?: string;
  verificationDocument: string;
  isVerified: boolean;
  rating: number;
  location: string;
  isAvailable: boolean;
  reviews: string;
  experienceYears: number;
  portfolio: string;
  rateType: string;
  rate: number;
}

const FixerProfile: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FixerProfileInputs>();
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const { data: profileData, refetch } = useFetch<FixerProfileInputs>('fixerProfile', '/profile/fixer/fixer1'); // Replace '1' with the actual fixer ID

  const updateProfileMutation = useUpdate<Partial<FixerProfileInputs>>('/profile/fixer', {
    onSuccess: () => {
      refetch();
      setIsEditing({});
    },
  });

  useEffect(() => {
    if (profileData) {
      Object.keys(profileData).forEach((key) => {
        setValue(key as keyof FixerProfileInputs, profileData[key as keyof FixerProfileInputs]);
      });
    }
  }, [profileData, setValue]);

  const handleEdit = (group: string) => {
    setIsEditing((prev) => ({ ...prev, [group]: true }));
  };

  const handleSave = (group: string, data: Partial<FixerProfileInputs>) => {
    updateProfileMutation.mutate(data);
  };

  const renderGroup = (group: string, fields: Array<{ field: keyof FixerProfileInputs, label: string, type?: string }>) => (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">{group}</h3>
      {isEditing[group] ? (
        <form onSubmit={handleSubmit((data) => handleSave(group, data))}>
          {fields.map(({ field, label, type = 'text' }) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                id={field}
                type={type}
                {...register(field, { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors[field] && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          ))}
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </form>
      ) : (
        <div>
          {fields.map(({ field, label }) => (
            <div key={field} className="flex justify-between items-center mb-4">
              <p>{label}: {profileData ? profileData[field] : 'Not provided'}</p>
            </div>
          ))}
          <button onClick={() => handleEdit(group)} className="text-blue-500">Edit</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Fixer Profile</h2>
          {profileData ? (
            <div>
              <div className="mb-4 text-center">
                <img src={profileData.imgUrl || 'placeholder-image-url'} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Specialization</h3>
                <p>{profileData.specializationName || 'Not provided'}</p>
                <p>{profileData.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
              {renderGroup('Bio', [
                { field: 'firstName', label: 'First Name' },
                { field: 'middleName', label: 'Middle Name' },
                { field: 'lastName', label: 'Last Name' },
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phoneNumber', label: 'Phone Number' },
              ])}
              {renderGroup('Address', [
                { field: 'location', label: 'Location' },
                { field: 'addressId', label: 'Address ID', type: 'number' },
                { field: 'address', label: 'Address' },
                // Add fields for landmark, town, lga, state, country
              ])}
              {renderGroup('Pro Info', [
                { field: 'certifications', label: 'Certifications' },
                { field: 'verificationDocument', label: 'Verification Document' },
                { field: 'isVerified', label: 'Is Verified', type: 'checkbox' },
                { field: 'experienceYears', label: 'Experience Years', type: 'number' },
                { field: 'portfolio', label: 'Portfolio' },
              ])}
              {renderGroup('Billing', [
                { field: 'rateType', label: 'Rate Type' },
                { field: 'rate', label: 'Rate', type: 'number' },
              ])}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Rating & Reviews</h3>
                <p>Rating: {profileData.rating || 'Not provided'}</p>
                {renderGroup('Reviews', [
                  { field: 'reviews', label: 'Reviews' },
                ])}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-center">
                <img src="placeholder-image-url" alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Specialization</h3>
                <p>Not provided</p>
                <p>Not Available</p>
              </div>
              {renderGroup('Bio', [
                { field: 'firstName', label: 'First Name' },
                { field: 'middleName', label: 'Middle Name' },
                { field: 'lastName', label: 'Last Name' },
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phoneNumber', label: 'Phone Number' },
              ])}
              {renderGroup('Address', [
                { field: 'location', label: 'Location' },
                { field: 'addressId', label: 'Address ID', type: 'number' },
                { field: 'address', label: 'Address' },
                // Add fields for landmark, town, lga, state, country
              ])}
              {renderGroup('Pro Info', [
                { field: 'certifications', label: 'Certifications' },
                { field: 'verificationDocument', label: 'Verification Document' },
                { field: 'isVerified', label: 'Is Verified', type: 'checkbox' },
                { field: 'experienceYears', label: 'Experience Years', type: 'number' },
                { field: 'portfolio', label: 'Portfolio' },
              ])}
              {renderGroup('Billing', [
                { field: 'rateType', label: 'Rate Type' },
                { field: 'rate', label: 'Rate', type: 'number' },
              ])}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Rating & Reviews</h3>
                <p>Rating: Not provided</p>
                {renderGroup('Reviews', [
                  { field: 'reviews', label: 'Reviews' },
                ])}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FixerProfile;