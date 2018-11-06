import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { PermissionsTab } from './PermissionsTab';
import { Permission, PermissionsPanel } from '../../redux/reducers/state';
import { DApp } from '../../redux/model';

interface SettingsPanelProps {
  items?: { [index: string]: SettingsPanelProps; };
  // isOpen?: boolean;
  toggleStatusBar?: () => void;
  peersBarIsOpen?: boolean;
  togglePermission: (permissionName: Permission, checked: boolean, appName: string) => void;
  grantPermissions: (appName: string) => void;
  permissions: PermissionsPanel;
  feedItems: DApp[];
}

interface SettingsPanelState {
  activeTab: string;
}

export class SettingsPanel extends React.Component<SettingsPanelProps, SettingsPanelState> {
  constructor(props: SettingsPanelProps) {
    super(props);

    this.switchTab = this.switchTab.bind(this);
    this.state = { activeTab: 'general' }; // @todo fix it to have a global state, dispatch action when switch tabs
  }

  private switchTab(tabName: string): void {
    this.setState({ activeTab: tabName });
  }

  public render() {
    // let { isOpen } = this.props;

    // const props: any = {
    //   style: {
    //     display: isOpen ? "block" : "none"
    //   },
    // };

    return (
      <div className="settingsbar" /*{...props}*/>
        <Tabs>
          <TabList>
            <Tab>General</Tab>
            <Tab>Access</Tab>
            <Tab>Network</Tab>
            <Tab>Dev Mode</Tab>
            <Tab>Permissions</Tab>
          </TabList>
          <TabPanel>
            <form className="form-settings">
              <div className="form-group"><label>Language</label>
                {/*<select name="language" style={{display: "none"}}>*/}
                {/*<option value="en">English</option>*/}
                {/*<option value="ru">Russian</option>*/}
                {/*</select>*/}
                <div className="nice-select" tabIndex={0}><span className="current">English</span>
                  <ul className="list">
                    <li data-value="en" className="option selected">English</li>
                    <li data-value="ru" className="option">Russian</li>
                  </ul>
                </div>
              </div>
              <div className="form-group"><label>Preferred unit of account</label>
                {/*<select name="units" style={{display: "none"}}>*/}
                {/*<option value="bts">BTS</option>*/}
                {/*<option value="usd">USD</option>*/}
                {/*<option value="rub">RUB</option>*/}
                {/*</select>*/}
                <div className="nice-select" tabIndex={0}><span className="current">BTS</span>
                  <ul className="list">
                    <li data-value="bts" className="option selected">BTS</li>
                    <li data-value="usd" className="option">USD</li>
                    <li data-value="rub" className="option">RUB</li>
                  </ul>
                </div>
              </div>
              <div className="form-group"><label>Wallet auto-lock time (second, 0 to disable)</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group text-right">
                <button type="reset" className="btn btn-light btn-lg">Reset settings</button>
                <button type="submit" className="btn btn-primary btn-lg">Save</button>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
            <form className="form-settings">
              <div className="form-group"><label className="form-title">Active node</label>
                <div className="row">
                  <div className="col-xl-6 pr-2">
                    <div className="card">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">Berlin, Germany</dt>
                            <dd className="col-auto">1024ms</dd>
                          </dl>
                        </li>
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">
                              <small>127.0.0.1:1024</small>
                            </dt>
                            <dd className="col-auto">
                              <small>mainnet</small>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group"><label className="form-title">Available nodes</label>
                <div className="row">
                  <div className="col-xl-6 pr-2">
                    <button type="button" className="btn btn-primary btn-lg btn-block">Choose closest
                      automatically
                    </button>
                    <div className="card mt-3">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">Dallas, USA</dt>
                            <dd className="col-auto">1024ms</dd>
                          </dl>
                        </li>
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">
                              <small>127.0.0.1:1024</small>
                            </dt>
                            <dd className="col-auto">
                              <small>mainnet</small>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                    <div className="card mt-3 mb-3">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">Munich, Germany</dt>
                            <dd className="col-auto">1024ms</dd>
                          </dl>
                        </li>
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">
                              <small>127.0.0.1:1024</small>
                            </dt>
                            <dd className="col-auto">
                              <small>mainnet</small>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 pl-2">
                    <button type="button" className="btn btn-light btn-lg btn-block">Add new node</button>
                    <div className="card mt-3">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">Nuremberg, Germany</dt>
                            <dd className="col-auto">1024ms</dd>
                          </dl>
                        </li>
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">
                              <small>127.0.0.1:1024</small>
                            </dt>
                            <dd className="col-auto">
                              <small>mainnet</small>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                    <div className="card mt-3 mb-3 disabled">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">Dallas, USA</dt>
                            <dd className="col-auto disabled">—</dd>
                          </dl>
                        </li>
                        <li className="list-group-item">
                          <dl className="row align-items-center">
                            <dt className="col">
                              <small>127.0.0.1:1024</small>
                            </dt>
                            <dd className="col-auto">
                              <small>mainnet</small>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </TabPanel>

          <TabPanel>
            <form className="form-settings">
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="hidden" name="proxy" value="false" />
                  <input type="checkbox" name="proxy" value="true" id="input-proxy" className="custom-control-input" />
                  <label htmlFor="input-proxy" className="custom-control-label">Use socks proxy</label>
                </div>
              </div>
              <div className="form-group">
                <label>Host</label>
                <input type="text" name="host" className="form-control" />
              </div>
              <div className="form-group">
                <label>Port</label>
                <input type="text" name="port" className="form-control" />
              </div>
              <div className="form-group">
                <label>Public Key</label>
                <input type="text" name="public" className="form-control" />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input type="radio" id="radio-socks-3" name="socks" value="3" className="custom-control-input" />
                      <label htmlFor="radio-socks-3" className="custom-control-label">Socks 3</label>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input type="radio" id="radio-socks-4" name="socks" value="4" className="custom-control-input" />
                      <label htmlFor="radio-socks-4" className="custom-control-label">Socks 4</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group text-right">
                <button type="button" className="btn btn-light btn-lg">Cancel</button>
                <button type="submit" className="btn btn-primary btn-lg">Save</button>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
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
            </form>
          </TabPanel>
          <TabPanel>
            <PermissionsTab
              togglePermission={this.props.togglePermission}
              grantPermissions={this.props.grantPermissions}
              permissions={this.props.permissions}
              feedItems={this.props.feedItems}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
