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
  checked: boolean;

  constructor(props: PermissionBoxProps) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.props.onTogglePerm(this.props.item, !this.checked, this.props.appName);
  }

  public render() {
    const checkboxId = `input_${this.props.appName}_${this.props.item}`;
    const appPermissions = this.props.permissions.permissions[this.props.appName];
    this.checked  = appPermissions && appPermissions.includes(this.props.item);
    return (
      <div className="custom-control custom-checkbox">
        <label className="container">
          {this.props.item}
          <input
            type="checkbox"
            id={ checkboxId }
            name={ this.props.item }
            checked={ this.checked }
            onChange={ this.handleInputChange }
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}
