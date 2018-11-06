import * as React from 'react';
import { Permission, PermissionsPanel } from '../../redux/reducers/state';
import { AppPermissions } from './AppPermissions';
import { DApp } from '../../redux/model';

interface PermissionsTabProps {
  togglePermission: (permissionName: Permission, checked: boolean, appName: string) => void;
  grantPermissions: (appName: string) => void;
  permissions: PermissionsPanel;
  feedItems: DApp[];
}

export class PermissionsTab extends React.Component<PermissionsTabProps> {

  public render() {
    const appCardsList: JSX.Element[] = this.props.feedItems.map((item): JSX.Element => (
      <AppPermissions key={`feedItem_${item.appName}`} feedItem={item} onTogglePerm={this.props.togglePermission} permissions={this.props.permissions}/>
    ));

    return (
      <div>
        {appCardsList}
      </div>
    );
  }
}
