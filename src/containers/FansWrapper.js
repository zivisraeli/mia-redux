import React from 'react';

import { Footer } from '../components/Footer';
import { FansHeader } from '../components/FansHeader';
import FansSectionWrapper from './FansSectionWrapper';

import '../css/fans.css';

// =============================================================================
//  Fans is more like a component and can be implements as a function. 
//  It doesn't need to be a container since it is stateless.
//  However, I placed it here since semantically it's a container. 
//  It's the gateway to the page content.
// =============================================================================
export class FansWrapper extends React.Component {
  render() {
    return (
      <React.Fragment>
      <main id="fan-section">
        <FansHeader />
        <FansSectionWrapper />
      </main>
      <Footer />
    </React.Fragment>
    );
  }
}