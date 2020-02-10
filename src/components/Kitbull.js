import React from 'react';

import { KitbullVideo } from './KitbullVideo';
import { KitbullSection } from './KitbullSection';
import { Footer } from './Footer';

export const Kitbull = (props) => {
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