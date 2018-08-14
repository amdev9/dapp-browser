import * as React from "react"
import { AppBox } from './AppBox'; 
import { AppItem } from "../../redux/model";
 
interface AppListProps {
  items?: AppItem[],
  toggleSwitch?: (targetDappId?: number, targetDappName?: string) => any
}

export class AppsList extends React.Component<AppListProps> { 
  render() {
    const appItemsList: JSX.Element[] = this.props.items.map((item): JSX.Element => (
      <AppBox item={item} toggleSwitch={this.props.toggleSwitch}/>
    ));

    return (
      <div className="list">
        {appItemsList} 
      </div>
    )
  }
}
