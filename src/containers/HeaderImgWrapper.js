import React from 'react';
import { connect } from 'react-redux';
import { HEADER_IMG_LOADED } from '../constants';

import { getCookie } from '../Utils.js';
import { HeaderImg } from '../components/HeaderImg';

export class HeaderImgWrapper extends React.Component {

  // =============================================================================
  // The header's image is determined by the headerImgId cookie.
  // If not found, use this.state.headerImgId default value.
  // =============================================================================  
  render() { 
    let headerImgId = getCookie("headerImgId");
    headerImgId = headerImgId === null ? this.props.headerImgId : headerImgId;
    let headerImgSrc = `./images/mia-small-${headerImgId}.jpg`;

    return (
      <HeaderImg headerImgSrc={headerImgSrc}                 
                 headerImgBorderStyle={{border: this.props.headerImgBorderStyle}} 
                 onHeaderImgLoaded={this.props.onHeaderImgLoaded} />     
    ); 
  }
}

const mapStateToProps = (state) => {
  return {
    headerImgBorderStyle: state.headerImgBorderStyle,
    headerImgId: state.headerImgId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHeaderImgLoaded: (event) => {
      return dispatch({ type: HEADER_IMG_LOADED });
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(HeaderImgWrapper);