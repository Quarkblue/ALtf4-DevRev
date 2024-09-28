import { resolve } from "path";
import { Devs, getDevTickets, Tickets, newInactiveDevs } from "./DataContext";
import { sendNotificationToNew, sendNotificationToPrev, updateTicketsFromAPI } from "./DataMethods";

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
async function LoadBalancing(serviceAccToken:string ,ticket?: any) {
  console.log("load balancing");
  let devTicketCount = getDevsTicketsCount();
  // getting a list of devs with least tickets
  const leastloadedDevs = Array.from(devTicketCount)
    .filter(([devId, count]) => count === Math.min(...devTicketCount.values()))
    .map(([devId, count]) => devId);

  const randomDev =
    leastloadedDevs[Math.floor(Math.random() * leastloadedDevs.length)];

  if (ticket) {

    delete leastloadedDevs[leastloadedDevs.indexOf(randomDev)];
    const prevOwner = newInactiveDevs[newInactiveDevs.length - 1];
    const newOwner = randomDev;
    console.log(
      `Routing ticket ${ticket.id} => ${ticket.title} to dev ${randomDev} {From Loadbalancing with provided ticket}`
    );
    
    TicketRouting(randomDev, ticket).then(() => {
      // Send notifications to the previous and new owner
      sendNotificationToPrev(`<${newOwner}>`, prevOwner, serviceAccToken);
      sendNotificationToNew(`A Ticket has been assigned to you since the previous owner was inactive <${ticket.id}>`, newOwner, serviceAccToken);
      resolve();
    });
  } else {
    Tickets.forEach(async (ticket: any) => {
      if (ticket.owned_by[0].type === "service_account") {
        LoadBalancing(serviceAccToken, ticket);
      }
    });
  }
}

async function TicketRouting(devId: string, ticket: any, event?: any) {
  if (devId && ticket.id) {
    const payload = {
      type: "ticket",
      id: ticket.id,
      owned_by: { set: [devId] },
    };
    console.log(
      `Routing ticket ${ticket.id} => ${ticket.title} to dev ${devId}`
    );
    ticket.owned_by = [{ id: devId, type: "dev" }];
    Tickets.set(ticket.id, ticket);
    await updateTicketsFromAPI(payload, ticket, devId).then(() => {
      resolve();
    });
  } else {
    if (!ticket.id) {
      console.log("Ticket id is missing");
    } else if (!devId) {
      console.log("Dev id is missing");
    }
  }
}

// on slash command ticket routing

export { getDevsTicketsCount, LoadBalancing, TicketRouting };
