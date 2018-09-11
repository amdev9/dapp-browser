import * as React from "react";
import Dropzone from 'react-dropzone';
import {Props as MenuProps, slide as Menu, State} from "react-burger-menu";
import { IoIosDocument, IoMdFolderOpen, IoMdCloudUpload, IoMdMenu } from 'react-icons/io';
interface LoaderPanelProps {
  isOpen?: boolean,
  togglePanel?(openStatus: boolean): void,
  isNotificationPanelOpen?: boolean,
  toggleNotificationPanel?(openStatus: boolean): void
}
interface LoaderPanelState {
  activeTab: string,
  uploads: File[],
  uploaded: File[]
}

// Links:
// https://alligator.io/react/react-dropzone/
// https://github.com/react-dropzone/react-dropzone
// https://react-dropzone.js.org/
export class LoaderPanel extends React.Component<LoaderPanelProps, LoaderPanelState> {
  constructor(props: LoaderPanelProps) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.state = {activeTab: 'uploads', uploads: [], uploaded: []}
  }

  private onDrop(uploads: File[]): void {
    let uploaded = [...this.state.uploaded, ...uploads].filter(
      (file, i, files) => files.findIndex(item => item.name === file.name) === i
    ); // only unique values
    this.setState({
      uploads,
      uploaded
    });
  }

  private switchTab(tabName: string): void {
    this.setState({activeTab: tabName});
  }

  render() {
    const activeClass = ['active', 'show'];

    let downloadClass = null;
    let uploadClass = null;
    if(this.state.activeTab === 'downloads') {
      downloadClass = activeClass;
    } else {
      uploadClass = activeClass;
    }

    let { isOpen, togglePanel, isNotificationPanelOpen, toggleNotificationPanel } = this.props;

    const menuProps: MenuProps = {
      outerContainerId: "root-container",
      pageWrapId: "content-wrap",
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen,
      onStateChange: (value) => {
        if (isOpen && isNotificationPanelOpen) {
          toggleNotificationPanel(false);
        }
        if (isOpen !== value.isOpen) {
          togglePanel(value.isOpen);
        }
      },
    };

    return (
      <Menu {...menuProps}>
        <div className="loader-popup">
          <ul className="nav nav-tabs nav-justified">
            <li className="nav-item"><a href="#downloads" className={['nav-link'].concat(downloadClass).join(' ')} data-toggle="tab" onClick={()=>this.switchTab('downloads')}>Downloads</a></li>
            <li className="nav-item"><a href="#uploads" className={['nav-link'].concat(uploadClass).join(' ')} data-toggle="tab" onClick={()=>this.switchTab('uploads')}>Uploads</a></li>
          </ul>

          <div className="tab-content">
            <div className={['tab-pane'].concat(downloadClass).join(' ')} id="downloads">
              <ul>
                <li className="row align-items-center">
                  <div className="col-auto icon">
                    <IoIosDocument fontSize="35px" color="#A8B2BD"/>
                  </div>

                  <div className="col introtext">
                    <strong>Document.doc</strong>
                    <small>2 mb</small>
                  </div>
                </li>

                <li className="row align-items-center complete">
                  <div className="col-auto icon">
                    <IoMdFolderOpen fontSize="35px" color="#A8B2BD" />
                  </div>

                  <div className="col introtext">
                    <strong>Document downl.doc</strong>
                    <small>2 mb</small>
                  </div>
                </li>
              </ul>
            </div>

            <div className={['tab-pane'].concat(uploadClass).join(' ')} id="uploads">

              <Dropzone className="dragzone" activeClassName="dragover" onDrop={this.onDrop}>
                <div className="message">
                  <IoMdCloudUpload />
                  <strong>Drag & drop</strong>
                  <span>Files Here to Upload</span>
                </div>
              </Dropzone>

              <ul>
                {
                  this.state.uploads.map(f => <li className="row align-items-center complete no-bg" key={f.name}>
                    <div className="col-auto icon">
                      <svg className="out" height="0" width="50">
                        <circle cx="25" cy="9" r="22" stroke="#F2F3F6" strokeWidth="3" fill="none"></circle>
                      </svg>
                      <svg className="over" height="70" width="50">
                        <circle  cx="25" cy="37" r="22" stroke="#4686FF" strokeWidth="3" fill="none" strokeDasharray="138,138"></circle>
                      </svg>
                      <small className="total">100%</small>
                    </div>
                    <div className="col introtext">
                      <strong>{f.name}</strong>
                      <small>{f.size}</small>
                    </div>
                  </li>
                  )
                }
              </ul>

              <div className="uploaded-name">
                <span>Uploaded files</span>
              </div>

              <ul>
                {
                  this.state.uploaded.map(f => <li className="row align-items-center complete" key={f.name}>
                      <div className="col-auto icon">
                        <IoIosDocument fontSize="35px" color="#A8B2BD"/>
                      </div>
                      <div className="col introtext">
                        <strong>{f.name}</strong>
                        <small>{f.size}</small>
                      </div>
                  </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </Menu>
    )
  }
}
