import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';
 
import { PermissionAction } from '../redux/reducers';
import rootReducer from '../redux/reducers';
 
export type RootState = StateType<typeof rootReducer>;
export type RootAction = PermissionAction;
 
import { connect } from 'react-redux';

import * as permissionActions from '../redux/actions/permission';
 
import { PermissionBox } from './PermissionBox';

export interface PermissionLayoutProps {
  permissions: string[];
  // label: string;
 
  onToggle?: () => any;
}

export const PermissionLayout: React.SFC<PermissionLayoutProps> = (props) => {
  const {  onToggle, permissions } = props;

  const permissionItems: JSX.Element[] = permissions.map(
    (value: string): JSX.Element => (
      <PermissionBox 
        key={`${value}`} 
        item={value} 
        onTogglePerm={onToggle}
      />
    )      
  );


  const handleToggle = () => { onToggle(); };

  return (
    <div>
      <span>{permissionItems} </span>
      <button type="button" onClick={handleToggle}>
        {`Toggle`}
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  // count: state.counters.reduxCounter,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  onToggle: permissionActions.togglePermission,
}, dispatch);

export const PermissionLayoutConnected =
  connect(mapStateToProps, mapDispatchToProps)(PermissionLayout);




