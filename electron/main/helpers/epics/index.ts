import { combineEpics } from "redux-observable";

import openChannelEpic from "./openChannelEpic";

const epics = combineEpics(
  ...openChannelEpic,
);

export default epics;
