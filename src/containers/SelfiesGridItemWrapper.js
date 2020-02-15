import React from 'react';
import { connect } from 'react-redux';

import { gridItems } from '../gridItemsData';
import { getCookie, setCookie } from '../Utils.js';
import { IMG_CLICK, IMG_TOUCH_END } from '../constants';
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
  onHeartClick = (event) => {
    let itemId = event.target.parentElement.id;
    let gridItem = gridItems.data.find((gridItem) => {
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

  // =============================================================================
  // when the drag starts I don't need to dispatch any action. I just add the draggedImgId
  // to the event. this infomation stays with the event and can be retrieved later-on
  // upon onDragDrop (in HeaderImgWrapper).
  // =============================================================================
  onDragStart = (event) => {
    let draggedImgId = event.target.alt;
    event.dataTransfer.setData('draggedImgId', draggedImgId);
  }

  onTouchStart = (event) => {
    console.log(event.changedTouches[0]);
    let theTouch = event.changedTouches[0];
    let xDown = theTouch.clientX;
    let yDown = theTouch.clientY;
    event.dataTransfer = { start_xDown: xDown, start_yDown: yDown }
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
                       onImgLoad={this.props.onImgLoad}
                       onHeartClick={this.onHeartClick} 
                       onImgClick={this.props.onImgClick}
                       onDragStart={this.onDragStart}
                       onTouchStart={this.onTouchStart}                      
                       onTouchEnd={(event) => this.props.onTouchEnd(event, this.onHeartClick)}
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
      return dispatch({ 
        type: IMG_CLICK, 
        payload: itemId 
      });
    },
    onTouchEnd: (event, onHeartClick) => {
      console.log(event.dataTransfer);
      let theTouch = event.changedTouches[0];
      let endX = theTouch.clientX;
      let endY = theTouch.clientY;
      let startX = event.dataTransfer.start_xDown;
      let startY = event.dataTransfer.start_yDown;
      let diffX = Math.abs(startX - endX);
      let diffY = Math.abs(startY - endY);
      if ((diffX > 25) && (diffY < 25)) {
        if (endX > startX) {
          onHeartClick(theTouch);
        } else {
          let touchedImgId = theTouch.target.parentElement.id;
          setCookie("headerImgId", touchedImgId);
          return dispatch({
            type: IMG_TOUCH_END,
            payload: {
              imgId: touchedImgId,
              headerImgClassName: 'header-img'
            }
          });
        }
      }
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesGridItemWrapper);