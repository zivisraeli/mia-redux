import { SORT_ORDER } from './constants.js';
import { sortOptionsChangedCallback, readSortCookie } from './Utils.js';

// =============================================================================
// State
// =============================================================================
const initialState = {
  sortFilter: readSortCookie(),
}

// =============================================================================
// - This is a reducer, a pure function with (state, action) signature.
// - Based on an action it transforms the state into the next state.
// - Since it should contain the business logic - this is where the sort takes place.
// - To avoid mutating the original state we use Object.assign() that take an empty object
//   and a list of objects to be merged. 
// =============================================================================
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_ORDER:
      sortOptionsChangedCallback(action.payload);
      return Object.assign({}, state, {
        sortFilter: action.payload
      });
    case 'LIKE-TOGGLE':
      return Object.assign({}, state, {
        itemLiked: action.itemLiked
      });
    default:
      sortOptionsChangedCallback(initialState.sortFilter);
      return state
  }
}

