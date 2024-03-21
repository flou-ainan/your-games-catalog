import { Request, Response, NextFunction } from "express"
export default interface Midlleware {
    (req: Request, res: Response, next: NextFunction): any
}