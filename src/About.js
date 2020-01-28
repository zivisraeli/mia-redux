import React from 'react';

import AboutHeader from './AboutHeader';
import AboutSection from './AboutSection';
import Footer from './Footer';

class About extends React.Component {
  render() {
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
}

export default About;