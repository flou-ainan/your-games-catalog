import User from "./model/user";
import readline from "readline";
import Game from "./model/game";
const shortId = require("./helpers/shortMongoID")


export default function script(): void {
    // askForOptions([ showUserCount, mongoIdShortener])


    // Game.create({
    //     title:"Akuji",
    //     coverImageURL: "https://xuxu.baleia/d.png",
    //     year: "1990",
    //     platforms: ['megadrive'],
    //     producer: "Eidos",
    //     description:"An underworld adventure",
    //     owner: "65fb877dfd3770f1e2956ab4"
    // })

    // Game.find().populate("owner").exec()
    // .then(docs => {
    //     console.log(docs)
    // })

}

function askForOptions(fns:Function[]){
    console.log("Type the number of one option bellow to run it")
    let question = "You can run these options:\n"   
    
    // iterative
    // for (let i=1 ; 1<=fns.length ; i++){
    //     question += `${i} - ${fns[i].name}`
    // }

    // functional
    let i=1; fns.forEach(fn => { question += `${i} - ${fn.name}\n`; i++ })
    askQuestion(question)
    .then((ans) =>{
        let option = parseInt(ans as string)
        if (option > fns.length) console.log("Escolha uma opção válida")
else    if (option <= 0) console.log("Escolha uma opção válida")
else    
        fns[option-1]()
    })
}

function showUserCount(){ 
    askQuestion("Read count (Y/n) ?\n")
    .then( ans => {
        switch(ans){
            case"Y":case"y":case"":
                let result:any
                User.find().countDocuments().exec()
                .then(result => {
                    console.log(result)
                })
                console.log("-----------")
                setTimeout(()=>script(),1000)
                break
        
        default:
            console.log("\n OK \n")
            console.log("-----------")
            setTimeout(()=>script(), 1000)
        }
    })
}


function mongoIdShortener(){
    askQuestion("Type a valid MongoDB doc ID to recieve a shorterID\n")
    .then(ans => {
        try{
            console.log("Your shortened ID:")
            console.log(shortId(ans))
            console.log("-----------")
            setTimeout(()=>script(), 1000)
        }catch(error){
            console.log("Invalid ID: "+error)
            console.log("-----------")
            setTimeout(()=>script(), 1000)
        }
    })
}

function askQuestion(query: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => {
        rl.question(query, ans => {
            rl.close();
            resolve(ans);
    })})
}
