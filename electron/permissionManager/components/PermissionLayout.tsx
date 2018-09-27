import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PermCheckBox } from './PermCheckBox'; 
import { PermissionList, SystemComponent, Permission } from "../redux/state";
import { IState } from '../redux/state';

interface PermissionLayoutProps {
  permissions: PermissionList,
  // mainAction: (action: any) => void
}
 
export class PermissionLayout extends React.Component<PermissionLayoutProps> { 
  constructor(props: PermissionLayoutProps) {
    super(props);
    this.handleApproveClick = this.handleApproveClick.bind(this);
  }

  handleApproveClick() {
    // const {  mainAction } = this.props;
    console.log('close app');
    // mainAction('closeAndSaveaction');
  }
  
  public render() {
    const { permissions } = this.props;
    const permissionItems: JSX.Element[] = permissions.map((perm: any): JSX.Element => (
      <PermCheckBox 
        key={`${perm}`} 
        permissionConf={perm} isChecked={false} /> 

        //  permissionFlag={perm.type} 
        

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


