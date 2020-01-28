import React from 'react';
import footerPawImg from "./images/footer-paw.png";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <footer>
        <span>Disclaimer: This site is using cookies.</span>
        <span id="footer-divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span id="footer-copyright">COPYRIGHTS &copy; 2019 Mia Israeli All Rights Reserved.&nbsp;
          <img src={footerPawImg} alt="footer-paw" />
        </span>
      </footer>
    );
  }
}

export default Footer;