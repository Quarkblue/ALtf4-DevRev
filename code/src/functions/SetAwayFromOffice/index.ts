import { client } from "@devrev/typescript-sdk";
import { Devs, InActiveDevs, Tickets } from "../../Modules/DataContext";
import { removeInactiveDev, setInactiveDev} from "../../Modules/DataMethods";
import { TicketRouting } from "../../Modules/SmartTicketRouting";
import { ServiceAccountToken } from "../../Modules/ApiConfig";

async function Handle(event: any){
    handleActiveInactive(event);
    handleLoadBalancing(event);
}

async function handleLoadBalancing(event: any){
    InActiveDevs.forEach((inactiveDev:any)=>{
        Tickets.forEach((ticket:any, ticketId:string)=>{
            if(ticket.owned_by[0].id === inactiveDev.id){
                

                
                TicketRouting("don:identity:dvrv-in-1:devo/2TBAblu5vv:svcacc/2",ticket)
            }
        })
    });
}

async function handleActiveInactive(event: any){
    if (event.payload.command_id) {
        // devrev sdk setup to make the api call as the bot
        const devrevSDK = client.setup({
          endpoint: event.execution_metadata.devrev_endpoint,
          token: ServiceAccountToken,
        });
        const actorID = event.payload.actor_id;
        const parentID = event.payload.parent_id;
        const body = {
          object: parentID,
          type: "timeline_comment",
          body: "dev is inactive",
        };
  
        if (InActiveDevs.has(actorID)) {
          body.body = `set ${InActiveDevs.get(actorID).full_name} as active`;
          removeInactiveDev(actorID);
          
        } else {
          if (Devs.has(actorID)) {
              body.body = `set ${Devs.get(actorID).full_name} as inactive`;
            setInactiveDev(actorID);
            
          } else {
            console.log("Dev not found in either Devs map");
          }
        }
  
        // sending the comment to the timeline
        await devrevSDK.timelineEntriesCreate(body as any);
  
        console.log("Comment added to timeline and set dev as inactive/active");
      }
}

function handleSetInactiveForTickets(){

}


async function run(events: any[]) {
  events.forEach(async (event) => {
    Handle(event);
  });
}

export default run;
