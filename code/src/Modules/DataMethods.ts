import {client, publicSDK} from "@devrev/typescript-sdk";
import {WebhookEventRequest} from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk";
import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Devs, InActiveDevs, Tickets, activeTicketStages, addDevsToMap, addTicketsToMap } from "./DataContext";

async function getDevsFromAPI() {
  try {
      const response = await axios.get(apiConfig.baseURL + `dev-users.list`, {
          headers: apiConfig.headers,
          params: { state: "active" },
      });
      addDevsToMap(response.data.dev_users);
      console.log("Added devs to map:", Devs.size);
  } catch (error) {
      console.error("Error fetching devs:", error);
  }
}

async function getTicketsFromAPI() {
   try {
       const response = await axios.get(apiConfig.baseURL + `works.list`, {
           headers: apiConfig.headers,
           params: { type: "ticket" },
       });
       addTicketsToMap(response.data.works);
       console.log("Added tickets to map:", Tickets.size);
   } catch (error) {
       console.error("Error fetching tickets:", error);
   }
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



function setInactiveDev(devID: string){
    console.log(`Setting dev ${devID} to inactive`);
    InActiveDevs.set(devID, Devs.get(devID));
    Devs.delete(devID);
}

function removeInactiveDev(devID: string){
    console.log(`Removing dev ${devID} from inactive`);
    Devs.set(devID, InActiveDevs.get(devID));
    InActiveDevs.delete(devID);
    
}

export {getTicketsFromAPI, getDevsFromAPI,updateTicketsFromAPI, setInactiveDev, removeInactiveDev};