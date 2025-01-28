import React from 'react';
import { useForm } from 'react-hook-form';
import { usePost } from '../../api/hooks/useApi';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isLoading, isError, isSuccess } = usePost<LoginFormInputs, LoginResponse>('/auth/login', {
    onSuccess: async (data: LoginResponse) => {
      const token = data.token;

      // Check if there is a previously saved token and remove it
      const previousToken = localStorage.getItem('token');
      if (previousToken) {
        localStorage.removeItem('token');
      }

      // Save the latest token
      localStorage.setItem('token', token);

      // Update the auth context
      login();

      // Navigate to the home page
      navigate('/');
    }
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            {isError && <div className="text-red-500 text-sm mt-2">Login failed</div>}
            {isSuccess && <div className="text-green-500 text-sm mt-2">Login successful</div>}
          </form>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-indigo-600 hover:text-indigo-900">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;