import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { APPS_FEED_RESIZE } from '../constants';

export interface AppsFeedAction extends Action {
  payload?: {
    width: number,
    height: number
  }
}

export const resize = (width: number, height: number): AppsFeedAction => action(APPS_FEED_RESIZE, {width, height});
