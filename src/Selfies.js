import React from 'react';

import SelfiesHeader from './SelfiesHeader';
import SelfiesSection from './SelfiesSection';
import Footer from './Footer';
import { gridItemsData } from './gridItemsData';
import { getCookie } from './Utils.js';

export const gridItemsMap = new Map();

class Selfies extends React.Component {

  // =============================================================================
  // The component needs to run the following 2 tasks before rendering:
  // 1. Read the cookie to get the liked images.
  // 2. Read the cookie to get the sort order. 
  // =============================================================================
  constructor(props) {
    super(props);

    this.readLikesCookie();
    let initialSortValue = this.readSortCookie();

    this.state = {
      sortValue: initialSortValue      
    }

    this.sortOptionsChangedCallback = this.sortOptionsChangedCallback.bind(this);
  }

  // =============================================================================
  // This function takes 2 parameters, compare them and return true or false.
  // Javascript sort function take a "compare" function as a parameter. 
  // Since gridItemsData is imported, Javascript would allow to change it.
  // An imported symbol is akin to having a const symbol. 
  // =============================================================================
  sortGridItems = (sortAttr, sortDirection) => {
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
  // Find the select option element pointed to by the cookie.
  // The cookie string is the same as the options' id. 
  // - read 'sort' cookie 
  // - sort the gridItems array.
  // - return the sortCookie.
  // =============================================================================
  readSortCookie = () => {
    let sortCookie = getCookie('sort');
    if (sortCookie === null) {
      sortCookie = 'likes-1'; // default value
    }

    let sortArr = sortCookie.match('(.*)([-+]1)');
    let sortAttr = sortArr[1];
    let sortDirection = sortArr[2];

    this.sortGridItems(sortAttr, sortDirection);
    return sortCookie;
  }

  // =============================================================================
  // readLikesCookie would read 'likes' cookie and update the state.gridItems array accordingly. 
  // It would also increment the likeCount by one. 
  // =============================================================================
  readLikesCookie = () => {
    let likeArray = [];
    let likeCookie = getCookie('likes');
    if (likeCookie != null) {
      likeArray = JSON.parse(likeCookie);
    }
    
    likeArray.forEach((id) => {
      let gridElem = gridItemsData.find((elem) => {
        return elem.id === id;
      });
      if (gridElem != null) {
        gridElem.isLiked = true;
        gridElem.likeCount++;
      }
    });
  }

  // =============================================================================
  // Selfies component provides the sortOptionsChangedCallback method to its children so 
  // upon changing the sort option (in the SelfiesHeaderSortOptions), this component is notifed.
  // Alternatively, I could've made the component listens to onChange event (that will bubble 
  // up from the SelfiesHeaderSortOptions), however, the sort option can change not 
  // necessarily as a result of an event; initally it is changed based on the cookie value. 
  // =============================================================================
  sortOptionsChangedCallback = (sortValue) => {
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

    this.sortGridItems(sortAttr, sortDirection);
    this.setState({sortValue: sortValue});
  }

  render() {
    return (
      <React.Fragment>
        <main id="grid-section">
          <SelfiesHeader sortOptionsInitialValue={this.state.sortValue}
                         sortOptionsChangedCallback={this.sortOptionsChangedCallback}/>
          <SelfiesSection />
        </main>
        <Footer />        
      </React.Fragment>
    );
  }
}

export default Selfies;