import ticketRouteOn_WorkCreated from './functions/ticketRouteOn_WorkCreated/index';
import Initialize from './functions/Initialize/index';

export const functionFactory = {
  ticketRouteOn_WorkCreated,
  Initialize,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
