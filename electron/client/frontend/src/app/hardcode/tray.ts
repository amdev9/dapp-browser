import { Some, None } from "space-lift"
import { TrayItem } from "app/models"

export const trayItemsInitialState: TrayItem[] = [{
  icon: require("../../assets/app-icons/share.svg"),
  name: "Share",

  disabled: true,
  loading: true,
  running: false,
  active: false,
  pin: true,

  indicator: None,
  progress: None,
  counter: None,
  image: None,
  position: 0,
}, {
  icon: require("../../assets/app-icons/marketplace.svg"),
  name: "Marketplace",

  disabled: false,
  loading: false,
  running: true,
  active: true,
  pin: true,

  indicator: Some(TrayItem.Indicator.Progress),
  progress: Some(0.37),
  counter: None,
  image: None,
  position: 1,
}, {
  icon: require("../../assets/app-icons/exchange.svg"),
  name: "Exchange",

  disabled: false,
  loading: false,
  running: true,
  active: false,
  pin: false,

  indicator: Some(TrayItem.Indicator.Loading),
  progress: None,
  counter: None,
  image: None,
  position: 0,
}, {
  icon: require("../../assets/app-icons/chat.svg"),
  name: "Chat",

  disabled: false,
  loading: false,
  running: true,
  active: false,
  pin: false,

  indicator: Some(TrayItem.Indicator.Counter),
  counter: Some(666),
  progress: None,
  image: None,
  position: 1,
}, {
  icon: require("../../assets/app-icons/contact.svg"),
  name: "Contacts",

  disabled: false,
  loading: false,
  running: false,
  active: false,
  pin: false,

  indicator: None,
  progress: None,
  counter: None,
  image: None,
  position: 2,
}]
