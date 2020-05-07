import React from 'react';

import { AboutHeader } from './AboutHeader';
import { AboutSection } from './AboutSection';
import { Footer } from './Footer';

import '../css/about.css';

export const About = (props) => {
  return (
    <React.Fragment>
      <main>
        <AboutHeader />
        <AboutSection />
      </main>
      <Footer />
    </React.Fragment>
  );
}