import React from 'react';
import { connect } from 'react-redux';

import { gridItems } from '../gridItemsData';
import { SelfiesSection } from '../components/SelfiesSection';
import { ALL_IMGS_LOADED } from '../constants';

let loadedImgCounter = 0;

export class SelfiesSectionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  // =============================================================================
  // - Invoked by the GridItem component upon image loading.
  // - When loadedImgCounter === total number of images the div can become visible. 
  // - During the lengthy grid-images load time I display a spinner.
  // - When all the images are loaded I dispatch ALL_IMGS_LOADED action that would turn
  //   the grid from invisible to visible (the spinner gets hidden here.)
  // - With pure Javascript I could simply use windows.onLoad. It doesn't work with React.
  // ============================================================================  
  onImgLoad() {
    loadedImgCounter++;
    if (loadedImgCounter === gridItems.data.length) {
      loadedImgCounter = 0;
      this.props.onAllImgsLoaded();
    }
  }

  // =============================================================================  
  // A few properties here are conditional:
  // The gridVisibility is initially 'hidden' then 'visible' (see explanation above). 
  // That will happen only upon page load. When filter is applied the grid stays 'visible'
  // =============================================================================  
  render() {
    let filteredGridItemsData = gridItems.data.filter((gridItem) => {
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
                      onImgLoad={this.onImgLoad} />
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
      return dispatch({
        type: ALL_IMGS_LOADED
      });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesSectionWrapper)