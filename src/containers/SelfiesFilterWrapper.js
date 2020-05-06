import React from 'react';
import { connect } from 'react-redux';
import { SelfiesFilter } from '../components/SelfiesFilter';

import { FILTER_CHANGED } from '../constants';

// =============================================================================
// - Upon having a new filter we need to render the entire SelfiesSection therefore
//   SelfiesSectionWrapper listens to changes of the filterString state.
// - When we dispatch FILTER_CHANGED action, the reducer will update the filterString value.
// - As a result SelfiesSectionWrapper will be rendered.
// =============================================================================
export class SelfiesFilterWrapper extends React.Component {
  searchChangeHandler = (event) => {
    console.log(event.target.value.toLowerCase())
  }

  render() {
    return ( <SelfiesFilter onFilterChange={this.props.onFilterChange} /> );
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterChange: (event) => {
      return dispatch({ 
        type: FILTER_CHANGED, 
        payload: event.target.value.toLowerCase() 
      });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesFilterWrapper);