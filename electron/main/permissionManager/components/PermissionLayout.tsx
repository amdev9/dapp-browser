import * as React from "react";
import { PermCheckBox } from './PermCheckBox'; 
import { Permission } from "../model";

interface PermissionLayoutProps {
  permissions: Permission[]
}
 
export class PermissionLayout extends React.Component<PermissionLayoutProps> { 
  constructor(props: PermissionLayoutProps) {
    super(props);
  }

  public render() {
    // add PermCheckBox props
    const permissionItems: JSX.Element[] = this.props.permissions.map((item): JSX.Element => (
      <PermCheckBox /> //key={`${item}`} item={item}
    ));

    return (
      <div>
        {permissionItems}
        <button>APPROVE</button>
      </div>
    )
  }
}

