import { Field, reduxForm } from 'redux-form';
import * as React from 'react';
import * as constants from "../../redux/constants";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({

})

class RoomsSearch extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={}>
          <Field
            name="searchRoom"
            type="text"
            className="mainFormInput"
            component="input"
            placeholder="Enter room name..."
          />
        </form>
      </div>
    )
  }
}

const m: any = RoomsSearch;
const form: any = reduxForm({ form: constants.CHAT_PAGE_ROOMS_SEARCH_FORM })(m);
export default connect(mapStateToProps, mapDispatchToProps)(form);
