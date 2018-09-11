import * as React from "react"
import { AppsList } from './AppsList';
import { AppItem } from "../../redux/model";

const indicatorIcon = require("../../assets/icons/indicator.svg");
const closeIcon = require("../../assets/icons/close.svg");

interface TrayProps {
  items?: AppItem[],
  statusBarIsOpen: boolean
  toggleStatusBar?: () => void
  toggleSwitch?: (targetDappId?: number, targetDappName?: string) => any
}

export class Tray extends React.Component<TrayProps> {
  private getBottomToggle(): JSX.Element {
    let { statusBarIsOpen, toggleStatusBar } = this.props;

    const statusIcon = statusBarIsOpen ? closeIcon : indicatorIcon;

    return (
      <div className="bottom" onClick={() => toggleStatusBar()}>
        <div className="indicator">
          <img src={statusIcon} />
        </div>
      </div>
    )
  }

  public render() {
    return (
      <div className="tray">
        <AppsList {...this.props}/>
        {this.getBottomToggle()}
      </div>
    )
  }
}
