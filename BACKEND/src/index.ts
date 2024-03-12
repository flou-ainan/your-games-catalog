import express, {Express, Request, Response} from "express";

const app =  express()

app.listen(3000)

app.get('/', (req: Request, res: Response)=>{
    res.send("Hello World My Friend")
})