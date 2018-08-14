 
import { AppItem, NotifyItem } from '../model';

export interface Tray {
  items: AppItem[],
  activeDapp: string,
  pinned: string[]
}
export interface NotificationPanel {
  items: NotifyItem[],
  isOpen: boolean
}
export type Counter = number;

export interface IState {
  counter: Counter;
  notification: NotificationPanel;
  tray: Tray
}

