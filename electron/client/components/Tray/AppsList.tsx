import * as React from "react"
import { AppBox } from './AppBox'; 
import { AppItem } from "../../redux/model";
 
import * as ScrollArea from 'react-scrollbar';

interface AppListProps {
  items?: AppItem[],
  toggleSwitch?: (targetDappName?: string) => any
}

export class AppsList extends React.Component<AppListProps> { 
  render() {
    const appItemsList: JSX.Element[] = this.props.items.map((item): JSX.Element => (
      <AppBox key={`${item.appName}`} item={item} toggleSwitch={this.props.toggleSwitch}/>
    ));

    return (
      <div className="list">
        <ScrollArea>
          {appItemsList} 
        </ScrollArea>
      </div>
    )
  }
}
