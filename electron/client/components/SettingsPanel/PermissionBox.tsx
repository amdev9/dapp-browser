import * as React from 'react';

interface PermissionBoxProps {
  item: string;
  appName: string;
  onTogglePerm: (permissionName: string, checked: boolean, appName: string) => void;
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
    const checkboxId = `input_${this.props.appName}_${this.props.item}`;
    return (
      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            id={ checkboxId }
            name={ this.props.item }
            checked={ this.state.checked }
            className="custom-control-input"
            onChange={ this.handleInputChange }
          />
          <label htmlFor={ checkboxId } className="custom-control-label">{this.props.item}</label>
        </div>
      </div>
    );
  }
}
