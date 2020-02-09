import React from 'react';

import SelfiesHeader from './SelfiesHeader';
import SelfiesSection from './SelfiesSection';
import Footer from './Footer';
import { gridItemsData } from './gridItemsData';
import { getCookie } from './Utils.js';
import { connect } from 'react-redux';
import { setCookie } from './Utils.js';
import { SORT_ORDER, ALL_IMGS_LOADED } from './constants';

export class Selfies extends React.Component {
  // =============================================================================
  // The component needs to run the following 2 tasks before rendering:
  // 1. Read the cookie to get the liked images.
  // 2. Read the cookie to get the sort order. 
  // =============================================================================
  constructor(props) {
    super(props);
    this.readLikesCookie();
  }

  // =============================================================================
  // readLikesCookie would read 'likes' cookie and update the state.gridItems array accordingly. 
  // It would also increment the likeCount by one. 
  // =============================================================================
  readLikesCookie = () => {
    let likeArray = [];
    let likeCookie = getCookie('likes');
    if (likeCookie != null) {
      likeArray = JSON.parse(likeCookie);
    }
    
    likeArray.forEach((id) => {
      let gridElem = gridItemsData.find((elem) => {
        return elem.id === id;
      });
      if (gridElem != null) {
        gridElem.isLiked = true;
        gridElem.likeCount++;
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <main id="grid-section">
          <SelfiesHeader sortOptionsSelectValue={this.props.sortFilter} 
                         onSortChange={this.props.onSortChange} />
          <SelfiesSection blurEffect={this.props.blurEffect} 
                          gridVisibility={this.props.gridVisibility}
                          onAllImgsLoaded={this.props.onAllImgsLoaded}
                          isModalOn={this.props.isModalOn} />
        </main>
        <Footer />        
      </React.Fragment>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    sortFilter: state.sortFilter,
    blurEffect: state.blurEffect,
    gridVisibility: state.gridVisibility,
    isModalOn: state.isModalOn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSortChange: (event) => {
      let selectedIndex = event.target.selectedIndex;
      let selectedOptionId = event.target[selectedIndex].id;
      setCookie('sort', selectedOptionId);
      return dispatch({type: SORT_ORDER, payload: selectedOptionId});
    },   
    onAllImgsLoaded: () => {
      return dispatch({type: ALL_IMGS_LOADED});
    }
  }
}

export default connect(mapStateToProps, 
                       mapDispatchToProps)(Selfies);