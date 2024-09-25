import axios from "axios";
import { apiConfig } from "./ApiConfig";
import { Tickets } from "./DataContext";

async function getTicketsFromAPI(){
    axios.get(apiConfig.baseURL + `works.list`,{
     headers:apiConfig.headers,
     params: {type: "ticket"},
    }).then((response) => {
     response.data.works.forEach((ticket:any) => {
         console.log(ticket)
         Tickets.set(ticket.id,ticket);
     })
    });
 }

export {getTicketsFromAPI}