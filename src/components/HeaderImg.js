import React from 'react';

export const HeaderImg = (props) => {
  return (
    <div id="dragged-into-div">                          
      <img src={props.headerImgSrc} 
           id="header-img" 
           className="header-img" 
           alt="header-img"
           style={props.headerImgBorderStyle}
           onLoad={props.onHeaderImgLoaded} />
    </div>);
}