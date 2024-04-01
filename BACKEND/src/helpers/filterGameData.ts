import { gameType } from "../model/game";
// FILTER ONLY NECESSARY DATA RECEIVED FROM REQUEST TO CREATE A GAME ON DATABASE
export default function filterGameData(data: any, ownerID: any) {
    return {
        title: data.title,
        coverImageURL: data.coverImageURL,
        year: data.year,
        platforms: data.platforms,
        producer: data.producer,
        description: data.description,
        owner: ownerID
    } as gameType
}