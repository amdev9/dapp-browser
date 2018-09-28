import * as React from "react";
import  { Permission } from '../redux/reducers/state';

interface PermCheckBoxProps {
  permissionItem: Permission,
  onTogglePerm?: (PermissionType: Permission) => void
}
 
//@todo read data & assets from AppsManager for icons preview
export class PermCheckBox extends React.Component< PermCheckBoxProps, { checked?: boolean }> { 
  constructor(props: PermCheckBoxProps) {
    super(props);
    this.state = {
      checked: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const { onTogglePerm, permissionItem } = this.props;

    //@todo add actions to change permissions model state

    console.log("handleInputChange");

    onTogglePerm(permissionItem);
    this.setState({ checked: !this.state.checked });

  }

  public render() {
    const { permissionItem } = this.props;
    return (
      <div>
        <label>
          {permissionItem}
          <input
            name={permissionItem}
            type="checkbox"
            checked={this.state.checked}
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

