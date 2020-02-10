import React from 'react';

import heartOutline from '../images/heart-outline.png';
import heartFull from '../images/heart-full.png';

export const SelfiesGridItem = (props) => {
  let theHeart = heartOutline;
  let theHeartClass = 'heart';
  if (props.isLiked) {
    theHeart = heartFull;
    theHeartClass = 'heart animatedHeartBeat';
  }

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
         <img src={theHeart} 
              className={theHeartClass} 
              alt="heart-like" 
              onClick={props.heartClickEventHandler} />
       </figure>
  );
}