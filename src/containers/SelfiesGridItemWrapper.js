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
  // - the method is invoked upon:
  //   1. heart icon is clicked (click event on desktop)
  //   2. user swaped to the right (touch event on mobile)
  // - The heart image doesn't carry an id, but its parent does.
  // - The id is used to find the actual grid-item element from the list.
  // - Once the grid-item element is found, I manipulates the like values:
  //   * toggle the isLiked value.
  //   - increment/decrement the likeCount.
  //   - set the states values which during rendering r used to determine 
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

  // =============================================================================
  // here i'm using a trick used the drag events. i'm adding data to event 
  // (initial x,y values) through a made-up property - dataTransfer.
  // this data will be later retrieved upon touchEnd event. 
  // =============================================================================
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

    // =============================================================================
    // there are 3 main functionalities on a grid item:
    //   - desktop
    //     * click on an img to make it larger
    //     * drag an img to the header
    //     * click on the heart icon to toggle the heart/likes.
    //   - mobile:
    //     * click on an img to make it larger
    //     * swipe (drag) to the left to set an img to the header
    //     * swipe (drag) to the right to toggle the heart/likes.
    // 
    // - there are 3 types of events here:
    //   1. those that can be processed locally and they don't communicate with other components:
    //      * onDragStart - gathers data for dataTransfer.
    //      * onTouchStart - gathers data for dataTransfer.
    //      * onHeartClick - modifies local state values (can be invoked by onTouchEnd)
    //   2. those that need to dispatch an action to notify other components:
    //      * onImgClick
    //   3. those that need both local processing and dispatch handling:
    //      * onTouchEnd - when a touch event happens it means either:
    //        - swipe-to-the-right: equivalent to heart-click and thus can be handled 
    //          locally by onHeartClick().
    //        - swipe-to-the-left: header-img needs to change and so an action needs to 
    //           be dispatched since it's handled by other components.
    // 
    //  - the local handling case presents a bit of an issue - onTouchEnd needs to invoke onHeartClick() 
    //    which is a class method. I therefore pass it through the onTouchEnd property so I have the 
    //    handler to this method upon onTouchEnd event. 
    //  - to pass an argument to the onTouchEnd callback functiong, I'm creating an anonymous function
    //    that returns a call to onTouchEnd with arguments. 
    //  - the end event for onDragStart is onDragDrop which takes place in HeaderImgWrapper. 
    //  - the imgRef property is a refernce to each img so I can associate scroll events with it.
    //    the scroll event blurs/unblurs each image upon being fully visible (Intersection Observer API)
    //    the references were created in the SelfiesSectionWrapper.
    // =============================================================================
    return (
      <SelfiesGridItem id={this.props.id} 
                       src={this.props.src}
                       caption={this.props.caption}
                       date={this.props.date}
                       isLiked={this.state.isLiked}
                       likeCount={this.state.likeCount}                    
                       onImgClick={this.props.onImgClick}
                       onDragStart={this.onDragStart}
                       onTouchStart={this.onTouchStart}                      
                       onTouchEnd={(event) => this.props.onTouchEnd(event, this.onHeartClick)}
                       onHeartClick={this.onHeartClick} 
                       theHeartImg={theHeartImg}
                       theHeartImgClass={theHeartImgClass}
                       key={this.props.id}
                       imgRef={this.props.imgRef}/>);
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
      let theTouch = event.changedTouches[0];
      let endX = theTouch.clientX;
      let endY = theTouch.clientY;
      let startX = event.dataTransfer.start_xDown;
      let startY = event.dataTransfer.start_yDown;
      let diffX = Math.abs(startX - endX);
      let diffY = Math.abs(startY - endY);
      if ((diffX > 25) && (diffY < 25)) {
        if (endX > startX) {
          // Swipe to the right
          onHeartClick(theTouch);
        } else {
          // Swipe to the left
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