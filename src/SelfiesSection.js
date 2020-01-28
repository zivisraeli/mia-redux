import React from 'react';

import { gridItemsData } from './gridItemsData';
import GridItem from './GridItem';
import SelfiesModalImg from './SelfiesModalImg'

let loadedImgCounter = 0;

class SelfiesSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gridVisibility: 'hidden',
      spinnerDisplay: 'inline-block',
      blurEffect: 'non-blurred',
      modalImgId: ''
    };

    this.imgLoadCallbackEventHandler = this.imgLoadCallbackEventHandler.bind(this);
    this.imgClickCallbackEventHandler = this.imgClickCallbackEventHandler.bind(this);
    this.modalClosedCallbackEventHandler = this.modalClosedCallbackEventHandler.bind(this);
  }

  // =============================================================================
  // Invoked by the GridItem component upon image loading.
  // When loadedImgCounter === total number of images the div can become visible. 
  // =============================================================================  
  imgLoadCallbackEventHandler() {
    loadedImgCounter++;
    if (loadedImgCounter === gridItemsData.length) {
      this.setState({
        gridVisibility: 'visible',
        spinnerDisplay: 'none'
      });
      loadedImgCounter = 0;
    }
  }

  imgClickCallbackEventHandler(event) {
    let itemId = event.target.parentElement.id;
    this.setState({
      modalImgId: itemId,
      blurEffect: 'blurred'
    });
  }

  modalClosedCallbackEventHandler() {
    this.setState({
      modalImgId: '',
      blurEffect: 'non-blurred'
    });
  }

  // =============================================================================  
  // A few properties here are conditional:
  // - The section "blurring" effect is conditional based on the state.modalImgId value. 
  // - In addition to the grid I'll also render the modal componet ONLY if hte modalImgId is not ''
  //   This will happen if the image is clicked on in the GridItem component in which case
  //   the imgClickCallbackEventHandler() is invoked that changes the state.modalImgId value.
  // =============================================================================  
  render() {
    let gridVisibility = { visibility: this.state.gridVisibility }
    let spinnerDisplay = { display: this.state.spinnerDisplay }
    let blurEffect = this.state.blurEffect;
    let modalImgId = this.state.modalImgId;

    return (
      <React.Fragment>            
        <div id="spinner-div" className="lds-ripple" style={spinnerDisplay}>
	        <div></div>
	        <div></div>
        </div>
	      <section className="grid-section middle-section">
	        <div className={"dynamic-grid " + blurEffect} style={gridVisibility}>
				    {gridItemsData.map((gridItemData) => {
				      return (<GridItem id={gridItemData.id}
				                        src={gridItemData.src}
				                        caption={gridItemData.caption}
				                        isLiked={gridItemData.isLiked}
				                        likeCount={gridItemData.likeCount}
				                        date={gridItemData.date} 
				                        imgLoadCallbackEventHandler={this.imgLoadCallbackEventHandler}
				                        imgClickCallbackEventHandler={this.imgClickCallbackEventHandler}
				                        key={gridItemData.id} />);
				    })}
	        </div>

	        {this.state.modalImgId !== '' ? 
	          <SelfiesModalImg modalImgId={modalImgId}
	                           modalClosedCallbackEventHandler={this.modalClosedCallbackEventHandler} /> :
	          ''
	        }
	      </section>
      </React.Fragment>
    );
  }
}

export default SelfiesSection;