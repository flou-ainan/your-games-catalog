import { Request, Response} from "express";
import Game, {gameType} from "../../model/game";
const shortId = require("../../helpers/shortMongoID")


export default async function gameCreateController(req: Request, res: Response) {
    if(!req.body.game){return res.status(400).json({message:"invalid request"})}

        // extracts the user ID from the validated JWT
        const owner = req.body.user._id
        console.log(owner)
        
        // organizing and asserting to receive only desired data from request
        const data = req.body.game
        const game = {
            title: data.title,
            coverImageURL: data.coverImageURL,
            year: data.year,
            platforms: data.platforms,
            producer: data.producer,
            description: data.description,
            owner: owner
        } as gameType

        // create the game on the database
        Game.create(game)
        // add shortened Game ID based on Mongo Original document ID
        .then(gameDoc => {
           try{gameDoc.gameId = shortId(gameDoc._id)}catch(e){
                console.log("Error parsing MongoDB ID\n"+e)
                Game.findByIdAndDelete(gameDoc._id).exec()
                return res.status(400).json({message:"Internal Server Error"})
            }
            gameDoc.save()
            .then(gameDoc => {
                res.json(gameDoc)
            }),
            //catch
            (error:{code:number, keyValue:object}) => mongoErrorHandler(error, res)
        },
        //catch
        (error:{code:number, keyValue:object}) => mongoErrorHandler(error, res))
}

function mongoErrorHandler(error:{code:number, keyValue:object}, res:Response){
    const msg = "error"
                if (error.code == 11000){
                    res.status(400).json({
                        message:"Data conflict. Some field already in database",
                        keyAndValue:error.keyValue,
                        completeErrorMessage: error
                    })
                }else{
                    res.status(400).json({
                        message: msg,
                        error: error
                    })
                }
}