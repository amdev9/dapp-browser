// Type definitions for Permissions (Array.io)
// Project: http://array.io
// Definitions by: Anton Shramko <https://github.com/friktor>
// TypeScript Version: 2.9

export interface RequestResponse {
  granted: boolean, // доступ разрешен или нет
  name: string, // имя компонента на которое запрашивается рарешение
}

export enum Permission { // список компонентов на которые даются разрешения
  AudioCapture,
  VideoCapture,
  Notification,
  Activity,
  Platform,
  Keychain,
  Storage,
  Assets,
  Logger,
  Tray,
  IPFS,
  P2P,
}

export abstract class Permissions {
  request(system: Permission[]): Promise<RequestResponse[]>; // Запрос на разрешение
  granted(system: Permission): Promise<boolean>; // Дано ли разрешение?
}
