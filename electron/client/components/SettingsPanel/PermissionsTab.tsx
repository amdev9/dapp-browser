import * as React from 'react';

export class PermissionsTab extends React.Component {

  public render() {
    return (
      <div>
        <h4>Game</h4>
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
    )
  }
}
