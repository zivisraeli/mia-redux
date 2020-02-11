import React from 'react';

export const SelfiesGridItem = (props) => {
  return (
    <figure id={props.id} className="grid-item">
      <img src={props.src} 
           className="grid-image"
           alt={props.id}
           onLoad={props.imgLoadCallbackEventHandler} 
           onClick={props.onImgClick} />
    <figcaption className="figcaption">
                 {props.caption}&nbsp;|&nbsp;
      <span id="like-count-span">{props.likeCount}</span>&nbsp;
      <img src={require("../images/heart-likes.png")} 
           className="heart-likes-icon" 
          alt="heart-likes"/>'s&nbsp;|&nbsp;
      {props.date}&nbsp;
    </figcaption>
    <img src={props.theHeartImg} 
         className={props.theHeartImgClass} 
         alt="heart-like" 
         onClick={props.heartClickEventHandler} />
    </figure>
  );
}