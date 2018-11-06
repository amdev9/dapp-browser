import * as React from 'react';
import { DApp } from '../../redux/model';
import { Permission } from '../../redux/reducers/state';
import { PermissionBox } from './PermissionBox';

interface AppPermissionsProps {
  feedItem: DApp;
  onTogglePerm: (permissionName: Permission, checked: boolean, appName: string) => void;
}

export class AppPermissions extends React.Component<AppPermissionsProps>  {
  constructor(props: AppPermissionsProps) {
    super(props);
    this.getPermissions = this.getPermissions.bind(this);
  }

  private getPermissions(): JSX.Element {
    const { feedItem } = this.props;
    const items = feedItem.permissions.map((item, index): JSX.Element => (
      <PermissionBox key={`pb_${feedItem.appName}_${item}`} item={item} appName={feedItem.appName}  onTogglePerm={this.props.onTogglePerm} />
    ));
    return (
      <div>
        {items}
      </div>
    );
  }
  public render() {
    return (
      <div>
        <h4>{this.props.feedItem.appName}</h4>
        {this.getPermissions()}
      </div>
    );
  }
}
