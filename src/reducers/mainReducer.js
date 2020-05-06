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
  FILTER_CHANGED,
  IMG_TOUCH_END,
  FORM_CONFIRMED,
  FORM_MODAL_EDIT

} from '../constants.js';
import { getCookie } from '../Utils.js';
import { gridItems } from '../gridItemsData';


// =============================================================================
// This function takes 2 parameters:
//   1. attr: what attribute I wanna sort by (likes, caption, etc)
//   2. direction: what direction the sort is (ascending or descending)
// Javascript sort function take a "compare" function as a parameter. 
// =============================================================================
const sortGridItems = (sortAttr, sortDirection) => {
  let sortedGridItems = gridItems.data.sort((item1, item2) => {
    let retVal = 0;
    if (sortAttr === "captions") {
      retVal = item1.caption.toUpperCase() > item2.caption.toUpperCase() ? 1 : -1;
    } else {
      retVal = item1.likeCount > item2.likeCount ? 1 : -1
    }
    return retVal * sortDirection;
  });

  gridItems.data = sortedGridItems;
}

// =============================================================================
// Upon SORT_ORDER action I map the sort value i.e. like+1, into 2 distinct values:
// 1. the attr
// 2. the direction
// Then I sort the gridItems array
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
// Read the sort option element pointed to by the cookie.
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
// When reading the headerImgId for the very first time, the cookie is empty.
// In that case, use img id 'id02' as a default.
// =============================================================================
const readHeaderImgCookie = () => {
  let headerImgIdCookie = getCookie("headerImgId");
  let headerImgId = headerImgIdCookie === null ? 'id02' : headerImgIdCookie;
  return headerImgId;
}

// =============================================================================
// Initial states:
// Here I read the sort and header-img cookies. It's the wrong location to place
// this logic since I would rather keep the components business logic in their respective
// location. However, since I need to set the store's state I decided to leave it here.
// Me don't like it. At all. 
// =============================================================================
const initialState = {
  sortFilter: readSortCookie(),
  headerImgId: readHeaderImgCookie(),
  headerImgBorderStyle: '',
  headerImgClassName: 'header-img',
  blurEffect: 'non-blurred',
  gridVisibility: 'hidden',
  isModalOn: false,
  modalImgId: '',
  modalDisplayStyle: 'none',
  dogBreedEnabled: false,
  filterString: ''
}

// =============================================================================
// - This is a reducer, a pure function with (state, action) signature.
// - Based on an action it transforms the state into the next state.
// - To avoid mutating the original state I use Object.assign() that takes an 
//   empty object and a list of objects to be merged. 
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

    case IMG_TOUCH_END:
    case IMG_DRAG_DROP:
      return Object.assign({}, state, {
        headerImgId: payload.imgId,
        headerImgClassName: payload.headerImgClassName
      });

    case FILTER_CHANGED:
      return Object.assign({}, state, {
        filterString: payload,
      });

    case FORM_CONFIRMED:
    case FORM_MODAL_EDIT:
      return Object.assign({}, state, {
        formModalDisplayStyle: payload.formModalDisplayStyle,
      });
      
    default:
      return state;
  }
}