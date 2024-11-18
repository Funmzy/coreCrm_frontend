/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undefined */

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { Method } from "axios"
import createHttpError from "http-errors"


interface ErrorResponse {
    message: string
    err?: any
    status?: number
    data?: any
}

type ApiMethodHandlers = {
    // eslint-disable-next-line no-unused-vars
    [key in Uppercase<Method>]?: NextApiHandler
}

/**
 * middleware for handling API requests.
 * @param handler asynchronous function that handles API requests
 * @param withAuth whether or not the request requires authentication
 * @returns response or throws error if an error occurs during request
 */

export function apiHandler(handler: ApiMethodHandlers) {
    return async (req: NextApiRequest, res: NextApiResponse<ErrorResponse>) => {

        // Cors
        // logger.info("request: " + JSON.stringify(req.headers))
        try {
            const method = req.method ? (req.method.toUpperCase() as keyof ApiMethodHandlers) : undefined

            // check if handler supports current HTTP method
            if (!method) {
                throw new createHttpError.MethodNotAllowed(`No method specified on path ${req.url}!`)
            }

            const methodHandler = handler[method]
            if (!methodHandler) {
                throw new createHttpError.MethodNotAllowed(
                    `Method ${req.method} Not Allowed on path ${req.url}!`
                )
            }
            await methodHandler(req, res)
        } catch (err) {
            throw err
        }
    }
}

