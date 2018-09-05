import * as React from "react";
import {Props as MenuProps, slide as Menu} from "react-burger-menu";
import { IoIosDocument, IoMdFolderOpen, IoMdCloudUpload, IoMdMenu } from 'react-icons/io';
interface LoaderPanelProps {
  isOpen?: boolean,
  togglePanel?(openStatus: boolean): void
}
export class LoaderPanel extends React.Component<LoaderPanelProps> {
  constructor(props: LoaderPanelProps) {
    super(props)
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  private onDragOver(e: any): void {
    console.log('onDragOver1');
  }

  private onDrop(e: any): void {
    console.log('onDrop1');
  }

  render() {
    let { isOpen, togglePanel } = this.props;

    const menuProps: MenuProps = {
      outerContainerId: "root-container",
      pageWrapId: "content-wrap",
      customBurgerIcon: false,
      customCrossIcon: false,
      right: true,
      width: 300,
      isOpen: isOpen,
      onStateChange: (value) => {
        if (isOpen !== value.isOpen) {
          togglePanel(value.isOpen);
        }
      },
    }

    return (
      <Menu {...menuProps}>
        <div className="loader-popup">
          <ul className="nav nav-tabs nav-justified">
            <li className="nav-item"><a href="#downloads" className="nav-link" data-toggle="tab">Downloads</a></li>
            <li className="nav-item"><a href="#uploads" className="nav-link active" data-toggle="tab">Uploads</a></li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane" id="downloads">
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
                    <strong>Document downloaded.doc</strong>
                    <small>2 mb</small>
                  </div>
                </li>
              </ul>
            </div>

            <div className="tab-pane show active" id="uploads">
              <div className="dragzone"
                   onDragOver={(e)=>this.onDragOver(e)}
                   onDrop={(e)=>this.onDrop(e)}>
                <div className="message">
                  <IoMdCloudUpload />
                  <strong>Drag & drop</strong>
                  <span>Files Here to Upload</span>
                </div>
              </div>

              <div className="notifications-name">
                <span>Uploaded files</span>
              </div>

              <ul>
                <li className="row align-items-center complete">
                <div className="col-auto icon">
                  <IoIosDocument fontSize="35px" color="#A8B2BD"/>
                </div>

                <div className="col introtext">
                  <strong>item.name</strong>
                  <small>item.size</small>
                </div>

                <div className="col-auto action">
                  <div className="dropdown">
                    <span className="dropdown-target">
                      <IoMdMenu fontSize="35px" color="#A8B2BD" />
                    </span>

                    <div className="dropdown-menu align-right">
                      <div className="dropdown-point"><span>Open</span></div>
                      <div className="dropdown-point"><span>Delete</span></div>
                      <div className="dropdown-point"><span>Show in folder</span></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </Menu>
    )
  }
}
