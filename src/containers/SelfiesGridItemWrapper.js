import React from 'react';
import { connect } from 'react-redux';

import { gridItemsData } from '../gridItemsData';
import { getCookie, setCookie } from '../Utils.js';
import { IMG_CLICK } from '../constants';
import { SelfiesGridItem } from '../components/SelfiesGridItem';
import heartOutline from '../images/heart-outline.png';
import heartFull from '../images/heart-full.png';


export class SelfiesGridItemWrapper extends React.Component {
  constructor(props) {
    super(props);

    // =============================================================================
    // For that component only I keep using local component state since this particular 
    // item knows to re-render itself upon clicking on the heart image (liking).
    // =============================================================================
    this.state = {
      isLiked: this.props.isLiked,
      likeCount: this.props.likeCount
    };
  }

  // =============================================================================
  // The heart image doesn't carry an id, but its parent does.
  // The id is used to find the actual grid-item element from the list.
  // Once the grid-item element if found, we can manipulate its data in toggleLikeCount()
  // The method would:
  //   - toggle the isLiked value.
  //   - increment/decrement the likeCount.
  //   - set the states. during rendering the state values r used to determine 
  //     the proper icon and count number. 
  //   - update the likes cookie.
  // =============================================================================
  heartClickEventHandler = (event) => {
    let itemId = event.target.parentElement.id;
    let gridItem = gridItemsData.find((gridItem) => {
      return gridItem.id === itemId;
    });

    if (gridItem.isLiked) {
      gridItem.isLiked = false;
      gridItem.likeCount--;
    } else {
      gridItem.isLiked = true;
      gridItem.likeCount++;
    }
    this.setState({
      isLiked: gridItem.isLiked,
      likeCount: gridItem.likeCount
    });

    updateLikesCookie();

    // =============================================================================
    // - get 'likes' cookie (a string-ed array)
    // - if not empty, JSON-parse it to convert the string to an array. 
    // - push or remove (filter) an element based on gridItem.isLiked value.
    // - JSON-stringify it to convert the array to a string. 
    // - set the cookie with the new string.
    // =============================================================================
    function updateLikesCookie() {
      let likeArray = [];
      let likeCookie = getCookie('likes');
      if (likeCookie != null) {
        likeArray = JSON.parse(likeCookie);
      }
      if (gridItem.isLiked) {
        likeArray.push(gridItem.id);
      } else {
        let filteredArray = likeArray.filter((id) => {
          return id !== gridItem.id;
        });
        likeArray = filteredArray;
      }

      likeCookie = JSON.stringify(likeArray);
      setCookie('likes', likeCookie);
    }
  }

  render() {
    let theHeartImg = heartOutline;
    let theHeartImgClass = 'heart';
    if (this.state.isLiked) {
      theHeartImg = heartFull;
      theHeartImgClass = 'heart animatedHeartBeat';
    }

    return (
      <SelfiesGridItem id={this.props.id} 
                       src={this.props.src}
                       caption={this.props.caption}
                       date={this.props.date}
                       isLiked={this.state.isLiked}
                       likeCount={this.state.likeCount}
                       imgLoadCallbackEventHandler={this.props.imgLoadCallbackEventHandler}
                       heartClickEventHandler={this.heartClickEventHandler} 
                       onImgClick={this.props.onImgClick}
                       onDragStart={this.props.onDragStart}
                       theHeartImg={theHeartImg}
                       theHeartImgClass={theHeartImgClass}
                       key={this.props.id}/>);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onImgClick: (event) => {
      let itemId = event.target.parentElement.id;
      return dispatch({ type: IMG_CLICK, payload: itemId });
    },
    onDragStart: (event) => {
      let draggedImgId = event.target.alt;
      event.dataTransfer.setData('draggedImgId', draggedImgId);
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesGridItemWrapper);