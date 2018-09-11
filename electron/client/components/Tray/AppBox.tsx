import * as React from "react"
import { AppItem } from './AppItem';
import { AppItem as AppItemModel } from '../../redux/model';

interface AppBoxProps {
  item?: AppItemModel,
  toggleSwitch?: (targetDappName?: string) => any
}
 
export class AppBox extends React.Component<AppBoxProps> { 
  constructor(props: AppBoxProps) {
    super(props);
  }

  public render() {
    const { item, toggleSwitch } = this.props;
    return (
      <AppItem {...this.props} clickItem={() => toggleSwitch(item.appName)} />
    )
  }
}
