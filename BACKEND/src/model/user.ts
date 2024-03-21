import {Schema, model} from "mongoose";

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
    }
})

const User = model("User", userSchema)
export {userSchema}
export default User