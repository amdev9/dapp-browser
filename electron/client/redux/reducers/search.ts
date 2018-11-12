import { ActionType } from 'typesafe-actions';
import { SearchPanel } from './state';
import * as searchActions from '../actions/search';

export type SearchAction = ActionType<typeof searchActions>;

// const initialState: SearchPanel =
//   {items:
//     {
//     applications: [
//       {
//         icon: require("../../assets/app-icons/chat.svg"),
//         uri: "chat://sendMessage/satan/",
//         network: "mainnet",
//         app: "Chat1",
//       },
//       {
//         icon: require("../../assets/app-icons/exchange.svg"),
//         uri: "exchange://send-file/",
//         network: "testnet",
//         app: "Exchange",
//       },
//     ],

//     marketplace: [
//       {
//         icon: require("../../assets/app-icons/chat.svg"),
//         uri: "chat://marketplace/install?name=Chat",
//         network: "mainnet",
//         app: "Chat",
//       },
//       {
//         icon: require("../../assets/app-icons/exchange.svg"),
//         uri: "chat://marketplace/install?name=Exchange",
//         network: "testnet",
//         app: "Exchange",
//       },
//     ]},

//     isOpen: false
//   };

export default function search(state: SearchPanel = null, action: SearchAction) {
  switch (action.type) {

    default:
      return state;
  }
}
