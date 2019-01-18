import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IState } from '../../redux/reducers/state';
import * as LoaderActions from '../../redux/actions/loader';
import {
  actions as IpfsStorageActions,
  models as IpfsStorageModels,
  selectors as IpfsStorageSelectors,
} from '../../modules/IpfsStorage';

const loaderIcon = require('../../assets/icons/cloud.svg');
const loaderIconActive = require('../../assets/icons/cloud_active.svg');

interface DispatchProps {
  togglePanel(): void;
}

interface StateProps {
  isOpen: boolean;
  uploadedCounter: number;
  downloadedCounter: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IState>) => bindActionCreators({
  togglePanel: LoaderActions.toggle,
}, dispatch);

const mapStateToProps = (state: IState) => ({
  isOpen: state.isOpen.loader,
  uploadedCounter: IpfsStorageSelectors.getUnshownUploadedFilesCounter(state),
  downloadedCounter: IpfsStorageSelectors.getUnshownDownloadedFilesCounter(state),
});

class DownloadWidget extends React.Component<StateProps & DispatchProps> {
  renderNotificationCounter() {
    const { uploadedCounter, downloadedCounter } = this.props;
    const filesCounter = uploadedCounter + downloadedCounter;
    console.log('download selector', filesCounter);
    if (!filesCounter) {
      return null;
    }

    return (
      <div className="download-counter">
        {filesCounter}
      </div>
    );
  }

  public render() {
    const { togglePanel, isOpen } = this.props;
    const icon = isOpen ? loaderIconActive : loaderIcon;
    return (
      <div className="app-loader" onClick={() => togglePanel()}>
        <img className="icon" src={icon}/>
        {this.renderNotificationCounter()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadWidget);
