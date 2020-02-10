import React from 'react';

// =============================================================================
// Since SelfiesSortOptionsPresentation is now split from Redux, it contains no state relate code.
// As such I don't need it to be a "heavy-weight" React component but rather a stateless functional component.
// =============================================================================
export const SelfiesSortOptions = (props) => {
  let optMap = {
    'likes+1': 'Like number; Asc.',
    'likes-1': 'Like number; Desc.',
    'captions+1': 'Caption; Asc.',
    'captions-1': 'Caption; Desc.',
  }

  return (<div id="select-option-div" >
            <select id="select-sort" 
                    value={optMap[props.sortFilter]} 
                    onChange={props.onSortChange}>
              <option id="likes+1">{optMap['likes+1']}</option>
              <option id="likes-1">{optMap['likes-1']}</option>
              <option id="captions+1">{optMap['captions+1']}</option>
              <option id="captions-1">{optMap['captions-1']}</option>
            </select>
           </div>);
}