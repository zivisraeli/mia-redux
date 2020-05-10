import React from 'react';
import footerPawImg from "../images/footer-paw.png";

export const Footer = (props) => {
  return (
    <footer>
      <span>Disclaimer: This site is using cookies.</span>
      <span id="footer-divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span id="footer-copyright">COPYRIGHTS &copy; 2020 Mia Israeli All Rights Reserved.&nbsp;
        <img src={footerPawImg} alt="footer-paw" />
      </span>
    </footer>
  );
}