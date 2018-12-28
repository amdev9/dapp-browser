import * as React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as uuid from 'uuid/v4';
import CircularProgressbar from 'react-circular-progressbar';
import { Props as MenuProps, slide as Menu, State } from 'react-burger-menu';
import { IoIosDocument, IoMdFolderOpen, IoMdCloudUpload, IoMdMenu } from 'react-icons/io';
import * as filesize from 'filesize';

import {
  component as IpfsStorage,
  models as IpfsStorageModels,
} from '../../modules/IpfsStorage';

import './LoaderPanelStyles.sass';
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../../redux/reducers/state';
import * as LoaderActions from '../../redux/actions/loader';

interface LoaderPanelState {
  activeTab: string;
}

interface DispatchProps {
  togglePanel(): void;
}

interface StateProps {
  uploads: IpfsStorageModels.UploadsFileEntry[];
  uploaded: IpfsStorageModels.UploadedFileEntry[];
  isOpen: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch<IState>): DispatchProps => bindActionCreators({
  togglePanel: LoaderActions.toggle,
}, dispatch);

const mapStateToProps = (state: IState): StateProps => ({
  uploads: state.ipfsStorage.uploads,
  uploaded: state.ipfsStorage.uploaded,
  isOpen: state.isOpen.loader,

});

class LoaderPanel extends React.Component< StateProps & DispatchProps, LoaderPanelState> {
  constructor(props: StateProps & DispatchProps) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.state = { activeTab: 'uploads' };
  }

  private onDrop(uploads: File[]): void {
    uploads.forEach(async (file) => {
      try {
        await IpfsStorage.uploadFile(file.path);
      } catch (err) {
        console.log('Upload file error:', err);
      }
    });
  }

  private switchTab(tabName: string): void {
    this.setState({ activeTab: tabName });
  }

  render() {
    const activeClass = ['active', 'show'];

    let downloadClass = null;
    let uploadClass = null;
    if (this.state.activeTab === 'downloads') {
      downloadClass = activeClass;
    } else {
      uploadClass = activeClass;
    }

    const { isOpen, togglePanel } = this.props;

    const menuProps: MenuProps = {
      isOpen,
      outerContainerId: 'root-container',
      pageWrapId: 'content-wrap',
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      onStateChange: (value) => {
        if (isOpen !== value.isOpen) {
          togglePanel();
        }
      },
    };

    return (
      <Menu {...menuProps}>
        <div className="loader-popup">
          <ul className="nav nav-tabs nav-justified">
            <li className="nav-item"><a href="#downloads" className={['nav-link'].concat(downloadClass).join(' ')}
                                        data-toggle="tab" onClick={() => this.switchTab('downloads')}>Downloads</a></li>
            <li className="nav-item"><a href="#uploads" className={['nav-link'].concat(uploadClass).join(' ')}
                                        data-toggle="tab" onClick={() => this.switchTab('uploads')}>Uploads</a></li>
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
                    <IoMdFolderOpen fontSize="35px" color="#A8B2BD"/>
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
                  <IoMdCloudUpload/>
                  <strong>Drag & drop</strong>
                  <span>Files Here to Upload</span>
                </div>
              </Dropzone>

              <ul>
                {
                  this.props.uploads.map((f, i) => (
                      <li className="row align-items-center complete no-bg nowrap" key={i}>
                        <div className="col">
                          <div className="icon">
                            <CircularProgressbar
                              percentage={f.progress}
                              styles={{
                                path: { stroke: `rgba(70, 134, 255, ${f.progress / 100})` },
                              }}
                            />
                            <small className="total">{Math.round(f.progress) || 0}%</small>
                          </div>
                        </div>
                        <div className="col introtext">
                          <strong>{f.file.name}</strong>
                          <small>{filesize(f.file.size)}</small>
                        </div>
                      </li>
                    ),
                  )
                }
              </ul>

              <div className="uploaded-name">
                <span>Uploaded files</span>
              </div>

              <ul>
                {
                  this.props.uploaded.map((f, i) => (
                    <li className="row align-items-center complete nowrap" key={i}>
                      <div className="col">
                        <div className="icon">
                          <IoIosDocument fontSize="35px" color="#A8B2BD"/>
                        </div>
                      </div>
                      <div className="col introtext">
                        <strong>{f.file.name}</strong>
                        <small>{filesize(f.file.size)}</small>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(LoaderPanel);
