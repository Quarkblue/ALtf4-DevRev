import {getTicketsFromAPI, getDevsFromAPI} from "../../Modules/DataMethods";

async function run(events: any[]) {
    console.log("Fetching tickets and dev from api")
    getTicketsFromAPI()
    getDevsFromAPI()
}

export default run;