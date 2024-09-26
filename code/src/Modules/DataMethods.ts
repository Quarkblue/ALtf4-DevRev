import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Devs, Tickets, activeTicketStages, addDevsToMap, addTicketsToMap } from "./DataContext";

async function getDevsFromAPI(){
   const res = axios.get(apiConfig.baseURL + `dev-users.list`,{
    headers:apiConfig.headers,
    params: {state: "active"},
   }).then((response) => {
    addDevsToMap(response.data.dev_users);
    console.log("Added devs to map:", Devs.size);
   });
}

async function getTicketsFromAPI(){
    axios.get(apiConfig.baseURL + `works.list`,{
     headers:apiConfig.headers,
     params: {type: "ticket"},
    }).then((response) => {
    addTicketsToMap(response.data.works);
    console.log("Added tickets to map:", Tickets.size);
    });
 }

async function updateTicketsFromAPI(payload:any,ticket:any,devId:string){
    const res = await axios.post(
        apiConfig.baseURL + `works.update`,
        payload,
        {
          headers: apiConfig.headers,
        }
      ).then((res) => {
        const ticket = res.data.work;
        console.log(`Ticket ${ticket.id}:${ticket.title} is assigned to ${ticket.owned_by[0].display_name}`);
      })
      .catch((e) => {
        console.log("An error occured while updating ticket from api: ",e.toString());
      });
      
}
export {getTicketsFromAPI, getDevsFromAPI,updateTicketsFromAPI};