export interface NotifyItem {
  id: string;
  message: string;
  icon: string;
  appName: string;
  created: Date;
  onClick: string;
}

export interface NotificationPanel {
  items: NotifyItem[];
}
