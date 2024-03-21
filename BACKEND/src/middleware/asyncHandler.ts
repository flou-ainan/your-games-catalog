import { NextFunction, Request, Response } from 'express';
import Middleware from "../helpers/MiddlewareType"
/**
 * Async handler to wrap the API routes, this allows for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
export function asyncHandler(fn: Middleware) {
    return (req: Request, res:Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next)
    }
}
