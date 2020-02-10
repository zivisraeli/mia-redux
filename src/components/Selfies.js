import React from 'react';

import { SelfiesHeader } from './SelfiesHeader';
import SelfiesSectionContainer from '../containers/SelfiesSectionContainer';
import { Footer } from './Footer';

export const Selfies = (props) => {
  return (
    <React.Fragment>
      <main id="grid-section">
        <SelfiesHeader />
        <SelfiesSectionContainer blurEffect={props.blurEffect} 
                                 gridVisibility={props.gridVisibility}
                                 isModalOn={props.isModalOn} />
      </main>
      <Footer />        
    </React.Fragment>
  );
}