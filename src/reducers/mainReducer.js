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
import { getCookie } from '../Utils.js';
import { gridItemsData } from '../gridItemsData';

// =============================================================================
// Find the select option element pointed to by the cookie.
// The cookie string is the same as the options' id. 
// - read 'sort' cookie 
// - sort the gridItems array.
// - return the sortCookie.
// =============================================================================
const readSortCookie = () => {
  let sortCookie = getCookie('sort');
  if (sortCookie === null) {
    sortCookie = 'likes-1'; // default value
  }

  let sortArr = sortCookie.match('(.*)([-+]1)');
  let sortAttr = sortArr[1];
  let sortDirection = sortArr[2];

  sortGridItems(sortAttr, sortDirection);
  return sortCookie;
}

// =============================================================================
// This function takes 2 parameters, compare them and return true or false.
// Javascript sort function take a "compare" function as a parameter. 
// Since gridItemsData is imported, Javascript would allow to change it.
// An imported symbol is akin to having a const symbol. 
// =============================================================================
const sortGridItems = (sortAttr, sortDirection) => {
  let sortedGridItems = gridItemsData.sort((item1, item2) => {
    let retVal = 0;
    if (sortAttr === "captions") {
      retVal = item1.caption.toUpperCase() > item2.caption.toUpperCase() ? 1 : -1;
    } else {
      retVal = item1.likeCount > item2.likeCount ? 1 : -1
    }
    return retVal * sortDirection;
  });

  // Since gridItemsData is imported I can't change it by doing gridItemsData = sortedGridItems
  // Rather I need to change the individual elements.
  sortedGridItems.forEach((gridItem, index) => {
    gridItemsData[index] = gridItem;
  });
}

// =============================================================================
// Selfies component provides the sortOptionsChangedCallback method to its children so 
// upon changing the sort option (in the SelfiesHeaderSortOptions), this component is notifed.
// Alternatively, I could've made the component listens to onChange event (that will bubble 
// up from the SelfiesHeaderSortOptions), however, the sort option can change not 
// necessarily as a result of an event; initally it is changed based on the cookie value. 
// =============================================================================
 const sortOptionsChanged = (sortValue) => {
  let sortAttr = '';
  let sortDirection = '';

  switch (sortValue) {
    case 'likes+1':
      sortAttr = 'likes';
      sortDirection = 1;
      break;
    case 'likes-1':
      sortAttr = 'likes';
      sortDirection = -1;
      break;
    case 'captions+1':
      sortAttr = 'captions';
      sortDirection = 1;
      break;
    case 'captions-1':
      sortAttr = 'captions';
      sortDirection = -1;
      break;
    default:
      break;
  }

  sortGridItems(sortAttr, sortDirection);
}

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