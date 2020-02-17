import React from 'react';
import { connect } from 'react-redux';

import { gridItems } from '../gridItemsData';
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
    console.log(vpW);
    let vpH = document.documentElement.clientHeight - 149;
    if (imgW < (document.documentElement.clientWidth * 0.65)) {
      this.containerDivMaxWidth = '50vw';
      vpW = vpW * 0.5;
    } else {
      if (vpW < 700) {
        this.containerDivMaxWidth = '100vw';
      } else {
        this.containerDivMaxWidth = '75vw';
        vpW = vpW * 0.75;
      }
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
    let modalImgIndex = gridItems.data.map((item) => { return item.id; }).indexOf(this.props.modalImgId);
    let gridItem = gridItems.data[modalImgIndex];

    let arrSrc = gridItem.src.match('(.*mia-).*-(.*)(.jpg$)');
    let theModalImg = {};
    theModalImg.src = arrSrc[1] + arrSrc[2] + arrSrc[3];
    theModalImg.caption = gridItem.caption;
    theModalImg.likeCount = gridItem.likeCount;
    theModalImg.displayStyle = this.props.modalDisplayStyle;

    // =============================================================================
    // Two main properties are passed down to SelfiesModalImg through the prev/next callback
    // functions. When the dispatch methods (listed in mapDispatchToProps)
    // are invoked, they will be invoked with this 2 parameters. 
    // - filteredGridItemsData - is passed to this component from SelfiesSectionWrapper where it's created.
    //   it is necessary in order to determine the next/prev image.
    // - modalImgId - is passed from the store (mapStateToProps).
    //   it is necessary in order to to determine its index and therefore the next/prev image index.
    //
    // This complexity could be avoided had I decided to put the logic in the reducer. However, 
    // I would rather have this logic in the related component.
    // =============================================================================
    let filteredGridItemsData = this.props.filteredGridItemsData;
    let modalImgId = this.props.modalImgId;
    return (
      <SelfiesModalImg onModalImgLoaded={this.onLoadEventHandler}
                       onModalPrevBtn={() => this.props.onModalPrevBtn(filteredGridItemsData, modalImgId)}
                       onModalNextBtn={() => this.props.onModalNextBtn(filteredGridItemsData, modalImgId)}
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
    onModalPrevBtn: (filteredGridItemsData, modalImgId) => {
      let items = filteredGridItemsData;
      let itemIndex = items.map((item) => { return item.id; }).indexOf(modalImgId);
      itemIndex = itemIndex === 0 ? items.length - 1 : itemIndex - 1;
      modalImgId = items[itemIndex].id;

      return dispatch({
        type: MODAL_PREV_BTN,
        payload: {
          modalImgId: modalImgId,
          modalDisplayStyle: 'none'
        }
      });
    },
    onModalNextBtn: (filteredGridItemsData, modalImgId) => {
      let items = filteredGridItemsData;
      let itemIndex = items.map((item) => { return item.id; }).indexOf(modalImgId);
      itemIndex = (itemIndex + 1) === items.length ? 0 : itemIndex + 1;
      modalImgId = items[itemIndex].id;

      return dispatch({
        type: MODAL_NEXT_BTN,
        payload: {
          modalImgId: modalImgId,
          modalDisplayStyle: 'none'
        }
      });
    },
    onModalImgLoaded: () => {
      return dispatch({
        type: MODAL_IMG_LOADED,
        payload: { modalDisplayStyle: 'block' }
      });
    },
    onModalClosed: () => {
      return dispatch({
        type: MODAL_CLOSED
      });
    },
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(SelfiesModalImgWrapper);