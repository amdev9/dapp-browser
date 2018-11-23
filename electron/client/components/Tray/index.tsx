import * as React from 'react';
import { AppsList } from './AppsList';
import { AppItem } from '../../redux/model';

// @todo intergrate
// import PerfectScrollbar from "react-perfect-scrollbar";

const indicatorIcon = require('../../assets/icons/indicator.svg');
const consoleIcon = require('../../assets/icons/console.svg');
const closeIcon = require('../../assets/icons/close.svg');

interface TrayProps {
  items: AppItem[];
  peersBarIsOpen: boolean;
  statusBarOpen: boolean;
  togglePeersBar: () => void;
  toggleSwitch: (targetDappName: string) => any;
}

export class Tray extends React.Component<TrayProps> {
  private getBottomToggle(): JSX.Element {
    const { peersBarIsOpen, togglePeersBar, statusBarOpen } = this.props;

    let statusIcon = peersBarIsOpen ? closeIcon : indicatorIcon;
    if (statusBarOpen) {
      statusIcon = consoleIcon;
    }

    return (
      <div className="bottom" onClick={() => togglePeersBar()}>
        <div className="indicator">
          <img src={statusIcon} />
        </div>
      </div>
    );
  }

  public render() {
    return (
      <div className="tray">
        <AppsList {...this.props}/>
        {this.getBottomToggle()}
      </div>
    );
  }
}
