import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PermCheckBox } from './PermCheckBox'; 
import { PermissionList, SystemComponent, Permission } from "../redux/state";
import { IState } from '../redux/state';

interface PermissionLayoutProps {
  permissions: PermissionList,
}
 
export class PermissionLayout extends React.Component<PermissionLayoutProps> { 
  constructor(props: PermissionLayoutProps) {
    super(props);
    this.handleApproveClick = this.handleApproveClick.bind(this);
  }

  handleApproveClick() {
    console.log('close app');
  }
  
  public render() {
    const { permissions } = this.props;
    const permissionItems: JSX.Element[] = permissions.map((perm: any): JSX.Element => (
      <PermCheckBox 
        key={`${perm}`} 
        permissionConf={perm} /> 

        //  permissionFlag={perm.type} 
        // isChecked={perm.granted}

    ));
    
    return (
      <div>
        {permissionItems}
        <button onClick={this.handleApproveClick}>APPROVE</button>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  // counter: state.counter,
});

// const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
//   onIncrement: CounterActions.increment,
//   // onDecrement: CounterActions.decrement,
// }, dispatch);

export default connect(mapStateToProps)(PermissionLayout); // mapDispatchToProps


