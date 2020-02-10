import React from 'react';

export const KitbullVideo = (props) => {
  return (
    <React.Fragment>
	      <h1>Kitbull / Pixar</h1> 
	      <div id = "iframe-wrapper" >
		      <iframe src="https://www.youtube.com/embed/AZS5cgybKcI"
		              frameBorder="0" 
		              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
		              title="The Kitbull Movie"
		              allowFullScreen>
		      </iframe> 
	      </div>
    	</React.Fragment>
  );
}