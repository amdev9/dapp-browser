import * as React from "react";
 
interface PermCheckBoxProps {
  permissionFlag?: string,
  isChecked?: boolean
}
 
//@todo read data & assets from AppsManager for icons preview
export class PermCheckBox extends React.Component<PermCheckBoxProps> { 
  constructor(props: PermCheckBoxProps) {
    super(props);
    // this.state = {
    //   isChecked: true
    // };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const { permissionFlag, isChecked } = this.props;
    // change granted boolean flag
    console.log('handleInputChange', permissionFlag);
  }

  public render() {
    const { permissionFlag, isChecked } = this.props;
    return (
      <div>
        <label>
          {permissionFlag}
          <input
            name={permissionFlag}
            type="checkbox"
            checked={isChecked}
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

