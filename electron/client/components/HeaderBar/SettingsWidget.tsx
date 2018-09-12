import * as React from "react"

const loaderIcon = require("../../assets/icons/settings.svg")

interface SettingsWidgetProps {
  isOpen?: boolean;
  togglePanel?(): void
}
export class SettingsWidget extends React.Component<SettingsWidgetProps> {
  public render() {
    const { togglePanel } = this.props;
    return (
      <div onClick={() => togglePanel()}>
        <img className="icon" src={loaderIcon} />
      </div>
    )
  }
}
