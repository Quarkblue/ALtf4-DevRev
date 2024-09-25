import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Devs, Tickets, activeTicketStages, addDevsToMap, addTicketsToMap } from "./DataContext";



// yet to complete this function for adding users into data context
function getDevsFromEvent(event: any){
    const payloadType = event.payload.type;
    if(payloadType === 'dev_user_updated'){
        console.log("Dev User Updated");
        const updated_user = event.payload.dev_user_updated.dev_user.full_name;
        console.log(updated_user + " has been updated");
    }
}

async function getDevsFromAPI(){
   const res = axios.get(apiConfig.baseURL + `dev-users.list`,{
    headers:apiConfig.headers,
    params: {state: "active"},
   }).then((response) => {
    addDevsToMap(response.data.dev_users);
    // response.data.dev_users.forEach((dev:any) => {
    //     Devs.set(dev.id, dev);
    // })
   });
}

async function getTicketsFromAPI(){
    axios.get(apiConfig.baseURL + `works.list`,{
     headers:apiConfig.headers,
     params: {type: "ticket"},
    }).then((response) => {
    addTicketsToMap(response.data.works);
    //  response.data.works.forEach((ticket:any) => {
    //      if(activeTicketStages.includes(ticket.stage.name)){
    //         Tickets.set(ticket.id,ticket);
    //      }
    //  })
    });
 }

async function updateTicketsFromAPI(payload:any,ticket:any,devId:string){
    const res = await axios.post(
        apiConfig.baseURL + `works.update`,
        payload,
        {
          headers: apiConfig.headers,
        }
      );
      if(res.status === 200){
        console.log(`Successfully assigned ticket:${ticket.title} to dev-user:${devId}`);
      }
}
export {getDevsFromEvent, getTicketsFromAPI, getDevsFromAPI,updateTicketsFromAPI};