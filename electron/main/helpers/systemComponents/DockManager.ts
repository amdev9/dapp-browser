import { app } from 'electron';

export default class DockManager {
  static setBadge(text: string): void {
    app.dock.setBadge(text);
  }

  static getBadge(): string {
    return app.dock.getBadge();
  }
}
