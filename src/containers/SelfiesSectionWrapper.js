import React from 'react';
import { connect } from 'react-redux';

import { gridItems } from '../gridItemsData';
import { SelfiesSection } from '../components/SelfiesSection';
import { ALL_IMGS_LOADED } from '../constants';

export class SelfiesSectionWrapper extends React.Component {

  constructor(props) {
    super(props);

    // =============================================================================
    // Intersection Observer API.
    // To implement this functionality I'm taking these steps:
    // 1. this.imgRefs is an array of refs that represents all images. 
    //    I need these handlers to make them observe scrolling events.
    // 2. this.observer has 2 parameters:
    //    - the callback function that filters the images
    //    - the threshold parameters that triggers events when an image is 0.9 visible.
    // 3. assocaiting the.imgRefs individual entries with the img is done in SelfiesGridItem
    //    ref={props.imgRef}
    // 4. instructing the imgRefs to observer scrolling events is done only after the 
    //    component is mount in componentDidMount. 
    // =============================================================================
    this.imgRefs = gridItems.data.map(() => {
      return React.createRef();
    });

    this.observer = new IntersectionObserver(function(entries) {
      for (const entry of entries) {
        if (entry['isIntersecting'] === true) {
          if (entry['intersectionRatio'] >= 0.9) {
            entry.target.style.filter = "none";
          } else if (entry['intersectionRatio'] < 0.9) {
            entry.target.style.filter = "blur(4px) grayscale(100%)";
          }
          console.log(entry);
        }
      }
    }, { threshold: [0, 0.9] });

  }

  // =============================================================================
  // - During the lengthy grid-images load time I display a spinner.
  // - When all the images are loaded I dispatch ALL_IMGS_LOADED action that would turn
  //   the grid from invisible to visible (the spinner gets hidden here.)
  // =============================================================================
  componentDidMount() {
    var arrOfPromises = [];

    gridItems.data.forEach((gridItem) => {
      arrOfPromises.push(
        new Promise((resolve, reject) => {
          let img = new Image();
          img.src = gridItem.src;
          img.addEventListener('load', function() {
            resolve(gridItem.id);
          });
        })
      )
    });

    // When all images are loaded then only call onAllImgsLoaded that would make the grid visible.
    Promise.all(arrOfPromises).then(values => {
      this.props.onAllImgsLoaded();
    });

    // make the images observe scrolling events. 
    for (const imgRef of this.imgRefs) {
      try {
        this.observer.observe(imgRef.current);
      } catch (err) {
        console.log(err);
      }
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
                      gridVisibility = {this.props.gridVisibility}                      
                      isModalOn={this.props.isModalOn}
                      imgRefs={this.imgRefs} />
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