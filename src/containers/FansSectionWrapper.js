import React from 'react';
import { connect } from 'react-redux';
import { DOG_BREED_TOGGLED } from '../constants';
import { FansSection } from '../components/FansSection';

export class FansSectionWrapper extends React.Component {
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
      return dispatch({ 
        type: DOG_BREED_TOGGLED 
      });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(FansSectionWrapper);