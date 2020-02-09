import React from 'react';
import { connect } from 'react-redux';

import { gridItemsData } from './gridItemsData';
import { getCookie, setCookie } from './Utils.js';
import heartOutline from './images/heart-outline.png';
import heartFull from './images/heart-full.png';
import { IMG_CLICK } from './constants';

export class GridItem extends React.Component {
  constructor(props) {
    super(props);

    // For that component I'm using React style state since this particular items know to re-render
    // itself upon clicking on the heart image (liking).
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
    let theHeart = heartOutline;
    let theHeartClass = 'heart';
    if (this.state.isLiked) {
      theHeart = heartFull;
      theHeartClass = 'heart animatedHeartBeat';
    }

    return (
      <figure id={this.props.id} className="grid-item">
         <img src={this.props.src} 
              className="grid-image"
              alt={this.props.id}
              onLoad={this.props.imgLoadCallbackEventHandler} 
              onClick={this.props.onImgClick} />
         <figcaption className="figcaption">
                     {this.props.caption}&nbsp;|&nbsp;
           <span id="like-count-span">{this.state.likeCount}</span>&nbsp;
           <img src={require("./images/heart-likes.png")} 
                className="heart-likes-icon" 
                alt="heart-likes"/>'s&nbsp;|&nbsp;
           {this.props.date}&nbsp;
         </figcaption>
         <img src={theHeart} 
              className={theHeartClass} 
              alt="heart-like" 
              onClick={this.heartClickEventHandler} />
       </figure>
    );
  }
}

const mapStateToProps = function(state) {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onImgClick: (event) => {
      let itemId = event.target.parentElement.id;
      return dispatch({type: IMG_CLICK, payload: itemId});
    }
  }
}

export default connect(mapStateToProps, 
                       mapDispatchToProps)(GridItem);