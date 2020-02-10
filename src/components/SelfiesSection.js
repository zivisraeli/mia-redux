import React from 'react';

import { gridItemsData } from '../gridItemsData';
import { SelfiesGridItemWrapper } from '../containers/SelfiesGridItemWrapper';
import SelfiesModalImg from '../SelfiesModalImg';

export const SelfiesSection = (props) => {

  // =============================================================================  
  // A few properties here are conditional:
  // - The section "blurring" effect is conditional based on the state.modalImgId value. 
  // - In addition to the grid I'll also render the modal componet ONLY if hte modalImgId is not ''
  //   This will happen if the image is clicked on in the GridItem component in which case
  //   the imgClickCallbackEventHandler() is invoked that changes the state.modalImgId value.
  // =============================================================================  
  let gridVisibility = props.gridVisibility;
  let spinnerDisplay = gridVisibility === 'hidden' ? 'inline-block' : 'none';
  let blurEffect = props.blurEffect;

  return (
    <React.Fragment>            
        <div id="spinner-div" className="lds-ripple" style={{display:spinnerDisplay}}>
          <div></div>
          <div></div>
        </div>
        <section className="grid-section middle-section">
          <div className={"dynamic-grid " + blurEffect} style={{visibility:gridVisibility}}>
            {gridItemsData.map((gridItemData) => {
              return (<SelfiesGridItemWrapper id={gridItemData.id}
                                src={gridItemData.src}
                                caption={gridItemData.caption}
                                isLiked={gridItemData.isLiked}
                                likeCount={gridItemData.likeCount}
                                date={gridItemData.date} 
                                imgLoadCallbackEventHandler={props.imgLoadCallbackEventHandler}
                                key={gridItemData.id} />);
            })}
          </div>

          {props.isModalOn === true ? 
            <SelfiesModalImg /> : ''
          }
        </section>
      </React.Fragment>
  );
}