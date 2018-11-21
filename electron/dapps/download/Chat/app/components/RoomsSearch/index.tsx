import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import * as React from 'react';
import { connect } from 'react-redux';

import * as constants from '../../redux/constants';
import * as actions from '../../redux/actions';
import* as thunks from '../../redux/thunks';


import './styles.css';

const SEARCH_ROOM_FIELD_NAME = 'searchRoom';

interface DispatchProps {
  resetFilterRoomList: () => void;
  onSubmit: (values: any) => void;
  filterRoomList: (searchString: string) => void;
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  onSubmit: (values) => {
    const searchString = values[SEARCH_ROOM_FIELD_NAME];
    dispatch(thunks.filterRoomListThunk(searchString));
  },
  resetFilterRoomList: () => dispatch(actions.resetFilterRoomList()),
  filterRoomList: (searchString: string) => dispatch(thunks.filterRoomListThunk(searchString)),
});

type FormProps<P> = P & InjectedFormProps<{}, P>;

class RoomsSearch extends React.Component<FormProps<DispatchProps>> {
  render() {
    const { resetFilterRoomList, handleSubmit, dirty, reset } = this.props;

    console.log('RoomsSearch', this.props);
    return (
      <form
        onSubmit={handleSubmit}
        className="roomsSearchWrapper"
      >
        <Field
          name={SEARCH_ROOM_FIELD_NAME}
          type="text"
          className="roomsSearchInput"
          component="input"
          placeholder="Enter room name..."
        />
        {dirty ? (
          <span
            className="roomSearchClear"
            onClick={(e) => {
              e.stopPropagation();
              reset();
              resetFilterRoomList();
            }}>X</span>
        ) : null}
      </form>
    );
  }
}

const form: any = reduxForm<{}, DispatchProps>({
  form: constants.FORM_CHAT_PAGE_ROOMS_SEARCH,
  onChange: (values, dispatch, props) => {
    props.onSubmit(values);
  },
})(RoomsSearch);
export default connect(null, mapDispatchToProps)(form);
