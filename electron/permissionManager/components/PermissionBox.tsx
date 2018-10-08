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
    const { item, onTogglePerm } = this.props;
 
    return (
      <div>
        <label>
          {item}
          <input
            name={item}
            type="checkbox"
            checked={this.state.checked}
            onClick={() => { onTogglePerm(); }}
             />
             {/* onChange={this.handleInputChange} */}
        </label>
      </div>
    )
  }
}

