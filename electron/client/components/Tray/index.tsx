import * as React from "react"
import { AppsList } from './AppsList';
import { AppItem } from "../../redux/model";

//@todo intergrate 
import PerfectScrollbar from "react-perfect-scrollbar";

const indicatorIcon = require("../../assets/icons/indicator.svg");
const closeIcon = require("../../assets/icons/close.svg");

interface TrayProps {
  items?: AppItem[],
  peersBarIsOpen: boolean
  togglePeersBar?: () => void
  toggleSwitch?: (targetDappName?: string) => any
}

export class Tray extends React.Component<TrayProps> {
  private getBottomToggle(): JSX.Element {
    let { peersBarIsOpen, togglePeersBar } = this.props;

    const statusIcon = peersBarIsOpen ? closeIcon : indicatorIcon;

    return (
      <div className="bottom" onClick={() => togglePeersBar()}>
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
