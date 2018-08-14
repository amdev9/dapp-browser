import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';

export interface CounterAction extends Action {}
export const increment = (): CounterAction => action(INCREMENT_COUNTER);
export const decrement = (): CounterAction => action(DECREMENT_COUNTER);
