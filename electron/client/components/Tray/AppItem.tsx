import * as React from "react"
import { Line } from "rc-progress"
import { IoMdClose, IoMdKey } from 'react-icons/io';

import { AppItem as AppItemModel } from '../../redux/model';


interface AppsItemProps {
  item?: AppItemModel,
  clickItem?: () => void
}

export interface AppItemState {
  actionsIsOpen: boolean
}

export class AppItem extends React.Component<AppsItemProps, AppItemState> {

  constructor(props: AppsItemProps) {
    super(props);

    this.getActionIndicator = this.getActionIndicator.bind(this);
    this.getIndicator = this.getIndicator.bind(this);
    this.getActions = this.getActions.bind(this);
    this.closeApp = this.closeApp.bind(this);
    this.pinner = this.pinner.bind(this);
  }

  public state: AppItemState = {
    actionsIsOpen: false,
  };

  private async pinner(item: AppItemModel, event: React.MouseEvent<HTMLElement>) {
    console.log("AppItem pinned");
  }

  private async closeApp(item: AppItemModel, event: React.MouseEvent<HTMLElement>) {
    console.log("AppItem closeApp");
  }

  private getActions(item: AppItemModel): JSX.Element | null {
    const { actionsIsOpen } = this.state;

    if (!actionsIsOpen) {
      return null
    } else {
      const closeApp = this.closeApp.bind(this, item)
      const pinner = this.pinner.bind(this, item)

      return (
        <div className="actions">
          <div className="close" onClick={closeApp}>
            <IoMdClose fontSize="10px" color="#e7545d" />
          </div>

          <div className={`pin ${item.pin ? "pinned" : "unpined"}`} onClick={pinner}>
            <IoMdKey fontSize="10px" color={item.pin ? "#b1bbc8" : "#4686ff"} />
          </div>
        </div>
      )
    }
  }

  private getIndicator(item: AppItemModel): JSX.Element | null {
    if (!item.indicator) {
      return <div />
    } else {
      return (
        <Line className="progress" percent={item.indicator} />
      )       
    }
  }

  private getActionIndicator(item: AppItemModel): JSX.Element | null {
    const counter = item.counter;
    
    if (counter) {
      return (
        <div className="counter">
          {counter}
        </div>
      )
    } else {
      return null
    }
  }

  public render() {
    const { item, clickItem } = this.props;

    const classNameValue = `tray item ${item.statusIcon.join(' ')}`;
    const itemRootProps: any = {
      onMouseLeave: () => this.setState({ actionsIsOpen: false }),
      onMouseEnter: () => this.setState({ actionsIsOpen: true }),
      className: "tray root-item",
    };
    return (
      <div {...itemRootProps}>
        <div className={classNameValue}>
          <div className="icon">
            <img src={item.icon} alt={item.appName} onClick={clickItem} />
          </div>
          <div className="process-indicator">
            {this.getIndicator(item)}
          </div>
          
          {this.getActionIndicator(item)}
        </div>
        {this.getActions(item)}
      </div>
    )
  }
}
