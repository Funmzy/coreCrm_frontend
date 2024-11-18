/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import qs from "qs";

import { useSession } from "next-auth/react";

const useApiClient = () => {
    const { data: session } = useSession();

    const apiClient = axios.create({
        baseURL: "/api/proxy",
        headers: {
            "Content-Type": "application/json",
            Authorization: session ? `Bearer ${session?.user}` : "",
        },
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat", skipNulls: true });
        },
    });

    apiClient.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError<any, any>) => {
            if (error.response?.status === 400) {
                const errorMessage = error.message;

                alert(errorMessage);
            } else if (error.response?.status === 500) {
                alert("Something went wrong.");
            }

            return Promise.reject(error);
        }
    );

    const client = (url: string, method: string, params?: any, data?: any) => {
        return apiClient({ data: { url, method, params, data }, method: "POST" });
    }

    return client;
};

export default useApiClient;
