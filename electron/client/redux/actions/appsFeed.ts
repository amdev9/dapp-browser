import { action } from 'typesafe-actions';
import { APPS_FEED_RESIZE } from '../constants';

export const resize = (width: number, height: number) => action(APPS_FEED_RESIZE, {width, height});
