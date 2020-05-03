import React from 'react';

export const FansHeader = (props) => {
  return (
    <React.Fragment>
      <h1>Join My Fan Club!</h1>
      <section id="form-header">
        <ul class="customed-ul">
	        <li><i class="fa fa-circle li-icon"></i>By joining my mailing list, you will get occasional e-mails.</li>
	        <li><i class="fa fa-circle li-icon"></i>You'll receive exciting news about:
          <ul class="news-about-ul">
            <li><i class="fa fa-circle"></i>Special events</li>
            <li><i class="fa fa-circle"></i>My whereabouts</li>
            <li><i class="fa fa-circle"></i>New images</li>
            <li><i class="fa fa-circle"></i>All the news that's fit to print</li>
          </ul>
        	</li>
        	<li><i class="fa fa-circle li-icon"></i>You will not recieve more then one e-mail a week.</li>
        	<li><i class="fa fa-circle li-icon"></i>I respect your privacy!</li>
        </ul>
      </section>
    </React.Fragment>
  );
}