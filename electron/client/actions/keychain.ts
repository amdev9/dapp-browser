import { KeychainItem, KeychainSessionItem } from "app/models"
import { createAction } from "redux-actions"
import { Option } from "space-lift"

export namespace KeychainActions {
  export enum Type {
    ACTIVATE_KEYCHAIN_SESSION = "ACTIVATE_KEYCHAIN_SESSION",
    UPLOAD_KEYCHAIN_SESSIONS = "UPLOAD_KEYCHAIN_SESSIONS",
    CLOSE_KEYCHAIN_SESSION = "CLOSE_KEYCHAIN_SESSION",
    UPLOAD_KEYCHAIN_ITEMS = "UPLOAD_KEYCHAIN_ITEMS",
  }

  export namespace Payload {
    // It is app name in map
    export type CloseSession = string

    export interface UploadSessions {
      [app: string]: Option<KeychainSessionItem>
    }

    export interface ActivateSession {
      session: KeychainSessionItem
      app: string
    }
  }

  export const activateSession = createAction<Payload.ActivateSession>(Type.ACTIVATE_KEYCHAIN_SESSION)
  export const uploadSessions = createAction<Payload.UploadSessions>(Type.UPLOAD_KEYCHAIN_SESSIONS)
  export const closeSession = createAction<Payload.CloseSession>(Type.CLOSE_KEYCHAIN_SESSION)
  export const uploadItems = createAction<KeychainItem[]>(Type.UPLOAD_KEYCHAIN_ITEMS)
}
