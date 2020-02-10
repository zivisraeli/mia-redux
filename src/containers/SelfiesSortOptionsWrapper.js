import React from 'react';
import { connect } from 'react-redux';

import { setCookie } from '../Utils.js';
import { SORT_ORDER } from '../constants';
import { SelfiesSortOptions } from '../components/SelfiesSortOptions'

export class SelfiesSortOptionsWrapper extends React.Component {  
  render() {
    return (<SelfiesSortOptions sortFilter={this.props.sortFilter} 
                                            onSortChange={this.props.onSortChange} />);
  }
}

const mapStateToProps = (state) => {
  return {
    sortFilter: state.sortFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSortChange: (event) => {
      let selectedIndex = event.target.selectedIndex;
      let selectedOptionId = event.target[selectedIndex].id;
      setCookie('sort', selectedOptionId);
      return dispatch({ type: SORT_ORDER, payload: selectedOptionId });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesSortOptions);