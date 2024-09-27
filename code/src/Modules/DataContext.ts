
// get the users from api to store
// get the works and there tags from the api

const Devs = new Map();
const Tickets = new Map();
const InActiveDevs = new Map();

const closedStages = ["accepted", "resolved", "canceled"];
const activeTicketStages = ["queued", "work_in_progress", "awaiting_customer_response", "awaiting_product_assist", "awaiting development", "in_development"];

const newInactiveDevs = new Array();


function addDevsToMap(devs: any){
    devs.forEach((dev: any) => {
        Devs.set(dev.id, dev);
    })
}


function getDevTickets(devid: string): number{
    let count = 0;
    Tickets.forEach((ticket: any) => {
        if(ticket.owned_by[0].id === devid){
            count ++;
        }
    });
    console.log(`Dev ${devid} has ${count} tickets {Log from getDevTickets in data context}`);
    return count;
}

function addTicketsToMap(tickets: any){
    tickets.forEach((ticket: any) => {
        if(activeTicketStages.includes(ticket.stage.name)){
            
            Tickets.set(ticket.id, ticket);
            console.log(`Ticket ${ticket.id} => ${ticket.title} is added to the Tickets map {from addTicketsToMap in data context}`);
        }
        
    })
}


export { Devs, Tickets, InActiveDevs ,closedStages, activeTicketStages, addDevsToMap, addTicketsToMap, getDevTickets, newInactiveDevs };