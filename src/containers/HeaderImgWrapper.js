import React from 'react';
import { connect } from 'react-redux';
import { HEADER_IMG_LOADED, IMG_DRAG_ENTER, IMG_DRAG_LEAVE, IMG_DRAG_DROP } from '../constants';

import { setCookie } from '../Utils.js';
import { HeaderImg } from '../components/HeaderImg';

export class HeaderImgWrapper extends React.Component {

  // =============================================================================
  // The header's image is determined by the headerImgId cookie.
  // It is read in the reducer during initialization.
  // =============================================================================  
  render() {
    let headerImgSrc = `./images/mia-small-${this.props.headerImgId}.jpg`;

    return (
      <HeaderImg headerImgSrc={headerImgSrc}                 
                 headerImgClassName={this.props.headerImgClassName} 
                 headerImgBorderStyle={{border: this.props.headerImgBorderStyle}} 
                 onHeaderImgLoaded={this.props.onHeaderImgLoaded} 
                 onDragOver={this.props.onDragOver}  
                 onDragEnter={this.props.onDragEnter}
                 onDragLeave={this.props.onDragLeave} 
                 onDragDrop={this.props.onDragDrop} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    headerImgBorderStyle: state.headerImgBorderStyle,
    headerImgClassName: state.headerImgClassName,
    headerImgId: state.headerImgId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // =============================================================================
    // Without this feature the border will be drawn first as a straight line and then 
    // the image would appear.  
    // And so, initally I draw no border. Only upon image loading I would add a border.
    // =============================================================================
    onHeaderImgLoaded: (event) => {
      return dispatch({ type: HEADER_IMG_LOADED, payload: '1px solid black' });
    },
    // ============================================================================= 
    // By default, elements cannot be dropped into other elements. 
    // To allow a drop we must invoke preventDefault().
    // ============================================================================= 
    onDragOver: (event) => {
      event.preventDefault();
    },
    // ============================================================================= 
    // When a grid image is dragged into header-image, I re-style the header-image 
    // (enlarge it temporarily through a class name) to give the user a cue that the 
    // dragged image "arrived at the destinaion"
    // ============================================================================= 
    onDragEnter: (event) => {
      event.preventDefault();
      return dispatch({
        type: IMG_DRAG_ENTER,
        payload: 'header-img img-hovered'
      });
    },
    // ============================================================================= 
    // If the image is dragged outside the div BUT into the image (the image is inside the div)
    // then it's still considered inside the div and therefore don't dispatch a new event.
    // ============================================================================= 
    onDragLeave: (event) => {
      let relatedTargetId = event.relatedTarget.id;
      if (relatedTargetId !== 'header-img' && relatedTargetId !== 'dragged-into-div') {
        return dispatch({
          type: IMG_DRAG_LEAVE,
          payload: 'header-img'
        });
      }
    },
    // ============================================================================= 
    // If the image is dragged outside the div BUT into the image (the image is inside the div)
    // then it's still considered inside the div and therefore don't dispatch a new event.
    // ============================================================================= 
    onDragDrop: (event) => {
      let draggedImgId = event.dataTransfer.getData('draggedImgId');
      setCookie("headerImgId", draggedImgId);
      return dispatch({
        type: IMG_DRAG_DROP,
        payload: {
          imgId: draggedImgId,
          headerImgClassName: 'header-img'
        }
      });
    },
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(HeaderImgWrapper);