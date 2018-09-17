import { SearchAction } from '../actions/search';
import {SearchItem} from "../model";

const initialState: { items: {[index: string]: SearchItem[] }} =
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
    ]}
  };

export default function search(state: { items: {[index: string]: SearchItem[] }} = initialState, action: SearchAction) {
  switch (action.type) {

    default:
      return state;
  }
}
