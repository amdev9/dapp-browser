import * as React from 'react';
import { Permission } from '../../redux/reducers/state';
import { PermissionBox } from './PermissionBox';

interface PermissionsTabProps {
  togglePermission: (permissionName: Permission, checked: boolean, appName: string) => void;
  grantPermissions: (appName: string) => void;
}

export class PermissionsTab extends React.Component<PermissionsTabProps> {

  public render() {
    return (
      <div>
        <h4>Game</h4>
        <form className="form-settings">
          <div className="form-group">
            <PermissionBox item={'IPFS'} appName={'Game'}  onTogglePerm={this.props.togglePermission} />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="input-proxy-2" defaultChecked={true} className="custom-control-input" />
              <label htmlFor="input-proxy-2" className="custom-control-label">Test 2</label>
            </div>
          </div>
          <div className="form-group text-left">
            <button type="submit" className="btn btn-primary btn-lg">Save</button>
          </div>
        </form>

        <h4>Google</h4>
        <form className="form-settings">
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="input-proxy-1" defaultChecked={true} className="custom-control-input" />
              <label htmlFor="input-proxy-1" className="custom-control-label">Test 1</label>
            </div>
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="input-proxy-2" defaultChecked={true} className="custom-control-input" />
              <label htmlFor="input-proxy-2" className="custom-control-label">Test 2</label>
            </div>
          </div>
          <div className="form-group text-left">
            <button type="submit" className="btn btn-primary btn-lg">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
