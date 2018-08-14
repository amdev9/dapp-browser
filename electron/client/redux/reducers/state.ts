import { AppItem, NotifyItem, ActiveDapp } from '../model';

export interface Tray {
  items: AppItem[],
  activeDapp: ActiveDapp,
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
