import * as React from 'react';
import { Permission, PermissionsPanel } from '../../redux/reducers/state';

interface PermissionBoxProps {
  item: Permission;
  appName: string;
  onTogglePerm: (permissionName: string, checked: boolean, appName: string) => void;
  permissions: PermissionsPanel;
}

// @todo read data & assets from AppsManager for icons preview
export class PermissionBox extends React.Component<PermissionBoxProps> {

  public render() {
    const appPermissions = this.props.permissions.permissions[this.props.appName];
    const checked = appPermissions && appPermissions.includes(this.props.item);
    const checkboxId = `input_${this.props.appName}_${this.props.item}`;
    return (
      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id={ checkboxId }
            name={ this.props.item }
            checked={ checked }
            className="custom-control-input"
            onChange={ () => this.props.onTogglePerm(this.props.item, !checked, this.props.appName) }
          />
          <label htmlFor={ checkboxId } className="custom-control-label">{this.props.item}</label>
        </div>
      </div>
    );
  }
}
