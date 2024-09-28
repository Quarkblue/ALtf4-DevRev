import ticketRouteOn_WorkCreated from './functions/ticketRouteOn_WorkCreated/index';
import Initialize from './functions/Initialize/index';
import UpdateStatus from "./functions/UpdateStatus/index";

export const functionFactory = {
  ticketRouteOn_WorkCreated,
  Initialize,
  UpdateStatus,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
