import { Schema, model, SchemaTypes, ObjectId } from "mongoose";

export type gameType = {
    title: string,
    coverImageURL: string,
    year: string,
    platforms: string[],
    producer: string,
    description: string
    gameId: string
    _id: string
    owner: ObjectId
    ratings: Array<ObjectId>
}

const gameSchema: Schema = new Schema({
    // set by user
    title: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
        maxLength: 60
    },
    // set by user
    coverImageURL: {
        type: String,
        required: true,
        maxLength: 250,
        minLength: 12
    },
    // set by user
    year: {
        type: String,
        default: "unknown"
    },
    // set by user
    platforms: {
        type: Array<string>,
        required: true
    },
    // set by user
    producer: {
        type: String,
        default: "unknown"
    },
    // set by user
    description: {
        type: String,
        maxLengtgh: 5000,
        default: ""
    },
    // set by the gameCreate controller
    gameID: {
        type: String
    },
    // set by gameCreate controller based on sent token
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    // set here by default | gameController blocks client date setting 
    createdAt:{
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    // set on gameCreate and gameUpdate controllers
    updatedAt: Date,
    ratings: {
        type: Array<ObjectId>  // to be implemented
    }
})

const Game = model("Game", gameSchema)
export {gameSchema}
export default Game