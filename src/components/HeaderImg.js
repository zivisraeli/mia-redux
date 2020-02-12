import React from 'react';

export const HeaderImg = (props) => {
  return (
    <div id="dragged-into-div" 
         onDragOver={props.onDragOver}
         onDragEnter={props.onDragEnter}
         onDragLeave={props.onDragLeave} 
         onDrop={props.onDragDrop} >                          
      <img src={props.headerImgSrc} 
           id="header-img" 
           className={props.headerImgClassName}
           alt="header-img"
           style={props.headerImgBorderStyle}
           onLoad={props.onHeaderImgLoaded} />
    </div>);
}