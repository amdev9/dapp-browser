import * as React from 'react';

interface PermissionBoxProps {
  item: string;
  appName: string;
  onTogglePerm: (permissionName: string, checked: boolean, appName: string) => any;
}

// @todo read data & assets from AppsManager for icons preview
export class PermissionBox extends React.Component<PermissionBoxProps, { checked?: boolean }> {
  constructor(props: PermissionBoxProps) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.props.onTogglePerm(this.props.item, !this.state.checked, this.props.appName);
    this.setState({ checked: !this.state.checked });
  }

  public render() {
    return (
      <div>
        <label className="container">{this.props.item}
          <input
            name={this.props.item}
            type="checkbox"
            checked={this.state.checked}
            onChange={this.handleInputChange} />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}
