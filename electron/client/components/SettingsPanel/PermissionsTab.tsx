import * as React from 'react';
import { Permission, PermissionsPanel } from '../../redux/reducers/state';
import { PermissionBox } from './PermissionBox';

interface PermissionsTabProps {
  togglePermission: (permissionName: Permission, checked: boolean, appName: string) => void;
  grantPermissions: (appName: string) => void;
  permissions: PermissionsPanel;
}

export class PermissionsTab extends React.Component<PermissionsTabProps> {

  public render() {
    return (
      <div>
        <h4>Game</h4>
        <PermissionBox item={'ipfs'} appName={'Game'}  onTogglePerm={this.props.togglePermission} />
        <PermissionBox item={'storage'} appName={'Game'}  onTogglePerm={this.props.togglePermission} />

        <h4>Google</h4>
        <PermissionBox item={'ipfs'} appName={'Google'}  onTogglePerm={this.props.togglePermission} />
        <PermissionBox item={'storage'} appName={'Google'}  onTogglePerm={this.props.togglePermission} />
        <PermissionBox item={'network'} appName={'Google'}  onTogglePerm={this.props.togglePermission} />
      </div>
    );
  }
}
