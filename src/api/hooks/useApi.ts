import { useQuery, useMutation, useQueryClient, QueryKey } from 'react-query';
import axiosInstance from '../../api/axios';

const fetchData = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  // console.log('Fetching data from URL:', url);
  // console.log('With parameters:', params);
  try {
    const { data } = await axiosInstance.get(url, { params });
    // console.log('Fetched data:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching data:', error);
    throw error;
  }
};

const postData = async <T>(url: string, payload: T): Promise<T> => {
  // console.log('Posting data to URL:', url);
  // console.log('With payload:', payload);
  try {
    const { data } = await axiosInstance.post(url, payload);
    // console.log('Posted data:', data);
    return data;
  } catch (error) {
    // console.error('Error posting data:', error);
    throw error;
  }
};

export const useFetch = <T>(key: QueryKey, url: string, params?: Record<string, any>, options?: any) => {
  // console.log('useFetch called with key:', key);
  // console.log('URL:', url);
  // console.log('Parameters:', params);
  return useQuery<T>(key, () => fetchData<T>(url, params), options);
};

export const usePost = <T>(url: string) => {
  const queryClient = useQueryClient();
  return useMutation((payload: T) => postData<T>(url, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};