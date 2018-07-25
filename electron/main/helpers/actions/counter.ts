const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const START_COUNTDOWN = 'START_COUNTDOWN';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const CANCEL_INCREMENT_ASYNC = 'CANCEL_INCREMENT_ASYNC';
const COUNTDOWN_TERMINATED = 'COUNTDOWN_TERMINATED';

import { createAction, action } from "typesafe-actions";

export interface Action {
  type: string;
  payload?: {};
  params?: {};
}

export const increment = () => action(INCREMENT_COUNTER); 
export const decrement = () => action(DECREMENT_COUNTER); 

export {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  START_COUNTDOWN,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED
}