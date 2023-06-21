import axios, { AxiosError, AxiosResponse } from 'axios';

export const client = axios.create({
  withCredentials: true,
});

const config: RequestInit = {
  credentials: 'include',
};

export async function getCall<T>(
  url: string,
  params: any,
): Promise<ApiResponse<T>> {
  return await client
    .get(url, { params })
    .then((res) => {
      return {
        state: 'SUCCESS' as ApiResponseState,
        status: res.status,
        data: res.data as T,
      };
    })
    .catch((err) => {
      console.error(err);

      return {
        state: 'FAILURE' as ApiResponseState,
        status: err.response.status,
        error: {
          message: err.response.data?.error?.message,
        },
      };
    });
}
