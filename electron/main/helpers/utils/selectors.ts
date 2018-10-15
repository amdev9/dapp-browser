import { createSelector } from 'reselect'

import {IState, Permission} from '../reducers/state'

export const checkComponentAppPermissions = (appName: string, component: Permission) => createSelector(
  (state: IState) => state && state.permissionManager,
  (permissionManager) => {
    if (!(appName in permissionManager.permissions)){
      return false
    }

    const appPermissions: Array<Permission> = permissionManager.permissions[appName]

    return appPermissions.includes(component)
  }
)
