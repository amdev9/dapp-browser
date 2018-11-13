import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { StateType } from 'typesafe-actions';

import rootReducer, { PermissionAction } from '../redux/reducers';

export type RootState = StateType<typeof rootReducer>;
export type RootAction = PermissionAction;

import { connect } from 'react-redux';

import * as permissionActions from '../redux/actions/permission';

import { PermissionBox } from './PermissionBox';
import { Permission } from '../redux/reducers/state';

export interface PermissionLayoutProps {
  permissions: string[];
  appName: string;
  onTogglePerm: (permissionName: Permission, checked: boolean) => any;
  onCloseManager: () => any;
  onGrantPermissions: (appName: string) => any;
  onLoadPermissions: () => any;
  checkedPermissions: {[index: string]: string[]};
}

export class PermissionLayout extends React.Component<PermissionLayoutProps>  {

  constructor(props: PermissionLayoutProps) {
    super(props);
    this.handleGrant = this.handleGrant.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  hasCheckedPermissions() {
    const checkedPermissions = this.props.checkedPermissions[this.props.appName];
    return checkedPermissions && checkedPermissions.length > 0;
  }

  handleGrant() {
    if (this.hasCheckedPermissions()) {
      this.props.onGrantPermissions(this.props.appName);
      this.props.onCloseManager();
    }
  }

  handleCancel() {
    this.props.onCloseManager();
  }

  public render() {

    const permissionItems: JSX.Element[] = this.props.permissions.map(
      (value: string): JSX.Element => (
        <PermissionBox
          key={`${value}`}
          item={value}
          appName={this.props.appName}
          onTogglePerm={this.props.onTogglePerm}
        />
      ),
    );

    return (
      <div>
        <h1>Grant permissions for {this.props.appName}</h1>
        <div className="layout">
        {permissionItems}
        </div>
        <div className="btn-layout">
          <button className="button-success" onClick={this.handleGrant} disabled={!this.hasCheckedPermissions()}>{'Grant'}</button>
          <button className="button-failure" onClick={this.handleCancel}>{'Cancel'}</button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.onLoadPermissions();
  }
}

const mapStateToProps = (state: RootState) => ({
  checkedPermissions: state.permissionManager.permissions,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators({
  onTogglePerm: permissionActions.togglePermission,
  onCloseManager: permissionActions.closeManager,
  onGrantPermissions: permissionActions.grantPermissions,
  onLoadPermissions: permissionActions.loadPermissions,
}, dispatch);

export const PermissionLayoutConnected =
  connect(mapStateToProps, mapDispatchToProps)(PermissionLayout);
