import React from 'react';

import { setCookie, store } from './Utils.js';

class SelfiesHeaderSortOptions extends React.Component {

  getSelectMap() {
    return {
      'likes+1': 'Like number; Asc.',
      'likes-1': 'Like number; Desc.',
      'captions+1': 'Caption; Asc.',
      'captions-1': 'Caption; Desc.',
    };
  }

  // =============================================================================
  // Invoked upon selection of a new sorting option. 
  // The method:
  // 1. set the cookie accordingly
  // 2. set the state
  // 3. invokes the call back so the gird will get re-sorted.
  // =============================================================================
  sortChangeEventHandler = (event) => {
    let selectedIndex = event.target.selectedIndex;
    let selectedOptionId = event.target[selectedIndex].id;
    setCookie('sort', selectedOptionId);
    store.dispatch({type: 'SORT-ORDER', filter: selectedOptionId});
  }

  render() {
    let m = this.getSelectMap();

    return (<div id="select-option-div" >
            <select id="select-sort" 
                    value={m[this.props.sortOptionsSelectValue]} 
                    onChange={this.sortChangeEventHandler}>
              <option id="likes+1">{m['likes+1']}</option>
              <option id="likes-1">{m['likes-1']}</option>
              <option id="captions+1">{m['captions+1']}</option>
              <option id="captions-1">{m['captions-1']}</option>
            </select>
           </div>);
  }
}

export default SelfiesHeaderSortOptions;