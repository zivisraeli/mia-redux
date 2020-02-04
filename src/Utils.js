import { createStore } from 'redux';
import { connect } from 'react-redux';
import { gridItemsData } from './gridItemsData';
import Selfies from './Selfies';



// =============================================================================
// cookie related functions
// =============================================================================
export const getCookie = (name) => {
  // since document.cookie returns all cookie, match would filter out the one I need.
  // the match regex: cookie name should follow an equal sign AND NOT a space of a semi-colon.
  // with 'capturing groups' we get an array with the array[0] is the entire expression value.
  // the rest of the values are the group's value.
  let value = document.cookie.match('(?:^|;)\\s?' + name + '=([^\\s;]*)');
  return value ? value[1] : null;
}

export const setCookie = (name, value, days = 365) => {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

// =============================================================================
// =============================================================================
// R E D U X
// =============================================================================
// =============================================================================

// =============================================================================
// - the gridMap purpose is to map imgId to it's location in the gridItems so
//   times when I need to search for it I don't need to loop through the array. 
//   the map is populated during renderGrid. 
// =============================================================================
export const gridItemsMap = new Map();

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

  gridItemsMap.clear();

  // Since gridItemsData is imported I can't change it by doing gridItemsData = sortedGridItems
  // Rather I need to change the individual elements.
  sortedGridItems.forEach((gridItem, index) => {
    gridItemsData[index] = gridItem;
    gridItemsMap.set(gridItem.id, index);
  });
}

// =============================================================================
// Selfies component provides the sortOptionsChangedCallback method to its children so 
// upon changing the sort option (in the SelfiesHeaderSortOptions), this component is notifed.
// Alternatively, I could've made the component listens to onChange event (that will bubble 
// up from the SelfiesHeaderSortOptions), however, the sort option can change not 
// necessarily as a result of an event; initally it is changed based on the cookie value. 
// =============================================================================
const sortOptionsChangedCallback = (sortValue) => {
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
// Actions
// =============================================================================
//let actions = { type: 'SORT-ORDER', filter: '' };

const SortFilters = {
  LIKESm1: 'likes-1',
  LIKESp1: 'likes+1',
  CAPTIONSm1: 'captions-1',
  CAPTIONSp1: 'captions+1'
}

// =============================================================================
// State
// =============================================================================
const initialState = {
  sortFilter: SortFilters.CAPTIONSm1,
  gridItemsMap: gridItemsMap
}

// =============================================================================
// - This is a reducer, a pure function with (state, action) signature.
// - Based on an action it transforms the state into the next state.
// - Since it should contain the business logic - this is where the sort takes place.
// - To avoid mutating the original state we use Object.assign() that take an empty object
//   and a list of objects to be merged. 
// =============================================================================
function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SORT-ORDER':
      sortOptionsChangedCallback(action.filter);
      return Object.assign({}, state, {
        sortFilter: action.filter
      });
    case 'LIKE-TOGGLE':
      return Object.assign({}, state, {
        itemLiked: action.itemLiked
      });
    default:
      sortOptionsChangedCallback(SortFilters.CAPTIONSm1);
      return state
  }
}

// =============================================================================
// - The Redux store holds the state of the app.
// - Upon creating the store the reducer is called for the first time. 
//   This is how the state initial value is set!!!
// =============================================================================
export const store = createStore(appReducer);


