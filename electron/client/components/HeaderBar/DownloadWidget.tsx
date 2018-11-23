import * as React from 'react';

const loaderIcon = require('../../assets/icons/cloud.svg');
const loaderIconActive = require('../../assets/icons/cloud_active.svg');

interface DownloadWidgetProps {
  togglePanel(): void;
  isOpen: boolean;
}
export class DownloadWidget extends React.Component<DownloadWidgetProps> {
  public render() {
    const { togglePanel, isOpen } = this.props;
    const icon = isOpen ? loaderIconActive : loaderIcon;
    return (
      <div className="app-loader" onClick={() => togglePanel()}>
        <img className="icon" src={icon} />
      </div>
    );
  }
}
