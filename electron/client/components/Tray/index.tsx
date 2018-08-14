import * as React from "react"
import { AppsList } from './AppsList'; 
import { AppItem } from "../../redux/model";
 
interface TrayProps {
  items?: AppItem[],
  toggleSwitch?: (targetDappId?: number, targetDappName?: string) => any
}

export class Tray extends React.Component<TrayProps> { 
  public render() {
    return (
      <div className="tray">
        <AppsList {...this.props}/>
      </div>
    )
  }
}
