import { Request, Response } from "express";
import Game, {gameType} from "../../model/game";
import { userType } from "../../model/user";

export default async function gameGetController(req: Request, res: Response){
    if(!req.body.ID){return res.status(400).json({message:"invalid request"})}

    // const data = await Game.where("gameId").equals(req.body.ID)
    try{
        let data = await Game.findOne({gameId:req.body.ID}).populate("owner").exec()
        let game = {}
        if (data != null){
            let owner = data.owner as userType
            game = {
                title: data.title,
                coverImageURL: data.coverImageURL,
                year: data.year,
                platforms: data.platforms,
                producer: data.producer,
                description: data?.description,
                gameId: data.gameId,
                owner: owner.username
            }
        }

        res.send(game)
    }catch(e){
        res.status(400).send(e)
    }


}