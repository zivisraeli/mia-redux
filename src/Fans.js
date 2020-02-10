import React from 'react';

import { Footer } from './components/Footer';
import { FansHeader } from './FansHeader';
import FansSection from './FansSection';

export const Fans = (props) => {
  return (
    <React.Fragment>
        <main>
          <FansHeader />
          <FansSection />
        </main>
        <Footer />
      </React.Fragment>
  );
}