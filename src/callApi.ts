/* eslint-disable @typescript-eslint/no-explicit-any */
import nodeUrl from "url";
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
// import { isEmpty } from "@/utils/isEmpty";
import { constants } from "./constants";
import { isEmpty } from "./utils/isEmpty";
// import { constants } from "@/constants/constants";

type Params = {
    apiPath: string;
    method?: Method;
    queryParameters?: Record<any, any>;
    body?: Record<string, any>;
    apiKey?: string;
    authToken?: string;
    formData?: FormData;
};
export async function callApi<T>({
    apiPath,
    method = "GET",
    queryParameters,
    body,
    apiKey,

    formData,
}: Params): Promise<T> {
    if (process.env.NODE_ENV === "development") {
        // console.log(
        //   `[${consoleFormatting.FgYellow}${method}${consoleFormatting.Reset}] ${apiPath}`,
        //   queryParameters ?? "[No Params]",
        //   body ?? "[No Body]"
        // );
    }

    if (queryParameters) {
        for (const [key, value] of Object.entries(queryParameters)) {
            if (isEmpty(value)) {
                delete queryParameters[key];
            }
        }
    }

    // const apiBaseUrl = constants.backendApiBaseUrl;
    const apiBaseUrl = constants.API_BASE_URL_LOCAL;
    const url = apiPath.startsWith("http")
        ? apiPath
        : new nodeUrl.URL(`${apiBaseUrl}/${apiPath}`).href;

    console.log({ url, apiPath })

    const requestParams: AxiosRequestConfig = {
        headers: {
            "Accept-Encoding": "gzip, deflate, br",
        },
        url,
        method: method as Method,
        params: queryParameters,
        paramsSerializer: {
            indexes: null,
        },
    };

    if (apiKey) {
        requestParams.headers!.authorization = `Bearer ${apiKey}`;
    }

    if (body) {
        requestParams.data = body;
    }

    // console.log("!!", axios.getUri(requestParams));
    console.log(
        "!! data",
        requestParams.data,
        requestParams.url,
        requestParams.method,
        apiKey,
        "!! data"
    );

    if (formData) {
        return await axios.post(requestParams.url!, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${apiKey}`,
            },
        });
    }

    return axios(requestParams)
        .then((result) => result.data)
        .catch((err: AxiosError) => {
            console.log(err.response?.data, "errors..");
            const data = err.response?.data;
            const errorInfo: any = {
                statusCode: err.response ? err.response.status : 0,
                statusMessage: err.response ? data : "",
                body: err.response ? err.response.data : "",
                apiPath,
                method,
                url: `${process.env.API_BASE_URL}/${apiPath}`,
            };

            if (errorInfo.statusCode !== 404) {
                // log(
                //   errorInfo.statusMessage,
                //   apiPath,
                //   err.response ? errorInfo : err
                //   // {} as Request
                // );
            }

            return Promise.reject(errorInfo);
        });
}
