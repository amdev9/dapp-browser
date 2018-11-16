import { combineEpics } from 'redux-observable';

import openLinkEpic from './openLink';

export default combineEpics(
  openLinkEpic,
);
