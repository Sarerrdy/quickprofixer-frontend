import React from 'react';
import { useForm } from 'react-hook-form';
import { usePost } from '../../api/hooks/useApi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const { mutate, isLoading, isError, isSuccess } = usePost<RegisterFormInputs>('/account/register', {
    onSuccess: () => {
      navigate('/login');
    }
  });

  const onSubmit = (data: RegisterFormInputs) => {
    mutate(data);
  };

  const password = watch('password');

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                {...register('firstName', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                {...register('lastName', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                id="middleName"
                {...register('middleName')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                {...register('email', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                {...register('phoneNumber', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.phoneNumber && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: true,
                  validate: value => value === password || "Passwords do not match"
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            {isError && <div className="text-red-500 text-sm mt-2">Registration failed</div>}
            {isSuccess && <div className="text-green-500 text-sm mt-2">Registration successful</div>}
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-900">Already have an account? Login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;