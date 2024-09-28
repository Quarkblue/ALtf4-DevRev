import {getTicketsFromAPI, getDevsFromAPI} from "../../Modules/DataMethods";
import { InActiveDevs } from "../../Modules/DataContext";
import { LoadBalancing } from "../../Modules/SmartTicketRouting";

async function run(events: any[]) {
    console.log("Fetching tickets and dev from api")

    // Fetch data from api when the snap-in is installed
    await Promise.all([getTicketsFromAPI(), getDevsFromAPI()]).then(() => {
        InActiveDevs.clear();

        // Initial load balancing when the snap-in is installed
        LoadBalancing(events[0].context.secrets.service_account_token);
    });
}

export default run;