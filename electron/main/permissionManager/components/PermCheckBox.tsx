import * as React from "react";
 
interface PermCheckBoxProps {
  permissionConf: any
  // permissionFlag?: string,
  // isChecked?: boolean
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
    const { permissionConf } = this.props;
    // change granted boolean flag
    // console.log('handleInputChange', permissionFlag);
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
            checked={false}
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

