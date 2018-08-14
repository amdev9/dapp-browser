import * as React from "react"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import { AppItem as AppItemModel } from '../../redux/model';

import './react-contextmenu.css';

interface AppsItemProps {
  item?: AppItemModel,
  clickItem?: () => void
}

interface ClickObj {
  foo: string
}

export class AppItem extends React.Component<AppsItemProps> { 
  
  constructor(props: AppsItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  } 

  handleClick(e: Event, typeClick: ClickObj) {
    console.log('clicked');
  }

  public render() {
    const { item, clickItem } = this.props
    
    const classNameValue = `tray item ${item.statusIcon.join(' ')}`;
    return (
      <div>
        <ContextMenuTrigger id="context-menu">
          <div className={classNameValue}>
            <div className="icon">
              <img src={item.icon} alt={item.appName} onClick={clickItem} />
            </div>
          </div>
        </ ContextMenuTrigger>

        <ContextMenu id="context-menu">
          <MenuItem data={{foo: 'pin'}} onClick={this.handleClick}>
          Pin to top
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
          ContextMenu Item 2
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{foo: 'bar 2'}} onClick={this.handleClick}>
          ContextMenu Item 3
          </MenuItem>
        </ContextMenu>
      </div>
    )
  }
}
