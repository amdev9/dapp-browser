import * as React from 'react';
import Dropzone from 'react-dropzone';
import * as uuid from 'uuid/v4';
import CircularProgressbar from 'react-circular-progressbar';
import { Props as MenuProps, slide as Menu, State } from 'react-burger-menu';
import { IoIosDocument, IoMdFolderOpen, IoMdCloudUpload, IoMdMenu } from 'react-icons/io';
import { component as IpfsStorage } from '../../modules/IpfsStorage';

import './LoaderPanelStyles.sass';

interface LoaderPanelProps {
  isOpen: boolean;

  togglePanel(): void;
}

interface UploadedFileEntry {
  oid: string;
  file: File;
  progress: number;
  error?: any;
}

interface LoaderPanelState {
  activeTab: string;
  uploads: UploadedFileEntry[];
  uploaded: File[];
}

export class LoaderPanel extends React.Component<LoaderPanelProps, LoaderPanelState> {
  constructor(props: LoaderPanelProps) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.state = { activeTab: 'uploads', uploads: [], uploaded: [] };
  }

  createFileEntry(file: File): UploadedFileEntry {
    return {
      file,
      oid: uuid(),
      progress: 0,
    };
  }

  updateProgressFileEntry(oid: string, progress: number): void {
    if (!isNaN(progress)) {
      const newUploadsArray = this.state.uploads.map((entry) => {
        if (entry.oid === oid) {
          return {
            ...entry,
            progress,
          };
        }

        return entry;
      });

      this.setState({ uploads: newUploadsArray });
    }
  }

  removeFileEntry(oid: string) {
    const newUploads: UploadedFileEntry[] = [];

    this.state.uploads.forEach((entry) => {
      if (entry.oid !== oid) {
        newUploads.push(entry);
      }
    });

    this.setState({ uploads: newUploads });
  }

  private onDrop(uploads: File[]): void {
    console.log('onDrop', uploads)
    uploads.forEach(async (file) => {
      const fileEntry = this.createFileEntry(file);

      this.setState({ uploads: [...this.state.uploads, fileEntry] });

      try {
        await IpfsStorage.uploadFile(file.path, (progress) => this.updateProgressFileEntry(fileEntry.oid, progress))
        this.setState({ uploaded: [...this.state.uploaded, file] });
      } catch (err) {
        console.log('Upload file error:', err)
      }

      this.removeFileEntry(fileEntry.oid);
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
      outerContainerId: 'root-container',
      pageWrapId: 'content-wrap',
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen,
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
                  this.state.uploads.map((f, i) => (
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
                          <small>{f.file.size}</small>
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
                  this.state.uploaded.map((f, i) => (
                    <li className="row align-items-center complete nowrap" key={i}>
                      <div className="col">
                        <div className="icon">
                          <IoIosDocument fontSize="35px" color="#A8B2BD"/>
                        </div>
                      </div>
                      <div className="col introtext">
                        <strong>{f.name}</strong>
                        <small>{f.size}</small>
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
