import * as React from "react";
 
interface PermCheckBoxProps {
 
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
    console.log('handleInputChange');
  }

  public render() {
    return (
      <div>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={false} //this.state.isChecked
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

