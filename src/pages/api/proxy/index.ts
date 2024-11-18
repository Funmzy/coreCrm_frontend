/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next"
import Axios, { AxiosRequestConfig } from "axios"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

import { apiHandler } from "@/pages/api/apiHandler"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { url, method, params, data } = req.body

        console.log({ url, method, params, data }, "***");

        const session = await getServerSession(req, res, authOptions)

        const user = session?.user as any

        let token = ""

        if (user) {
            token = user.access_token
        }

        console.log({ session: user.access_token })

        const reqConfig: AxiosRequestConfig = {
            url: `${process.env.API_BASE_URL}/${url}`,
            method,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // paramsSerializer: { indexes: null },
        }

        if (params) reqConfig.params = params
        if (data) reqConfig.data = data


        console.log({ reqConfig });
        const response = await Axios(reqConfig)

        res.status(StatusCodes.OK).json(response.data)
    } catch (error) {
        if (Axios.isAxiosError(error)) {
            const errorInfo = {
                statusCode: error.response ? error.response.status : StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.response
                    ? error.response.statusText
                    : getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                details: error.response ? error.response.data : null,
            }


            res.status(errorInfo.statusCode).json({ message: "error", error: errorInfo })
        }
        const errorObj = {
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            details: { error },
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj)
    }
}

export default apiHandler({
    POST: routeHandler,
})
