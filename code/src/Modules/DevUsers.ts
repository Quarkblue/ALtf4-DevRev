import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Devs } from "./DataContext";


function getDevsFromEvent(event: any){
    const payloadType = event.payload.type;
    if(payloadType === 'dev_user_updated'){
        console.log("Dev User Updated");
        const updated_user = event.payload.dev_user_updated.dev_user.full_name;
        console.log(updated_user + " has been updated");
        getDevsFromAPI();
    }
}

async function getDevsFromAPI(){
   const res = axios.get(apiConfig.baseURL + `dev-users.list`,{
    headers:apiConfig.headers,
    params: {state: "active"},
   }).then((response) => {
    response.data.dev_users.forEach((dev:any) => {
        Devs.set(dev.id, dev);
    })
    console.log(Devs);
   });
}

export {getDevsFromEvent};