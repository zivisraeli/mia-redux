import {
  SORT_ORDER,
  IMG_CLICK,
  MODAL_CLOSED,
  ALL_IMGS_LOADED,
  MODAL_NEXT_BTN,
  MODAL_PREV_BTN,
  MODAL_IMG_LOADED,
  DOG_BREED_TOGGLED,
  HEADER_IMG_LOADED
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
  headerImgId: 'id02'
}

// =============================================================================
// - This is a reducer, a pure function with (state, action) signature.
// - Based on an action it transforms the state into the next state.
// - Since it should contain the business logic - this is where the sort takes place.
// - To avoid mutating the original state we use Object.assign() that take an empty object
//   and a list of objects to be merged. 
// =============================================================================
export const reducer = (state = initialState, action) => {
  let modalImgId = '';
  let modalImgIndex = 0;

  switch (action.type) {
    case SORT_ORDER:
      sortOptionsChanged(action.payload);
      return Object.assign({}, state, {
        sortFilter: action.payload
      });

    case IMG_CLICK:
      return Object.assign({}, state, {
        modalImgId: action.payload,
        blurEffect: 'blurred',
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

    case MODAL_NEXT_BTN:
      modalImgId = state.modalImgId;
      modalImgIndex = gridItemsMap.get(modalImgId);
      modalImgIndex = (modalImgIndex + 1) === gridItemsData.length ? 0 : modalImgIndex + 1;
      modalImgId = gridItemsData[modalImgIndex].id;

      return Object.assign({}, state, {
        modalImgId: modalImgId,
        modalDisplayStyle: 'none'
      });

    case MODAL_PREV_BTN:
      modalImgId = state.modalImgId;
      modalImgIndex = gridItemsMap.get(modalImgId);
      modalImgIndex = modalImgIndex === 0 ? gridItemsData.length - 1 : modalImgIndex - 1;
      modalImgId = gridItemsData[modalImgIndex].id;

      return Object.assign({}, state, {
        modalImgId: modalImgId,
        modalDisplayStyle: 'none'
      });

    case MODAL_IMG_LOADED:
      return Object.assign({}, state, {
        modalDisplayStyle: 'block'
      });

    case DOG_BREED_TOGGLED:
      return Object.assign({}, state, {
        dogBreedEnabled: !state.dogBreedEnabled,
      });
    case HEADER_IMG_LOADED:
      // =============================================================================
      // Without this feature the border will be drawn first as a straight line and then 
      // the image would appear. And so, I need to waiting for the image to be loaded first. 
      // =============================================================================
      return Object.assign({}, state, {        
        headerImgBorderStyle: '1px solid black',
      });

    default:
      sortOptionsChanged(initialState.sortFilter);
      return state
  }
}