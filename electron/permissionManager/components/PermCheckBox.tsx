import * as React from "react";
 
interface PermCheckBoxProps {
  permissionConf: any,
  // permissionFlag?: string,
  isChecked?: boolean
}
 
//@todo read data & assets from AppsManager for icons preview
export class PermCheckBox extends React.Component< PermCheckBoxProps, { checked?: boolean }> { 
  constructor(props: PermCheckBoxProps) {
    super(props);
    this.state = {
      checked: this.props.isChecked
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {

    //@todo add actions to change permissions model state

    console.log("handleInputChange");
    this.setState({ checked: !this.state.checked });

  }

  public render() {
    const { permissionConf } = this.props;
    return (
      <div>
        <label>
          {JSON.stringify(permissionConf)}
          <input
            name={JSON.stringify(permissionConf)}
            type="checkbox"
            checked={this.state.checked}
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

