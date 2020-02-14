import React from 'react';
import { connect } from 'react-redux';

import { gridItems } from '../gridItemsData';
import { globalModalImg } from '../Utils';
import { MODAL_NEXT_BTN, MODAL_PREV_BTN, MODAL_IMG_LOADED, MODAL_CLOSED } from '../constants';
import { SelfiesModalImg } from '../components/SelfiesModalImg';

export class SelfiesModalImgWrapper extends React.Component {
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
    let modalImgIndex = gridItems.data.map(function(item) { return item.id; }).indexOf(globalModalImg.id);
    let gridItem = gridItems.data[modalImgIndex];

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
      <SelfiesModalImg onModalImgLoaded={this.onLoadEventHandler}
                       onModalPrevBtn={() => this.props.onModalPrevBtn(this.props.filteredGridItemsData)}
                       onModalNextBtn={() => this.props.onModalNextBtn(this.props.filteredGridItemsData)}
                       onModalClosed={this.props.onModalClosed}
                       theModalImg={theModalImg}
                       containerDivMaxWidth={this.containerDivMaxWidth}
                       modalImgHeight={this.modalImgHeight} />
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
     onModalPrevBtn: (filteredGridItemsData) => {
      let items = filteredGridItemsData;
      let itemIndex = items.map(function(item) { return item.id; }).indexOf(globalModalImg.id);      
      itemIndex = itemIndex === 0 ? items.length - 1 : itemIndex - 1;
      let modalImgId = items[itemIndex].id;
      globalModalImg.id = modalImgId;

      return dispatch({ type: MODAL_PREV_BTN, payload:{modalImgId: modalImgId, modalDisplayStyle: 'none'}});
    },
    onModalNextBtn: (filteredGridItemsData) => {
      let items = filteredGridItemsData;
      let itemIndex = items.map(function(item) { return item.id; }).indexOf(globalModalImg.id);
      itemIndex = (itemIndex + 1) === items.length ? 0 : itemIndex + 1;
      let modalImgId = items[itemIndex].id;
      globalModalImg.id = modalImgId;

      return dispatch({ type: MODAL_NEXT_BTN, payload:{modalImgId: modalImgId, modalDisplayStyle: 'none'}});
    }, 
    onModalImgLoaded: () => {
      return dispatch({ type: MODAL_IMG_LOADED, payload: {modalDisplayStyle: 'block'} });
    },
    onModalClosed: () => {
      return dispatch({ type: MODAL_CLOSED });
    },
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesModalImgWrapper);