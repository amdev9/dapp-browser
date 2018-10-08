import * as React from "react";
// import  { Permission } from '../redux/reducers/state';

interface PermissionBoxProps {
  item: string,
  onTogglePerm?: () => any
}
 
//@todo read data & assets from AppsManager for icons preview
export class PermissionBox extends React.Component< PermissionBoxProps, { checked?: boolean }> { 
  constructor(props: PermissionBoxProps) {
    super(props);
    this.state = {
      checked: false
    }; 
  }  

  public render() {
    return (
      <div>
        <label>
          {this.props.item}
          <input
            name={this.props.item}
            type="checkbox"
            checked={this.state.checked}
       
            onChange={() => { this.props.onTogglePerm(); }}
             />
             {/*  */}
        </label>
      </div>
    )
  }
}

