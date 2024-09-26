import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Tickets, Devs, getDevTickets, InActiveDevs } from "./DataContext";
import { updateTicketsFromAPI } from "./DataMethods";

// get ticket count for the devs
function getDevsTicketsCount(): Map<string, number> {

    const devTicketCount = new Map();
    Devs.forEach((dev: any) => {
        const devid = dev.id;
        const count = getDevTickets(devid);
        devTicketCount.set(devid, count);
    });

    return devTicketCount;
}

// on new ticket routing (Load Balancing & Random Assignment)
function LoadBalancing() {
  console.log("load balancing");
  let devTicketCount = getDevsTicketsCount();
  // getting a list of devs with least tickets
  const leastloadedDevs = Array.from(devTicketCount).filter(([devId, count]) => count === Math.min(...devTicketCount.values())).map(([devId, count]) => devId);


  // getting all the tickets that have owner as unassigned
  Tickets.forEach((ticket:any)=>{
      if(ticket.owned_by[0].type === "service_account"){
        const randomDev = leastloadedDevs[Math.floor(Math.random()*leastloadedDevs.length)]
        console.log(`Routing ticket ${ticket.id}:${ticket.title} to dev ${randomDev}`);
        delete leastloadedDevs[leastloadedDevs.indexOf(randomDev)];
        TicketRouting(randomDev,ticket);
      }
  })
}

function TicketRouting(devId: string, ticket: any) {
  if (devId && ticket.id) {
    const payload = {
      type: "ticket",
      id: ticket.id,
      owned_by: { set: [devId] },
    };
    console.log(`Routing ticket ${ticket.id} => ${ticket.title} to dev ${devId}`);
    updateTicketsFromAPI(payload,ticket,devId)
  } else {
      if(!ticket.id){
        console.log("Ticket id is missing");
      }else if(!devId){
        console.log("Dev id is missing");
      }
  }
}

// on slash command ticket routing

export { getDevsTicketsCount,LoadBalancing,TicketRouting };