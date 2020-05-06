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
    <React.Fragment>
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
        <button className="btn btn-primary" type="button" onClick={props.validateFunc} ><i className="fa fa-paw"></i>&nbsp;&nbsp;Confirm</button>
      </div>

      <section id="modal-section" style={{display: props.formModalDisplayStyle}}>
        <div id="modal-content">
          <span id="header">Please review your data. Submit or keep editing. </span>
          <img id="border" src="images/border1.png"></img>
          <label class="title">Names:</label><label class="value" id="name-display">{props.formValuesObject.name}</label>
          <label class="title">Email:</label><label class="value" id="email-display">{props.formValuesObject.email}</label>
          <label class="title">Telephone:</label><label class="value" id="tel-display">{props.formValuesObject.phone}</label>
          <label class="title">Dog Owner:</label><label class="value" id="owner-display">{props.formValuesObject.owner}</label>
          <label class="title">Dog Bread:</label><label class="value" id="dog-breed-display">{props.formValuesObject.breed}</label>
          <label class="title">Comment:</label><label class="value" id="comment-display">{props.formValuesObject.comment}</label>

          <button id="modal-submit-btn" class="btn btn-primary" type="submit"><i class="fa fa-paw"></i>&nbsp;&nbsp;Submit</button>
          <button id="modal-edit-btn" class="btn btn-primary" type="button" onClick={props.onFormModalEdit}>&nbsp;&nbsp;Edit</button>
        </div>
      </section>
    </React.Fragment>
  );
}