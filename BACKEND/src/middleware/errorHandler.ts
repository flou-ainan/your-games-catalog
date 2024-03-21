import {Request, Response, NextFunction} from "express"


function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void{    
    try{
        next()
    }catch(error){
        res.status(400).send("Error")
    }
}

export default errorHandler
