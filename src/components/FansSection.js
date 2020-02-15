import React from 'react';

export const FansSection = (props) => {
  // =============================================================================
  // - the 'for' attribute should be named 'htmlFor' in React.
  // - the onDogBreedToggled state is maintained throughout the session.
  //   as so, it should determine the 'checked' radio button of the dog-owner input.
  // =============================================================================
  let checkedYes = '';
  let checkedNo = 'checked';
  let dogBreedLabelClass = 'dog-breed-disabled';
  let dogBreedInputDisabled = 'disabled';
  if (props.dogBreedEnabled) {
    checkedYes = 'checked';
    checkedNo = '';
    dogBreedLabelClass = 'dog-breed-enabled';
    dogBreedInputDisabled = '';
  }

  return (
    <section className="middle-section">
	    <form action="" method="get">
	      <div>
	        <label htmlFor="name-input"><span className="required">*</span>Name:</label>
	        <input type="text" id="name-input" required />
	      </div>
	      <div>
	        <label htmlFor="email-input"><span className="required">*</span>Email:</label>
	        <input type="email" id="email-input" required />
	      </div>
	      <div>
	        <label htmlFor="tel-input">Telephone:</label>
	        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="tel-input" />
	      </div>
	      <div id="phone-comment">
	        <span>Format: xxx-xxx-xxxx</span>
	      </div>
	      <div>
	        <label htmlFor="radio-btns-div">Dog Owner:</label>
	        <div id="radio-btns-div">
	          <input type="radio" name="dog-owner" value="Yes" onClick={props.onDogBreedToggled} checked={checkedYes} />Yes
	          <input type="radio" name="dog-owner" value="No" onClick={props.onDogBreedToggled}  checked={checkedNo} />No
	        </div>
	      </div>
	      <div>
	        <label id="dog-breed-label" className={dogBreedLabelClass}>Dog Breed:</label>
	        <input type="text" id="dog-breed-input" disabled={dogBreedInputDisabled} required />
	      </div>
	      <div>
	        <label htmlFor="tel-input">Comment:</label>
	        <textarea type="text"></textarea>
	      </div>
	      <div className="button">
	        <button className="btn btn-primary" type="submit"><i className="fa fa-paw"></i>&nbsp;&nbsp;Submit</button>
	      </div>
	    </form>
	  </section>
  );
}