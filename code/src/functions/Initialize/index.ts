import {getTicketsFromAPI, getDevsFromAPI} from "../../Modules/DataMethods";
import { InActiveDevs } from "../../Modules/DataContext";
import { LoadBalancing } from "../../Modules/SmartTicketRouting";

async function run(events: any[]) {
    console.log("Fetching tickets and dev from api")

    await Promise.all([getTicketsFromAPI(), getDevsFromAPI()]).then(() => {
        InActiveDevs.clear();
        LoadBalancing();
    });


    //getTicketsFromAPI()
    //getDevsFromAPI()
    

    // add load balancing while initializing here
}

export default run;