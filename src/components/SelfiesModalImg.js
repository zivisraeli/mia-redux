import React from 'react';

import heartLikesIcon from '../images/heart-likes.png';

export const SelfiesModalImg = (props) => {
  // =============================================================================
  // The divs:
  // 1. modal-main-container-div
  //   - it covers the ENTIRE viewport (w:100%, h:100%). 
  //   - it contains 3 elements: 2 buttons (prev, next) and a modal-sub-container-div in between.
  //   - its position is *fixed* on left:1, top:1 (relative to the viewport).
  //   - it's the main container that is visible or none.
  //   - it carries the value z-index:1 meaning it's in the front of the grid. 
  //   - (the grid itself is rendered blurred)
  // 2. modal-sub-container-div
  //    - its width is 75% of the viewport width (75vw) and it's centered (margin:auto).
  //    - it contains 2 elements: the close button and the image div. 
  //    - its position is *relative* & starts below the header (based on the header's height+1)
  //    - its background color is #fefefe which is slighty different then the grid background. 
  // 3. modal-main-img-div
  //    - it covers the entire containing div i.e. 75% of the view port. 
  //    - it contains 3 elements: the main img div, the caption and like count.
  //    - it has a border and has paddings to "frame" the image.  
  // 4. modal-img-div
  //    - contains the img
  //    - contains the scroll due to overflowY: 'auto'
  // ============================================================================= 
  return (
    <div id="modal-main-container-div" style={{display: props.theModalImg.displayStyle}}>
      <div id="modal-sub-container-div" style={{maxWidth: props.containerDivMaxWidth}}>
        <span className="modal-img-close-btn" onClick={props.onModalClosed}>&times;</span>
        <div id="modal-main-img-div" style={{padding:'25px 25px 25px 25px', border: '1px solid black'}}>
          <div id="modal-img-div" style={{overflowY: 'auto',  overflowX: 'hidden', height: props.modalImgHeight}}>                                         
            <img src={props.theModalImg.src} 
                 alt="Mia's i-m-g"                 
                 onLoad={props.onModalImgLoaded}/>           
          </div>
          <span id="modal-img-text" className="modal-img-caption">{props.theModalImg.caption}</span>
          <span id="modal-img-like-count" className="modal-img-caption">
            {props.theModalImg.likeCount} <img src={heartLikesIcon} className="heart-likes-icon" alt="like-count"/>'s
          </span>
        </div>
      </div>
      <button id="prev-btn" 
              className="nav-button"
              onClick={props.onModalPrevBtn}>
        <i className="fa fa-arrow-circle-left"></i>
        <span className="button-text">&nbsp;&nbsp;Previous</span>
      </button>
      <button id="next-btn" 
              className="nav-button" 
              onClick={props.onModalNextBtn}>
        <span className="button-text">Next&nbsp;&nbsp;</span>
        <i className="fa fa-arrow-circle-right"></i>
      </button>
    </div>
  )
}