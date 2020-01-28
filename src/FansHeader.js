import React from 'react';

class FansHeader extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Join My Fan Club!</h1>
        <section id="form-header">
          <ul className="customed-ul">
            <li>By joining my mailing list, you will get occasional e-mails.</li>
            <li>You'll receive exciting news about special events, my whereabouts, new images, and <i>all the news that's fit to print.</i></li>
            <li>You will not revieve more then one e-mail a week.</li>
            <li>I respect your privacy!</li>
          </ul>
        </section>
      </React.Fragment>
    );
  }
}

export default FansHeader;