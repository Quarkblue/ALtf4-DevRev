import ticketRouteOn_WorkCreated from './functions/ticketRouteOn_WorkCreated/index';

export const functionFactory = {
  ticketRouteOn_WorkCreated,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
