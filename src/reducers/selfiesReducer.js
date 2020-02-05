import { SORT_ORDER, 
	       IMG_CLICK, 
	       MODAL_CLOSED, 
	       ALL_IMGS_LOADED } from '../constants.js';
import { sortOptionsChanged, readSortCookie } from '../Utils.js';

// =============================================================================
// State
// =============================================================================
const initialState = {
  sortFilter: readSortCookie(),
  modalImgId: '',
  blurEffect: 'non-blurred',
  gridVisibility: 'hidden'
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
      sortOptionsChanged(action.payload);
      return Object.assign({}, state, {
        sortFilter: action.payload
      });
    case IMG_CLICK:
      return Object.assign({}, state, {
        modalImgId: action.payload,
        blurEffect: 'blurred'
      });
    case MODAL_CLOSED:
      return Object.assign({}, state, {
        modalImgId: '',
        blurEffect: 'un-blurred'
      });
    case ALL_IMGS_LOADED:
      return Object.assign({}, state, {
        gridVisibility: 'visible'        
      });
    default:
      sortOptionsChanged(initialState.sortFilter);
      return state
  }
}