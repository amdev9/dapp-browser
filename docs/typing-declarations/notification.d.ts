export namespace Notification {
  type NotifyImage = string; // Base64

  export interface INotify {
    onClick: (context: INotify) => void;

    image?: NotifyImage,
    message: string,
    title?: string,
  }
}

export abstract class Notification {
  // Push notify
  push(notify: Notification.INotify): Promise<boolean>;

  // Request permission, symlink to Permissions
  requestPermission(): Promise<boolean>;
  // Get current status of permission
  permission(): boolean;
}