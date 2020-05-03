import React from 'react';

import { Footer } from './Footer';
import { FansHeader } from './FansHeader';
import FansSectionWrapper from '../containers/FansSectionWrapper';

export const Fans = (props) => {
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