import { AppItem, NotifyItem, ActiveDapp, StatusBarItem } from '../model';

export interface Feed {
 
}

export interface Tray {
  items: AppItem[],
  activeDapp: ActiveDapp,
  pinned: string[],
  isHome: boolean
}

export interface NotificationPanel {
  items: NotifyItem[],
  isOpen: boolean
}

export interface StatusBarPanel {
  items: { [index: string]: StatusBarItem; },
  isOpen: boolean
}

export type Counter = number;

export interface IState {
  counter: Counter;
  notification: NotificationPanel;
  statusBar: StatusBarPanel;
  tray: Tray
}
