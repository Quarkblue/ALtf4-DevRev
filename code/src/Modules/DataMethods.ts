import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Devs, InActiveDevs, Tickets, activeTicketStages, addDevsToMap, addTicketsToMap, newInactiveDevs } from "./DataContext";
import buildNotificationPayload from "../helpers/notificationPayload";

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
  try {
    const res = await axios.post(
        apiConfig.baseURL + `works.update`,
        payload,
        {
          headers: apiConfig.headers,
        }
      ).then((res) => {
        const ticket = res.data.work;
        console.log(`Ticket ${ticket.id} => ${ticket.title} is assigned to ${ticket.owned_by[0].display_name}`);
      })
      .catch((e) => {
        console.log("An error occured while updating ticket from api: ",e.toString());
      });
    } catch (e:any) 
    {
      console.log("An error occurred while updating the ticket", e.toString());
    }
}

function setInactiveDev(devID: string){
    console.log(`Setting dev ${devID} to inactive`);
    InActiveDevs.set(devID, Devs.get(devID));
    Devs.delete(devID);
    newInactiveDevs.push(devID);
}

function removeInactiveDev(devID: string){
    console.log(`Removing dev ${devID} from inactive`);
    Devs.set(devID, InActiveDevs.get(devID));
    InActiveDevs.delete(devID);
    newInactiveDevs.pop();
}

async function sendNotificationToPrev(new_assignee: string, receiver: string, service_account_token: string) {
  const payload = buildNotificationPayload(
    "don:core:dvrv-in-1:devo/2TBAblu5vv:notification_content_template/36",
    { new_assignee: new_assignee }, 
    receiver
  );
  try {
    const res = await axios.post(apiConfig.baseURL + `notifications.send`, payload, {
      headers: {
        "Authorization": service_account_token,
      },
    });
    console.log("Notification sent successfully");
  } catch (e:any) {
    console.log("An error occurred while sending the notification", e.toString());
  }
}
async function sendNotificationToNew(bodymsg: string, receiver: string, service_account_token: string) {
  const payload = buildNotificationPayload(
    "don:core:dvrv-in-1:devo/2TBAblu5vv:notification_content_template/39",
    { bodymsg: bodymsg }, 
    receiver
  );
  try {
    const res = await axios.post(apiConfig.baseURL + `notifications.send`, payload, {
      headers: {
        "Authorization": service_account_token,
      },
    });
    console.log("Notification sent successfully");
  } catch (e:any) {
    console.log("An error occurred while sending the notification", e.toString());
  }
}

export {getTicketsFromAPI, getDevsFromAPI,updateTicketsFromAPI, setInactiveDev, removeInactiveDev,sendNotificationToPrev,sendNotificationToNew};