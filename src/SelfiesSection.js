import React from 'react';

import { gridItemsData } from './gridItemsData';
import GridItem from './GridItem';
import SelfiesModalImg from './SelfiesModalImg';

let loadedImgCounter = 0;

class SelfiesSection extends React.Component {
  constructor(props) {
    super(props);
    this.imgLoadCallbackEventHandler = this.imgLoadCallbackEventHandler.bind(this);
  }

  // =============================================================================
  // Invoked by the GridItem component upon image loading.
  // When loadedImgCounter === total number of images the div can become visible. 
  // =============================================================================  
  imgLoadCallbackEventHandler() {
    loadedImgCounter++;
    if (loadedImgCounter === gridItemsData.length) {
      loadedImgCounter = 0;
      this.props.onAllImgsLoaded();      
    }
  }

  // =============================================================================  
  // A few properties here are conditional:
  // - The section "blurring" effect is conditional based on the state.modalImgId value. 
  // - In addition to the grid I'll also render the modal componet ONLY if hte modalImgId is not ''
  //   This will happen if the image is clicked on in the GridItem component in which case
  //   the imgClickCallbackEventHandler() is invoked that changes the state.modalImgId value.
  // =============================================================================  
  render() {
    let gridVisibility = this.props.gridVisibility;
    let spinnerDisplay = gridVisibility === 'hidden' ? 'inline-block' : 'none';
    let blurEffect = this.props.blurEffect;
    let modalImgId = this.props.modalImgId;

    return (
      <React.Fragment>            
        <div id="spinner-div" className="lds-ripple" style={{display:spinnerDisplay}}>
          <div></div>
          <div></div>
        </div>
        <section className="grid-section middle-section">
          <div className={"dynamic-grid " + blurEffect} style={{visibility:gridVisibility}}>
            {gridItemsData.map((gridItemData) => {
              return (<GridItem id={gridItemData.id}
                                src={gridItemData.src}
                                caption={gridItemData.caption}
                                isLiked={gridItemData.isLiked}
                                likeCount={gridItemData.likeCount}
                                date={gridItemData.date} 
                                imgLoadCallbackEventHandler={this.imgLoadCallbackEventHandler}
                                onImgClick={this.props.onImgClick}
                                key={gridItemData.id} />);
            })}
          </div>

          {modalImgId !== '' ? 
            <SelfiesModalImg modalImgId={modalImgId}
                             onModalClosed={this.props.onModalClosed}
                             onModalNextBtn={this.props.onModalNextBtn}
                             onModalPrevBtn={this.props.onModalPrevBtn} /> : ''
          }
        </section>
      </React.Fragment>
    );
  }
}

export default SelfiesSection;