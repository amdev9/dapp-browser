import * as React from "react"

interface SettingsPanelProps {
  items?: { [index: string]: SettingsPanelProps; },
  isOpen?: boolean,
  toggleStatusBar?: () => void,
  peersBarIsOpen?: boolean
}

interface SettingsPanelState {
  activeTab: string
}

export class SettingsPanel extends React.Component<SettingsPanelProps, SettingsPanelState> {
  constructor(props: SettingsPanelProps) {
    super(props);

    this.switchTab = this.switchTab.bind(this);
    this.state = { activeTab: 'general' } //@todo fix it to have a global state, dispatch action when switch tabs
  }

  private switchTab(tabName: string): void {
    this.setState({ activeTab: tabName });
  }

  public render() {
    const activeClass = ['active', 'show'];

    let generalClass = null;
    let networkClass = null;
    let accessClass = null;
    let devModeClass = null;

    if (this.state.activeTab === 'general') {
      generalClass = activeClass;
    } else if (this.state.activeTab === 'network') {
      networkClass = activeClass;
    } else if (this.state.activeTab === 'access') {
      accessClass = activeClass;
    } else {
      devModeClass = activeClass;
    }

    let { isOpen } = this.props;

    const props: any = {
      style: {
        display: isOpen ? "block" : "none"
      },
    };

    return (
      <div className="settingsbar" {...props}>
        <div className="navigate">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <button type="button" name="general" className={['btn', 'btn-link'].concat(generalClass).join(' ')} onClick={() => this.switchTab('general')}>General</button>
            </li>
            <li className="nav-item">
              <button type="button" name="access" className={['btn', 'btn-link'].concat(accessClass).join(' ')} onClick={() => this.switchTab('access')}>Access</button>
            </li>
            <li className="nav-item">
              <button type="button" name="network" className={['btn', 'btn-link'].concat(networkClass).join(' ')} onClick={() => this.switchTab('network')}>Network</button>
            </li>
            <li className="nav-item">
              <button type="button" name="devmode" className={['btn', 'btn-link'].concat(devModeClass).join(' ')} onClick={() => this.switchTab('devmode')}>Dev Mode</button>
            </li>
          </ul>
        </div>
        <div className="category">
          <div className="justify-content-center">
            <div className="col-lg-7">
              <div className="item" style={{ display: this.state.activeTab === "general" ? "block" : "none" }}>
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
              </div>

              <div className="item" style={{ display: this.state.activeTab === "access" ? "block" : "none" }}>
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
              </div>

              <div className="item" style={{ display: this.state.activeTab === 'network' ? "block" : "none" }}>
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
              </div>

              <div className="item" style={{ display: this.state.activeTab === "devmode" ? "block" : "none" }}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
