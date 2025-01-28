import { useQuery, useMutation, useQueryClient, QueryKey } from 'react-query';
import axiosInstance from '../axios';

// Utility function to perform a GET request
const fetchData = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  try {
    const { data } = await axiosInstance.get(url, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

// Utility function to perform a POST request
const postData = async <T>(url: string, payload: T): Promise<T> => {
  try {
    const { data } = await axiosInstance.post(url, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

// Custom hook to perform a GET request using react-query
export const useFetch = <T>(key: QueryKey, url: string, params?: Record<string, any>, options?: any) => {
  return useQuery<T>(key, () => fetchData<T>(url, params), options);
};

// Custom hook to perform a POST request using react-query
export const usePost = <T, R = any>(url: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation((payload: T) => postData<T>(url, payload), {
    onSuccess: (data: R) => {
      queryClient.invalidateQueries();
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    ...options,
  });
};

// Custom hook to perform a PUT request using react-query
export const useUpdate = <T>(url: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation((payload: T) => axiosInstance.put(url, payload).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    ...options,
  });
};

// Custom hook to perform a DELETE request using react-query
export const useDelete = <T>(url: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(() => axiosInstance.delete(url).then(res => res.data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    ...options,
  });
};