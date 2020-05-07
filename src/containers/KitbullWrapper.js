import React from 'react';

import { KitbullVideo } from '../components/KitbullVideo';
import { KitbullSection } from '../components/KitbullSection';
import { Footer } from '../components/Footer';

import '../css/kitbull.css';

// =============================================================================
//  Kitbull is more like a component and can be implements as a function. 
//  It doesn't need to be a container since it is stateless.
//  However, I placed it here since semantically it's a container. 
//  It's the gateway to the page content.
// =============================================================================
export class KitbullWrapper extends React.Component {
  render() {
    return (
      <React.Fragment>  
      <main>
        <KitbullVideo />
        <KitbullSection />
      </main>
      <Footer />
    </React.Fragment>
    );
  }
}