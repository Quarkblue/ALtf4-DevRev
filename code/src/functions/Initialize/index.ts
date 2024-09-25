import {getTicketsFromAPI, getDevsFromAPI} from "../../Modules/DataMethods";
import {TicketRouting} from "../../Modules/SmartTicketRouting";

async function run(events: any[]) {
    getTicketsFromAPI()
    getDevsFromAPI()
    
}

export default run;