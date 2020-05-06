import React from 'react';

export const SelfiesFilter = (props) => {
  return (
    <React.Fragment>
      <input id="filter-input" type="text"
                    onChange={props.onFilterChange} />
    </React.Fragment>
  );
}