import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import * as React from 'react';
import * as constants from "../../redux/constants/index";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

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
    dispatch(actions.filterRoomListThunk(searchString));
  },
  resetFilterRoomList: () => dispatch(actions.resetFilterRoomList()),
  filterRoomList: (searchString: string) => dispatch(actions.filterRoomListThunk(searchString)),
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
  form: constants.CHAT_PAGE_ROOMS_SEARCH_FORM,
  onChange: (values, dispatch, props) => {
    props.onSubmit(values);
  },
})(RoomsSearch);
export default connect(null, mapDispatchToProps)(form);
