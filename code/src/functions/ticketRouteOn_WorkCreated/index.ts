import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import { TagData } from "Types/Interfaces";
import { getDevsFromAPI, getTicketsFromAPI } from "../../Modules/DataMethods";
import { Devs, Tickets, closedStages, addDevsToMap, addTicketsToMap } from "../../Modules/DataContext";
import { LoadBalancing,getDevsTicketsCount } from "../../Modules/SmartTicketRouting";

async function Handle(event: any) {
    const payloadType = event.payload.type;

    if(payloadType === "work_created"){
        if(event.payload.work_created.work.type === "ticket"){
            addTicketsToMap([event.payload.work_created.work]);
            LoadBalancing(event.context.secrets.service_account_token)
        }
    }else if(payloadType === "work_updated") {
        if(event.payload.work_updated.work.type === "ticket"){
            const updatedworkID = event.payload.work_updated?.work.id;
            
            
            // if ticket is updated to closed, then remove it from the Tickets map
            if(closedStages.includes(event.payload.work_updated.work.stage.name)){
                Tickets.delete(updatedworkID);
            }
            
            // if ticket is updated to new dev, then update the ticket in the Tickets map (This is automatically done by Tickets.set())
            
            // if ticket is updated to a new tag, then update the ticket in the Tickets map (This is automatically done by Tickets.set())

            addTicketsToMap([event.payload.work_updated.work]);
            const ticket = Tickets.get(updatedworkID);
            console.log(`ticket owner for ${ticket.id} is ${ticket.owned_by[0].full_name}`);
            
            if(ticket.owned_by[0].type === "service_account"){
                await LoadBalancing(event.context.secrets.service_account_token,ticket);
            }

        }
        
    } else if(payloadType === "dev_user_created"){
        addDevsToMap([event.payload.dev_user_created.dev_user]);
    } else if(payloadType === "dev_user_updated"){
        addDevsToMap([event.payload.dev_user_updated.dev_user]);
    }
    
}



export const run = async (events: any[]) => {

    events.forEach(async (event) => {
        Handle(event);
    })
    
    
};

export default run;