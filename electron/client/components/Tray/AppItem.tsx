import * as React from "react"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

interface AppsItemProps {
  icon: string,
  name: string,
  clickItem?: () => void,
  statusItem: Array<string>
}

export class AppItem extends React.Component<AppsItemProps> { 
  
  constructor(props: AppsItemProps) {
    super(props);
  } 

  public render() {
    const { icon, name, clickItem, statusItem } = this.props

    const classNameValue = `tray item ${statusItem.join(' ')}`;
    return (
      <div>
        <ContextMenuTrigger id="context-menu">
          <div className={classNameValue}>
            <div className="icon">
              <img src={icon} alt={name} onClick={clickItem} />
            </div>
          </div>
        </ ContextMenuTrigger>

        <ContextMenu id="context-menu">
          <MenuItem data={{foo: 'bar'}} >
          ContextMenu Item 1
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} >  {/* onClick={this.handleClick} */}
          ContextMenu Item 2
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{foo: 'bar'}} >
          ContextMenu Item 3
          </MenuItem>
        </ContextMenu>
      </div>
    )
  }
}
