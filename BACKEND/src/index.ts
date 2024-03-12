import express, {Express ,Request, Response} from "express";
import routes from "./routes";

const app : Express =  express()
const PORT : any = process.env.PORT || 3005

app.listen(PORT)

//testing route
app.get('/', (req: Request, res: Response)=>{
    res.send("Hello World My Friend")
})

//enabling routes
app.use("/",routes)