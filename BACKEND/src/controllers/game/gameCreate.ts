import { Request, Response} from "express";
import Game from "../../model/game";
import filterGameData from "../../helpers/filterGameData";
const shortId = require("../../helpers/shortMongoID")

export default async function gameCreateController(req: Request, res: Response) {
    // FILTER MISSING GAME BODY REQUESTS
    if(!req.body.game){return res.status(400).json({message:"invalid request"})}
        // FILTER ONLY NECESSARY DATA FROM REQUEST
        const game = filterGameData(req.body.game, req.body.user._id)
        // CREATE GAME ON DATABASE
        try{
        const gameDoc = await Game.create(game)
        // ADD SHORT ID TO GAMEDOC
        gameDoc.gameID = shortId(gameDoc._id)
        await gameDoc.save()
        // RESPOND WITH OK AND RELEVANT GAME DATA
        res.json({
            message: "OK",
            gameID: gameDoc.gameID,
            title: gameDoc.title,
        })
        // GENERIC ERROR HANDLING
        }catch(error: any){
            res.status(400).json({
                message: error.message,
                error: error
            })
        }
}