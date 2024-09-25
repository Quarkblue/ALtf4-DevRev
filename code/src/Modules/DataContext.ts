
// get the users from api to store
// get the works and there tags from the api

import { TicketRouting } from "./SmartTicketRouting";

const Devs = new Map();
const Tickets = new Map();


function addDevsToMap(devs: any){
    devs.forEach((dev: any) => {
        if(!Devs.has(dev.id)){
            Devs.set(dev.id, dev);
        }
    })
}

function addTicketToDev(ticket: any, devid: any){
    Devs.forEach((dev: any) => {
        if(dev.dev.id === devid && !dev.tickets.includes(ticket.id)){
            dev.tickets.push(ticket.id);
        }
    });
}

function getDevTickets(devid: string): number{
    let count = 0;
    Tickets.forEach((ticket: any) => {
        if(ticket.owned_by[0].id === devid){
            count ++;
        }
    });
    return count;
} 

function addTicketsToMap(tickets: any){
    tickets.forEach((ticket: any) => {
        if(activeTicketStages.includes(ticket.stage.name)){
            if(!Tickets.has(ticket.id)){ 
                Tickets.set(ticket.id, ticket);
            }
        }
        
    })
}

const closedStages = ["accepted", "resolved", "canceled"];
const activeTicketStages = ["queued", "work_in_progress", "awaiting_customer_response", "awaiting_product_assist", "awaiting development", "in_development"];

export { Devs, Tickets, closedStages, activeTicketStages, addDevsToMap, addTicketsToMap, addTicketToDev, getDevTickets };