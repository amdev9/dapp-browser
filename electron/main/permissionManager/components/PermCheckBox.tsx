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

  public render() {
    return (
      <div>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.handleInputChange} />
        </label>
      </div>
    )
  }
}

