import React from 'react';
import { connect } from 'react-redux';

import { gridItemsData } from './gridItemsData';
import { gridItemsMap } from './Utils';
import heartLikesIcon from './images/heart-likes.png';
import { MODAL_NEXT_BTN, MODAL_PREV_BTN, MODAL_IMG_LOADED, MODAL_CLOSED } from './constants';

export class SelfiesModalImg extends React.Component {
  modalImgHeight;
  containerDivMaxWidth;

  // =============================================================================
  // The img width is always 75% of the viewport.
  // However I need to determine the height.
  // - I find the width/height ration of the img and the width/height ratio of the viewport.
  // - if it's wider img, I don't try to set the height.
  // - otherwise, the height would be equal to the width. 
  // =============================================================================
  onLoadEventHandler = (event) => {
    let imgW = event.target.naturalWidth;
    let imgH = event.target.naturalHeight;
    let imgW2h = imgW / imgH;

    let vpW = document.documentElement.clientWidth;
    let vpH = document.documentElement.clientHeight - 149;
    if (imgW < (document.documentElement.clientWidth * 0.65)) {
      this.containerDivMaxWidth = '50vw';
      vpW = vpW * 0.5;
    } else {
      this.containerDivMaxWidth = '75vw';
      vpW = vpW * 0.75;
    }

    let vpW2h = vpW / vpH;

    // For a wide image or for image where height is smaller then the viewport's height - 
    // don't specify height.
    if (imgW2h > vpW2h || (imgH < vpH)) {
      this.modalImgHeight = '';
    } else {
      this.modalImgHeight = vpH;
    }

    this.props.onModalImgLoaded();
  }

  render() {
    let modalImgIndex = gridItemsMap.get(this.props.modalImgId);
    let gridItem = gridItemsData[modalImgIndex];

    let arrSrc = gridItem.src.match('(.*mia-).*-(.*)(.jpg$)');
    let theModalImg = {};
    theModalImg.src = arrSrc[1] + arrSrc[2] + arrSrc[3];
    theModalImg.caption = gridItem.caption;
    theModalImg.likeCount = gridItem.likeCount;
    theModalImg.displayStyle = this.props.modalDisplayStyle;

    // =============================================================================
    // For divs:
    // 1. modal-main-container-div
    //   - it covers the ENTIRE viewport (w:100%, h:100%). 
    //   - it contains 3 elements: 2 buttons (prev, next) and a sub-container div in between.
    //   - its position is *fixed* on left:1, top:1 (relative to the viewport).
    //   - it's the main container that is visible or none.
    //   - it carries the value z-index:1 meaning it's in the front of the grid. 
    //   - the grid was rendered blurred by the SelfiesSection.
    // 2. modal-sub-container-div
    //    - its width is 75% of the viewport width (75vw) and it's centered (margin:auto).
    //    - it contains 2 elements: the close button and the image div. 
    //    - its position is *relative* & starts below the header (based on the header's height+1)
    //    - its background color is #fefefe which is slighty different then the grid background. 
    // 3. modal-main-img-div
    //    - it covers the entre containng div i.e. 75% of the view port. 
    //    - it contains 3 elements: the main img div and captions (spans) at the bottom.
    //    - it has a border and has paddings to "frame" the image.  
    // 4. modal-img-div
    //    - contains the img
    //    - contains the scroll due to overflowY: 'auto'
    // =============================================================================
    return (
      <div id="modal-main-container-div" style={{display: theModalImg.displayStyle}}>
        <div id="modal-sub-container-div" style={{maxWidth: this.containerDivMaxWidth}}>
          <span className="modal-img-close-btn" onClick={this.props.onModalClosed}>&times;</span>
          <div id="modal-main-img-div" style={{padding:'25px 25px 25px 25px', border: '1px solid black'}}>
            <div id="modal-img-div" style={{overflowY: 'auto',  overflowX: 'hidden', height: this.modalImgHeight}}>                                         
              <img src={theModalImg.src} 
                   alt="Mia's i-m-g"                 
                   onLoad={this.onLoadEventHandler}/>           
            </div>
            <span id="modal-img-text" className="modal-img-caption">{theModalImg.caption}</span>
            <span id="modal-img-like-count" className="modal-img-caption">
              {theModalImg.likeCount} <img src={heartLikesIcon} className="heart-likes-icon" alt="like-count"/>'s
            </span>
          </div>
        </div>
        <button id="prev-btn" 
                className="nav-button"
                onClick={this.props.onModalPrevBtn}>
          <i className="fa fa-arrow-circle-left"></i>
          <span className="button-text">&nbsp;&nbsp;Previous</span>
        </button>
        <button id="next-btn" 
                className="nav-button" 
                onClick={this.props.onModalNextBtn}>
          <span className="button-text">Next&nbsp;&nbsp;</span>
          <i className="fa fa-arrow-circle-right"></i>
        </button>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    modalImgId: state.modalImgId,
    modalDisplayStyle: state.modalDisplayStyle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModalNextBtn: () => {
      return dispatch({ type: MODAL_NEXT_BTN });
    },
    onModalPrevBtn: () => {
      return dispatch({ type: MODAL_PREV_BTN });
    },
    onModalImgLoaded: () => {
      return dispatch({ type: MODAL_IMG_LOADED });
    },
    onModalClosed: () => {
      return dispatch({ type: MODAL_CLOSED });
    },
  }
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(SelfiesModalImg);