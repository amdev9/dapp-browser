import * as uuidv4 from 'uuid/v4';

export interface resolverElement { 
  uuid: string;
  component: string;
  channelId: string; 
};

let mapResolver: resolverElement[] = [];

export class ChannelResolver {
 
  static resolveComponentChannel(component: string, rendererUuid: string) { 

    // init mapResolver if it is empty
    const uuidChannel = uuidv4().replace('-', '');

    mapResolver.push({
      uuid: rendererUuid,
      component: component,
      channelId: uuidChannel
    });
    
    const mapElem = mapResolver.find((item: resolverElement) => item.component == component);
    return mapElem.channelId;
  }
 
}

