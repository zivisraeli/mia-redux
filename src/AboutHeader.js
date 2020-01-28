import React from 'react';

import imgFrame from './images/img-frame.png';
import miaAbout from './images/mia-about.jpg';

class AboutHeader extends React.Component {
  render() {
    return (
      <section id="about-top-section">
	      <h1 id="title-left">Hi there. <br/> I'm Mia.</h1>
	      <div id="img-div">
	        <img src={imgFrame} alt="img-frame" id="img-frame"/>
	        <img src={miaAbout} alt="mia-about" id="img"/>
	      </div>
	      <h1 id="title-right">And this site is <br/> all about me.</h1>
      </section>
    );
  }
}

export default AboutHeader;