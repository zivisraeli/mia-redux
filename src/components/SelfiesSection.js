import React from 'react';

import SelfiesGridItemWrapper from '../containers/SelfiesGridItemWrapper';
import SelfiesModalImgWrapper from '../containers/SelfiesModalImgWrapper';

export const SelfiesSection = (props) => {

  // =============================================================================  
  // A few properties here are conditional:
  // - The section "blurring" effect is conditional based on the state.modalImgId value. 
  // - In addition to the grid I'll also render the modal componet ONLY if hte modalImgId is not ''
  //   This will happen if the image is clicked on in the GridItem component in which case
  //   the imgClickCallbackEventHandler() is invoked that changes the state.modalImgId value.
  // =============================================================================  
  return (
    <React.Fragment>            
        <div id="spinner-div" className="lds-ripple" style={{display:props.spinnerDisplay}}>
          <div></div>
          <div></div>
        </div>
        <section className="grid-section middle-section">
          <div className={"dynamic-grid " + props.blurEffect} style={{visibility:props.gridVisibility}}>
            {props.filteredGridItemsData.map((gridItemData) => {
              return (<SelfiesGridItemWrapper id={gridItemData.id}
                                              src={gridItemData.src}
                                              caption={gridItemData.caption}
                                              isLiked={gridItemData.isLiked}
                                              likeCount={gridItemData.likeCount}
                                              date={gridItemData.date} 
                                              onImgLoad={props.onImgLoad}
                                              key={gridItemData.id} />);
            })}
          </div>

          {props.isModalOn === true ? 
            <SelfiesModalImgWrapper filteredGridItemsData={props.filteredGridItemsData} /> : ''
          }
        </section>
      </React.Fragment>
  );
}