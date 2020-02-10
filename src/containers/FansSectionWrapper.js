import React from 'react';
import { connect } from 'react-redux';
import { DOG_BREED_TOGGLED } from '../constants';
import { FansSection } from '../components/FansSection';

export class FansSectionWrapper extends React.Component {
  // =============================================================================
  // - The default cheched value in react is, well defaultChecked...
  // - The 'for' attribute should be named 'htmlFor' in Reac.
  // - Since dogOwnerEventHandler is a callback function and the 'this' element is referenced, 
  //   it must be declared as an arrow-function rather then regular/expression-function 
  //   (in which case, binding would be necessary).
  // =============================================================================
  render() {
    return (<FansSection dogBreedEnabled={this.props.dogBreedEnabled} 
  	                     onDogBreedToggled={this.props.onDogBreedToggled} />);
  }
}

const mapStateToProps = function(state) {
  return { dogBreedEnabled: state.dogBreedEnabled }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDogBreedToggled: () => {
      return dispatch({ type: DOG_BREED_TOGGLED });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(FansSectionWrapper);