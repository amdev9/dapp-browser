import * as React from "react";
 
interface PermCheckBoxProps {
  permissionFlag?: string,
  isChecked?: boolean
}
 
export class PermCheckBox extends React.Component<PermCheckBoxProps> { 
  constructor(props: PermCheckBoxProps) {
    super(props);
    this.state = {
      isChecked: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const { permissionFlag } = this.props;
    console.log('handleInputChange', permissionFlag);
  }

  public render() {
    const { permissionFlag } = this.props;
    return (
      <div>
        <label>
          {permissionFlag}
          <input
            name={permissionFlag}
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

