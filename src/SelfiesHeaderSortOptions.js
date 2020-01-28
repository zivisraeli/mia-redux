import React from 'react';

import { setCookie } from './Utils.js';

class SelfiesHeaderSortOptions extends React.Component {
  // =============================================================================
  // React's controlled element "select" allows setting the property "value" 
  // which would select the selected entry (option).
  // =============================================================================
  constructor(props) {
    super(props);

    let selectMap = {
      'likes+1': 'Like number; Asc.',
      'likes-1': 'Like number; Desc.',
      'captions+1': 'Caption; Asc.',
      'captions-1': 'Caption; Desc.',
    };

    this.state = {
      sortValue: this.props.sortOptionsInitialValue,
      selectMap: selectMap
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
    this.setState({ sortValue: selectedOptionId });
    this.props.sortOptionsChangedCallback(selectedOptionId);
  }

  render() {
    let m = this.state.selectMap;

    return (<div id="select-option-div" >
            <select id="select-sort" 
                    value={m[this.state.sortValue]} 
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