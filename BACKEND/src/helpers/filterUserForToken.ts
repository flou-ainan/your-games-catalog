
// FILTERS ONLY RELEVANT DATA FROM DATA BASE USER DOC FOR TOKEN CREATION
export default function filterUserForToken(user: any){
    return{
        username: user.username,
        password: user.password,
        userID: user.userID,
        _id: user._id,
        role: user.role
    }
}