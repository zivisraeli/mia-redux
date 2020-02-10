import React from 'react';

import SelfiesHeader from '../SelfiesHeader';
import SelfiesSection from '../SelfiesSection';
import Footer from '../Footer';

export const SelfiesPresentational = (props) => {
  return (
    <React.Fragment>
        <main id="grid-section">
          <SelfiesHeader />
          <SelfiesSection blurEffect={props.blurEffect} 
                          gridVisibility={props.gridVisibility}
                          onAllImgsLoaded={props.onAllImgsLoaded}
                          isModalOn={props.isModalOn} />
        </main>
        <Footer />        
      </React.Fragment>
  );
}