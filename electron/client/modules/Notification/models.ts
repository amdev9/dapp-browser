export interface NotifyItem {
  id: string;
  message: string;
  icon: string;
  appName: string;
  created: Date;
  onClick: string;
  shown?: boolean;
}

export interface NotificationPanel {
  items: NotifyItem[];
  unreadCounter: number;
}
