import * as React from "react"
import { AppItem } from './AppItem';

interface AppBoxProps {
  icon: string,
  name: string
}

interface AppBoxState {
  status: Array<string>;
}

export class AppBox extends React.Component<AppBoxProps, AppBoxState> { 
  constructor(props: AppBoxProps) {
    super(props);
    this.state = {
      status: ['running']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name: string) {
    
    this.setState(prevState => ({
      status: prevState.status.includes('active') ?
        prevState.status.filter((statusFlag) => statusFlag != 'active') : 
          prevState.status.concat(['active'])
    })); 
    console.log('clicked', name, this.state);

    // change state of app 'name' to foreground
    // add class active=foreground 
  }

  public render() {
    const { name } = this.props;
    return (
      <AppItem {...this.props} clickItem={() => this.handleClick(name)} statusItem={this.state.status} />
    )
  }
}
