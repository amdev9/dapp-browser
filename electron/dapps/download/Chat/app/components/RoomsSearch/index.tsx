import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import * as React from 'react';
import { connect } from 'react-redux';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
import * as thunks from '../../redux/thunks';

import './styles.css';

interface DispatchProps {
  resetFilterRoomList: () => void;
  deselectRoom: () => void;
  onSubmit: (values: any) => void;
  filterRoomList: (searchString: string) => void;
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  onSubmit: (values) => {
    const searchString = values[constants.FIELD_FORM_CHAT_ROOMS_SEARCH_STRING];
    dispatch(thunks.filterRoomListThunk(searchString));
  },
  resetFilterRoomList: () => dispatch(actions.resetFilterRoomList()),
  filterRoomList: (searchString: string) => dispatch(thunks.filterRoomListThunk(searchString)),
  deselectRoom: () => dispatch(actions.deselectRoom()),
});

type FormProps<P> = P & InjectedFormProps<{}, P>;

class RoomsSearch extends React.Component<FormProps<DispatchProps>> {
  render() {
    const { resetFilterRoomList, handleSubmit, dirty, reset } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="roomsSearchWrapper"
      >
        <Field
          name={constants.FIELD_FORM_CHAT_ROOMS_SEARCH_STRING}
          type="text"
          className="roomsSearchInput"
          component="input"
          placeholder="Search room name..."
        />
        {dirty ? (
          <span
            className="roomSearchClear"
            aria-hidden="true"
            onClick={(e) => {
              e.stopPropagation();
              reset();
              resetFilterRoomList();
            }}>
            &times;
          </span>
        ) : null}
        <div className="input-group-append">
          <button
            className="roomSearchAddRoomButton input-group-text btn btn-outline-secondary"
            type="button"
            onClick={() => this.props.deselectRoom()}
          >
            +
          </button>
        </div>
      </form>
    );
  }
}

const form: any = reduxForm<{}, DispatchProps>({
  form: constants.FORM_CHAT_ROOMS_SEARCH,
  onChange: (values, dispatch, props) => {
    props.onSubmit(values);
  },
})(RoomsSearch);
export default connect(null, mapDispatchToProps)(form);
