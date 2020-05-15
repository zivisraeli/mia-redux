import React from 'react';
import { connect } from 'react-redux';
import {
  DOG_BREED_TOGGLED,
  FORM_CONFIRMED,
  FORM_MODAL_EDIT
} from '../constants';
import { FansSection } from '../components/FansSection';

export class FansSectionWrapper extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.formValuesObject = {};
  }

  validate() {
    let isValidForm = this.form.current.reportValidity();

    if (isValidForm) {
      this.formValuesObject.name = this.form.current.elements[0].value;
      this.formValuesObject.email = this.form.current.elements[1].value;
      this.formValuesObject.phone = this.form.current.elements[2].value;
      this.formValuesObject.owner = this.form.current.elements[3].checked ? "Yes" : "No";
      this.formValuesObject.breed = this.form.current.elements[5].value;
      this.formValuesObject.comment = this.form.current.elements[6].value;
      this.props.onFormConfirmed();
    };
  }

  render() {
    return (
      <section className="middle-section">
        <form action="https://zivisraeli.github.io/mia-redux" method="get" ref={this.form} >
          <FansSection dogBreedEnabled={this.props.dogBreedEnabled} 
                       onDogBreedToggled={this.props.onDogBreedToggled}
                       formModalDisplayStyle={this.props.formModalDisplayStyle}
                       onFormModalEdit={this.props.onFormModalEdit}
                       formValuesObject={this.formValuesObject}
                       validateFunc={this.validate}
                       />
        </form>
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    dogBreedEnabled: state.dogBreedEnabled,
    formModalDisplayStyle: state.formModalDisplayStyle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDogBreedToggled: () => {
      return dispatch({
        type: DOG_BREED_TOGGLED
      });
    },

    onFormConfirmed: () => {
      return dispatch({
        type: FORM_CONFIRMED,
        payload: { formModalDisplayStyle: 'block' }
      });
    },

    onFormModalEdit: () => {
      return dispatch({
        type: FORM_MODAL_EDIT,
        payload: { formModalDisplayStyle: 'none' }
      });
    },
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(FansSectionWrapper);