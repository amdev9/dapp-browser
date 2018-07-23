const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const START_COUNTDOWN = 'START_COUNTDOWN';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const CANCEL_INCREMENT_ASYNC = 'CANCEL_INCREMENT_ASYNC';
const COUNTDOWN_TERMINATED = 'COUNTDOWN_TERMINATED';

import { createAction } from "typesafe-actions";

export interface Action {
  type: string;
  payload?: {};
  params?: {};
}

// export interface WeatherAction extends Action {
//   params: {
//     lat: number;
//     lng: number;
//   };
// }


export const incrementAction = createAction(INCREMENT_COUNTER, (params = {}) => ({
  type: INCREMENT_COUNTER,
  params,
}));

// function increment() {
//   return {
//     type: INCREMENT_COUNTER
//   };
// }

function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export {
  decrement,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  START_COUNTDOWN,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC,
  COUNTDOWN_TERMINATED
}