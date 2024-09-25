import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import { TagData } from "Types/Interfaces";
import { getDevsFromEvent } from "../../Modules/DevUsers";


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
    }
    getDevsFromEvent(event);
}



export const run = async (events: any[]) => {

    events.forEach(async (event) => {
        await testFunc(event);
    })
    
    
};

export default run;