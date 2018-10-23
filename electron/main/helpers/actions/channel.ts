import * as constants from '../constants';
import { action } from 'typesafe-actions';

export const openChannel = (uuid: string) => action(constants.OPEN_CHANNEL, { uuid });

export const intentOpenChannel = (uuidRec: string, uuidSend: string) => action(constants.INTENT_OPEN_CHANNELS, {
  uuidRec,
  uuidSend,
});

export const openChannelSuccess = () => action(constants.OPEN_CHANNEL_SUCCESS, {});
export const bindOpenChannels = () => action(constants.BIND_OPEN_CHANNELS, {});
export const bindOpenChannelsDone = () => action(constants.BIND_OPEN_CHANNELS_DONE , {});
