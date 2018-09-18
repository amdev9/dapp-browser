import { SearchAction } from '../actions/search';
import { SearchPanel } from "./state";
import { TOGGLE_SEARCH_PANEL } from "../constants";

const initialState: SearchPanel =
  {items:
    {
    applications: [
      {
        icon: require("../../assets/app-icons/chat.svg"),
        uri: "chat://sendMessage/satan/",
        network: "mainnet",
        app: "Chat",
      },
      {
        icon: require("../../assets/app-icons/exchange.svg"),
        uri: "exchange://send-file/",
        network: "testnet",
        app: "Exchange",
      },
    ],

    marketplace: [
      {
        icon: require("../../assets/app-icons/chat.svg"),
        uri: "chat://marketplace/install?name=Chat",
        network: "mainnet",
        app: "Chat",
      },
      {
        icon: require("../../assets/app-icons/exchange.svg"),
        uri: "chat://marketplace/install?name=Exchange",
        network: "testnet",
        app: "Exchange",
      },
    ]},

    isOpen: false
  };

export default function search(state: SearchPanel = initialState, action: SearchAction) {
  switch (action.type) {
    case TOGGLE_SEARCH_PANEL:
      if (action.payload && action.payload.hasOwnProperty('isOpen')) {
        return { ...state, isOpen: action.payload.isOpen };
      } else {
        return { ...state, isOpen: !state.isOpen };
      }

    default:
      return state;
  }
}
