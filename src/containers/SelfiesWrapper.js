import React from 'react';
import { connect } from 'react-redux';

import { Selfies } from '../components/Selfies'
import { gridItemsData } from '../gridItemsData';
import { getCookie } from '../Utils.js';

export class SelfiesWrapper extends React.Component {
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
      <Selfies blurEffect={this.props.blurEffect} 
                             gridVisibility={this.props.gridVisibility}
                             isModalOn={this.props.isModalOn} />
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

export default connect(mapStateToProps)(Selfies);