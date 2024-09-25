import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import { TagData } from "Types/Interfaces";
import { getDevsFromAPI, getDevsFromEvent, getTicketsFromAPI } from "../../Modules/DataMethods";
import {addTicketsToMap} from "../../Modules/DataContext";
import { TicketRouting} from "../../Modules/SmartTicketRouting";

async function testFunc(event: any) {
    const payloadType = event.payload.type;
    if(payloadType === "work_created"){
        console.log("Work Created with name:" + event.payload.work_created?.work.name);
    }
    else if(payloadType === "work_updated"){
        const workTags = event.payload.work_updated.work.tags;
        workTags?.forEach((tag: TagData) => {
            console.log(tag.tag.name);
        })
        getTicketsFromAPI()
        getDevsFromAPI();
    }
    getDevsFromEvent(event);
}

function Handle(event: any) {
    const payloadType = event.payload.type;

    if(payloadType === "work_created"){
        if(event.payload.work_created.work.type === "ticket"){
            addTicketsToMap([event.payload.work_created.work]);
            
        }
    }else if(payloadType === "work_updated") {
        
    }
    
}



export const run = async (events: any[]) => {

    events.forEach(async (event) => {
        Handle(event);
    })
    
    
};

export default run;