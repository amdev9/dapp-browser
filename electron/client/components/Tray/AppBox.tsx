import * as React from "react"
import { AppItem } from './AppItem';

interface AppsListProps {
  icon: string,
  name: string
}

export class AppBox extends React.Component<AppsListProps> { 
  public render() {
    return (
      <AppItem {...this.props}/>
    )
  }
}
