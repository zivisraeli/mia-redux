import React from 'react';

class FansSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogBreedEnabled: false,
    }
  }

  dogOwnerEventHandler = () => {
      this.setState({dogBreedEnabled: !this.state.dogBreedEnabled});      
  }

  // =============================================================================
  // - The default cheched value in react is, well defaultChecked...
  // - The 'for' attribute should be named 'htmlFor' in Reac.
  // - Since dogOwnerEventHandler is a callback function and the 'this' element is referenced, 
  //   it must be declared as an arrow-function rather then regular/expression-function 
  //   (in which case, binding would be necessary).
  // =============================================================================
  render() {
  	let dogBreedClass = this.state.dogBreedEnabled ? 'dog-breed-enabled' : 'dog-breed-disabled';
  	let disabled = this.state.dogBreedEnabled ? '' : 'disabled';

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
	            <input type="radio" name="dog-owner" value="Yes" onClick={this.dogOwnerEventHandler} />Yes
	            <input type="radio" name="dog-owner" value="No" onClick={this.dogOwnerEventHandler} defaultChecked />No
	          </div>
	        </div>
	        <div>
	          <label id="dog-breed-label" className={dogBreedClass}>Dog Breed:</label>
	          <input type="text" id="dog-breed-input" disabled={disabled} required />
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
}

export default FansSection;