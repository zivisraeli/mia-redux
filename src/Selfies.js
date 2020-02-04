import React from 'react';

import SelfiesHeader from './SelfiesHeader';
import SelfiesSection from './SelfiesSection';
import Footer from './Footer';
import { gridItemsData } from './gridItemsData';
import { getCookie } from './Utils.js';
import { connect } from 'react-redux';

export const gridItemsMap = new Map();

export class Selfies extends React.Component {

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

    //this.sortOptionsChangedCallback = this.sortOptionsChangedCallback.bind(this);
  }

  /*
  componentDidMount() {
    store.subscribe(this.renderBridge);
  }

  renderBridge = () => {
    this.setState({sortValue: store.getState().sortFilter});
  }
  */

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

    //this.sortGridItems(sortAttr, sortDirection);
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

  render() {
    return (
      <React.Fragment>
        <main id="grid-section">
          <SelfiesHeader sortOptionsSelectValue={this.props.sortFilter} />
          <SelfiesSection />
        </main>
        <Footer />        
      </React.Fragment>
    );
  }
}


const mapStateToProps = function(state) {
  return {
    sortFilter: state.sortFilter
  }
}

export default connect(mapStateToProps)(Selfies);