import {
  SORT_ORDER,
  IMG_CLICK,
  MODAL_CLOSED,
  ALL_IMGS_LOADED,
  MODAL_NEXT_BTN,
  MODAL_PREV_BTN,
  MODAL_IMG_LOADED,
  DOG_BREED_TOGGLED,
  HEADER_IMG_LOADED,
  IMG_DRAG_ENTER,
  IMG_DRAG_LEAVE,
  IMG_DRAG_DROP,
  FILTER_CHANGED

} from '../constants.js';
import { gridItemsMap, sortOptionsChanged, readSortCookie } from '../Utils.js';
import { gridItemsData } from '../gridItemsData';

// =============================================================================
// State
// =============================================================================
const initialState = {
  sortFilter: readSortCookie(),
  blurEffect: 'non-blurred',
  gridVisibility: 'hidden',
  isModalOn: false,
  modalImgId: '',
  modalDisplayStyle: 'none',
  dogBreedEnabled: false,
  headerImgBorderStyle: '',
  headerImgId: 'id02',
  headerImgClassName: 'header-img',
  filterString: ''
}

// =============================================================================
// - This is a reducer, a pure function with (state, action) signature.
// - Based on an action it transforms the state into the next state.
// - Since it should contain the business logic - this is where the sort takes place.
// - To avoid mutating the original state we use Object.assign() that take an empty object
//   and a list of objects to be merged. 
// =============================================================================
export const mainReducer = (state = initialState, action) => {
  let modalImgId = '';

  let payload = action.payload;

  switch (action.type) {
    case SORT_ORDER:
      sortOptionsChanged(payload);
      return Object.assign({}, state, {
        sortFilter: payload
      });

    case IMG_CLICK:
      return Object.assign({}, state, {
        modalImgId: payload,
        blurEffect: 'blurred',
        modalDisplayStyle: 'none',
        isModalOn: true
      });

    case MODAL_CLOSED:
      return Object.assign({}, state, {
        modalImgId: '',
        blurEffect: 'un-blurred',
        isModalOn: false
      });

    case ALL_IMGS_LOADED:
      return Object.assign({}, state, {
        gridVisibility: 'visible'
      });

    case MODAL_PREV_BTN:
    case MODAL_NEXT_BTN:
      return Object.assign({}, state, {
        modalImgId: payload.modalImgId,
        modalDisplayStyle: payload.modalDisplayStyle
      });


    case MODAL_IMG_LOADED:
      return Object.assign({}, state, {
        modalDisplayStyle: payload.modalDisplayStyle,
      });

    case DOG_BREED_TOGGLED:
      return Object.assign({}, state, {
        dogBreedEnabled: !state.dogBreedEnabled,
      });

    case HEADER_IMG_LOADED:
      return Object.assign({}, state, {
        headerImgBorderStyle: payload,
      });

    case IMG_DRAG_ENTER:
    case IMG_DRAG_LEAVE:
      return Object.assign({}, state, {
        headerImgClassName: payload,
      });

    case IMG_DRAG_DROP:
      return Object.assign({}, state, {
        headerImgId: payload.draggedImgId,
        headerImgClassName: payload.headerImgClassName
      });

    case FILTER_CHANGED:
      return Object.assign({}, state, {
        filterString: payload,
      });

    default:
      sortOptionsChanged(initialState.sortFilter);
      return state
  }
}