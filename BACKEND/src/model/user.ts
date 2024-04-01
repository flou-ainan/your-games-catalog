import { ObjectId, Schema, model } from "mongoose";
import { gameType } from "./game";

export type userType = {
    username: string,
    password: string,
    createdAt: number,
    role: string,
    _id: string,
    userID: string
}

const userSchema:Schema = new Schema({
    username: {
        type: String,
        lowerCase: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    createdAt:{
        default: () => Date.now(),
        type: Date
    },
    role:{
        default: "USER",
        type: String
    },
    games:{
        type: Array<gameType>,
        default: []
    },
    ratedGames:{
        type: Array<ObjectId>,
        default:[]
    },
    userID:{
        type: String,
        unique: true,
        upperCase: true
    }
})

const User = model("User", userSchema)
export {userSchema}
export default User