import React from 'react';
import { connect } from 'react-redux';

import { FILTER_CHANGED } from '../constants';

export class SelfiesFilterWrapper extends React.Component {
  searchChangeHandler = (event) => {
    console.log(event.target.value.toLowerCase())
  }

  render() {
    return ( <input type="text"
                    onChange={this.props.onFilterChange} />);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterChange: (event) => {
      return dispatch({ type: FILTER_CHANGED, payload: event.target.value.toLowerCase() });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesFilterWrapper);