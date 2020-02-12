import React from 'react';
import { connect } from 'react-redux';

import { gridItemsData } from '../gridItemsData';
import { SelfiesSection } from '../components/SelfiesSection';
import { ALL_IMGS_LOADED } from '../constants';

let loadedImgCounter = 0;

export class SelfiesSectionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.imgLoadCallbackEventHandler = this.imgLoadCallbackEventHandler.bind(this);
  }

  // =============================================================================
  // Invoked by the GridItem component upon image loading.
  // When loadedImgCounter === total number of images the div can become visible. 
  // =============================================================================  
  imgLoadCallbackEventHandler() {
    loadedImgCounter++;
    if (loadedImgCounter === gridItemsData.length) {
      loadedImgCounter = 0;
      this.props.onAllImgsLoaded();
    }
  }

  // =============================================================================  
  // A few properties here are conditional:
  // - The section "blurring" effect is conditional based on the state.modalImgId value. 
  // - In addition to the grid I'll also render the modal componet ONLY if hte modalImgId is not ''
  //   This will happen if the image is clicked on in the GridItem component in which case
  //   the imgClickCallbackEventHandler() is invoked that changes the state.modalImgId value.
  // =============================================================================  
  render() {
    let filteredGridItemsData = gridItemsData.filter((gridItem) => {
      let boolean = gridItem.caption.toLowerCase().includes(this.props.filterString);
      return boolean;
    });

    let spinnerDisplay = this.props.gridVisibility === 'hidden' ? 'inline-block' : 'none';

    return (
      <SelfiesSection filteredGridItemsData={filteredGridItemsData}
                      spinnerDisplay={spinnerDisplay}
                      blurEffect={this.props.blurEffect} 
                      gridVisibility = { this.props.gridVisibility }                      
                      isModalOn={this.props.isModalOn}
                      imgLoadCallbackEventHandler={this.imgLoadCallbackEventHandler} />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    sortFilter: state.sortFilter,
    filterString: state.filterString
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAllImgsLoaded: () => {
      return dispatch({ type: ALL_IMGS_LOADED });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesSectionWrapper)