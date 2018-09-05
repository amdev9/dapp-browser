import * as React from "react"

const loaderIcon = require("../../assets/icons/cloud.svg")

interface DownloadWidgetProps {
  isOpen?: boolean;
  togglePanel?(): void
}
export class DownloadWidget extends React.Component<DownloadWidgetProps> {
  public render() {
    const { togglePanel } = this.props;
    return (
      <div className="app-loader" onClick={() => togglePanel()}>
        <img className="icon" src={loaderIcon} />
      </div>
    )
  }
}
