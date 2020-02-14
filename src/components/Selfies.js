import React from 'react';

import { SelfiesHeader } from './SelfiesHeader';
import SelfiesSectionWrapper from '../containers/SelfiesSectionWrapper';
import { Footer } from './Footer';

export const Selfies = (props) => {
  return (
    <React.Fragment>
      <main id="grid-section">
        <SelfiesHeader />
        <SelfiesSectionWrapper blurEffect={props.blurEffect} 
                               gridVisibility={props.gridVisibility}
                               isModalOn={props.isModalOn} />
      </main>
      <Footer />        
    </React.Fragment>
  );
}