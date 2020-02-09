import React from 'react';
import { connect } from 'react-redux';

import { setCookie } from './Utils.js';
import { SORT_ORDER } from './constants';

export class SelfiesHeaderSortOptions extends React.Component {
  getSelectMap() {
    return {
      'likes+1': 'Like number; Asc.',
      'likes-1': 'Like number; Desc.',
      'captions+1': 'Caption; Asc.',
      'captions-1': 'Caption; Desc.',
    };
  }

  render() {
    let m = this.getSelectMap();

    return (<div id="select-option-div" >
            <select id="select-sort" 
                    value={m[this.props.sortFilter]} 
                    onChange={this.props.onSortChange}>
              <option id="likes+1">{m['likes+1']}</option>
              <option id="likes-1">{m['likes-1']}</option>
              <option id="captions+1">{m['captions+1']}</option>
              <option id="captions-1">{m['captions-1']}</option>
            </select>
           </div>);
  }
}

const mapStateToProps = function(state) {
  return {
    sortFilter: state.sortFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSortChange: (event) => {
      let selectedIndex = event.target.selectedIndex;
      let selectedOptionId = event.target[selectedIndex].id;
      setCookie('sort', selectedOptionId);
      return dispatch({type: SORT_ORDER, payload: selectedOptionId});
    }
  }
}

export default connect(mapStateToProps, 
                       mapDispatchToProps)(SelfiesHeaderSortOptions);