import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Tickets, Devs, addTicketToDev, getDevTickets } from "./DataContext";
import { updateTicketsFromAPI } from "./DataMethods";


// initial checking on starting for ticket routing and userassigned tickets
function TicketRouting() {
  Tickets.forEach((ticket: any) => {
    const devid = ticket.owned_by[0].id;
    addTicketToDev(ticket, devid);
  });
  Devs.forEach((dev: any) => {
    console.log(dev.dev.display_name,dev.tickets);
  });
  console.log("Tickets assigned");
}

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
function findDevWithLeastTickets() {
  let devTicketCount = getDevsTicketsCount();
  let minTicketCount = Infinity;
  let leastLoadedDev: any = null;

  devTicketCount.forEach((count,devId)=>{
     if(count<minTicketCount){
          minTicketCount = count;
          leastLoadedDev = devId;
     }
  })

  Tickets.forEach((ticket:any)=>{
      if(ticket.owned_by.some((owner:any)=> owner.type === "service_account")){
          newTicketRouting(leastLoadedDev,ticket);
      }
  })
}

async function newTicketRouting(devId: string, ticket: any) {
  if (devId && ticket.id) {
    const payload = {
      type: "ticket",
      id: ticket.id,
      owned_by: { set: [devId] },
    };
    try {
      updateTicketsFromAPI(payload,ticket,devId)
    } catch (e) {
      console.log("Error assigning ticket", e);
    }
  } else {
    console.log("Invalid ticket or dev");
  }
}

// on slash command ticket routing

export { TicketRouting, findDevWithLeastTickets };