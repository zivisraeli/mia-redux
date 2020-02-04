import React from 'react';

class SelfiesHeaderSortOptions extends React.Component {
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
                    value={m[this.props.sortOptionsSelectValue]} 
                    onChange={this.props.onSortChange}>
              <option id="likes+1">{m['likes+1']}</option>
              <option id="likes-1">{m['likes-1']}</option>
              <option id="captions+1">{m['captions+1']}</option>
              <option id="captions-1">{m['captions-1']}</option>
            </select>
           </div>);
  }
}

export default SelfiesHeaderSortOptions;