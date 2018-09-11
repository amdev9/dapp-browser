import { AppItem, NotifyItem, ActiveDapp, StatusBarItem, FeedItem } from '../model';

export interface Feed {
  items: FeedItem[]
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

export interface LoaderPanel {
  isOpen: boolean
}

export interface StatusBarPanel {
  items: { [index: string]: StatusBarItem; },
  isOpen: boolean
  isPeersOpen: boolean
}

export type Counter = number;

export interface IState {
  counter: Counter;
  notification: NotificationPanel;
  loader: LoaderPanel;
  statusBar: StatusBarPanel;
  tray: Tray;
  feed: Feed;
}
