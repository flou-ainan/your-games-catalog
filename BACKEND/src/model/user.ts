import { Schema, model } from "mongoose";
import { gameType } from "./game";

export type userType = {
    username: string,
    password: string,
    createdAt: number,
    role: string,
    _id: string
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
        default: Date.now,
        type: Number
    },
    role:{
        default: "USER",
        type: String
    },
    games:{
        type: Array<gameType>,
        default: []
    }
})

const User = model("User", userSchema)
export {userSchema}
export default User