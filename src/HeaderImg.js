import React from 'react';
import { getCookie } from './Utils.js';

class HeaderImg extends React.Component {
  constructor() {
    super();

    this.state = {
      borderStyle: '',
      headerImgId: 'id02',
    };
  }

  // =============================================================================
  // Without this function the border will be drawn first as a straight line and then 
  // the image would appear. And so, I need to waiting for the image to be loaded first. 
  // =============================================================================
  imgOnLoadEventHander = () => {
    this.setState({borderStyle: '1px solid black'});
  }

  // =============================================================================
  // The header's image is determined by the headerImgId cookie.
  // If not found, use this.state.headerImgId default value.
  // =============================================================================  
  render() { 
    console.log('about to get a cookie');
    let headerImgId = getCookie("headerImgId");
    console.log('id = ' + headerImgId);
    console.log('Got a cookie');
    headerImgId = headerImgId === null ? this.state.headerImgId : headerImgId;
    let imgSrc = `./images/mia-small-${headerImgId}.jpg`;

    return (
      <div id="dragged-into-div">                          
        <img src={imgSrc} 
             id="header-img" 
             className="header-img" 
             alt="header-img"
             style={{border: this.state.borderStyle}}
             onLoad={this.imgOnLoadEventHander}/>
      </div>);
  }
}

export default HeaderImg;