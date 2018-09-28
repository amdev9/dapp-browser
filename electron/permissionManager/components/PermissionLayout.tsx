import * as React from 'react';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { PermCheckBox } from './PermCheckBox'; 
import { PermissionList, Permission } from "../redux/reducers/state";
import { IState } from '../redux/reducers/state';


import * as permissionActions from '../redux/actions/permission';

interface PermissionLayoutProps {
  permissions: Permission[],
  onCloseWindow?: () => void,
  onTogglePermission?: (PermissionType: Permission) => void
}
 
export class PermissionLayout extends React.Component<PermissionLayoutProps> { 
  constructor(props: PermissionLayoutProps) {
    super(props);
    this.handleApproveClick = this.handleApproveClick.bind(this);
  }

  handleApproveClick() { 
  
    console.log('close app');

    this.props.onCloseWindow();
  }
  
  public render() {
    const { permissions, onTogglePermission } = this.props;
    const permissionItems: JSX.Element[] = permissions.map(
      (value: Permission): JSX.Element => (
        <PermCheckBox 
          key={`${value}`} 
          permissionItem={value} 
          onTogglePerm={onTogglePermission}
        />
      )      
    );
    
    return (
      <div>
        {permissionItems}
        <button onClick={this.handleApproveClick}>APPROVE</button>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({});
const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  onCloseWindow: permissionActions.closeManager,
  onTogglePermission: permissionActions.togglePermission
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PermissionLayout); 


