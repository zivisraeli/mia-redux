import React from 'react';

import SelfiesSortOptionsWrapper from '../containers/SelfiesSortOptionsWrapper';
import SelfiesFilterWrapper from '../containers/SelfiesFilterWrapper';

// =============================================================================  
// The 'swipe' instructions will be invisible on a desktop but visible on a mobile device.
// The 'click' and 'drag' instruction will be the other way around.
// =============================================================================  
export const SelfiesHeader = (props) => {
  return (
    <section>
	      <h1>Some of my best selfies!</h1>
	      <ul className="customed-ul">
	        <li><i class="fa fa-circle li-icon"></i>
	          Sort Images By: <SelfiesSortOptionsWrapper />        
	        </li>
	        <li><i class="fa fa-circle li-icon"></i>
	           Filter Images By Caption: <SelfiesFilterWrapper />
	        </li>
	        <li><i class="fa fa-circle li-icon"></i>Click on the image for a full image view.</li>
	        <li className="desktopLi"><i class="fa fa-circle li-icon"></i>Click on the heart icon to like the image!</li>
	        <li className="desktopLi"><i class="fa fa-circle li-icon"></i>Drag an image to the header and persist it.</li>
	        <li className="mobileLi"><i class="fa fa-circle li-icon"></i>Swipe to the right to like the image!</li>
	        <li className="mobileLi"><i class="fa fa-circle li-icon"></i>Swipe to the left to replace the header's image.</li>
	        <li><i class="fa fa-circle li-icon"></i>Your choices are permanently stored on your local device.</li>
	      </ul>
	      <hr/>
      </section>
  );
}