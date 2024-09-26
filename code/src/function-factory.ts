import ticketRouteOn_WorkCreated from './functions/ticketRouteOn_WorkCreated/index';
import Initialize from './functions/Initialize/index';
import refreshDataContext from './functions/refreshDataContext/index';
import SetAwayFromOffice from "./functions/SetAwayFromOffice/index";

export const functionFactory = {
  ticketRouteOn_WorkCreated,
  Initialize,
  refreshDataContext,
  SetAwayFromOffice,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
