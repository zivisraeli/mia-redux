import { gridItemsData } from './gridItemsData';

// =============================================================================
// get cookie 
// =============================================================================
export const getCookie = (name) => {
  // since document.cookie returns all cookie, match would filter out the one I need.
  // the match regex: cookie name should follow an equal sign AND NOT a space of a semi-colon.
  // with 'capturing groups' we get an array with the array[0] is the entire expression value.
  // the rest of the values are the group's value.
  let value = document.cookie.match('(?:^|;)\\s?' + name + '=([^\\s;]*)');
  return value ? value[1] : null;
}

// =============================================================================
// set cookie 
// =============================================================================
export const setCookie = (name, value, days = 365) => {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

// =============================================================================
// Find the select option element pointed to by the cookie.
// The cookie string is the same as the options' id. 
// - read 'sort' cookie 
// - sort the gridItems array.
// - return the sortCookie.
// =============================================================================
export const readSortCookie = () => {
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
// - the gridMap purpose is to map imgId to it's location in the gridItems so
//   times when I need to search for it I don't need to loop through the array. 
//   the map is populated during renderGrid. 
// =============================================================================
export let gridItemsMap = new Map();
export let globalModalImg = {};

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
export const sortOptionsChanged = (sortValue) => {
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