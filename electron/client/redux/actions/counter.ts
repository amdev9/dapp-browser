import { action } from 'typesafe-actions';
import { Action } from 'redux';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export interface CounterAction extends Action {}
export const increment = () => action(INCREMENT_COUNTER);
export const decrement = () => action(DECREMENT_COUNTER);

 