import React from 'react';

import SelfiesHeaderSortOptions from './SelfiesHeaderSortOptions';

class SelfiesHeader extends React.Component {
  render() {
    return (
      <section>
	      <h1>Some of my best selfies!</h1>
	      <ul className="customed-ul">
	        <li>
	          Sort Images By: <SelfiesHeaderSortOptions sortOptionsInitialValue={this.props.sortOptionsInitialValue}
	                                                    sortOptionsChangedCallback={this.props.sortOptionsChangedCallback} />        
	        </li>
	        <li>Click on the image for a full image view.</li>
	        <li className="desktopLi">Click on the heart icon to like the image!</li>
	        <li className="desktopLi">Drag an image to the header and persist it.</li>
	        <li className="mobileLi">Swipe to the right to like the image!</li>
	        <li className="mobileLi">Swipe to the left to replace the header's image.</li>
	        <li>Your choices are permanently stored on your local device.</li>
	      </ul>
	      <hr/>
      </section>
    );
  }
}

export default SelfiesHeader;