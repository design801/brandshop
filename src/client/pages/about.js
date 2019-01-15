import React from 'react';

import styles from '@styles/base.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

import { findTheme } from '@lib/admin';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

const cx = classNames.bind(styles);

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

import FixedMenu from '@components/common/FixedMenu';
import ReactPageScroller from "react-page-scroller";
import ReactPagination from '@components/common/PageScrollerIndigator';

//마지막 footer 
import BottomCompany from '@components/common/BottomCompany';
//page 스크롤 
import PageContainerAbout from '@containers/PageContainerAbout';
  
const transitionDuration = {
  enter: 1000,
  exit: 1000,
};

class About extends React.Component {  

  state = {
    scrollPosition : 0,
    totalWidth: 0,
    scrollIndex:0,
  }

  handle_scroll = ( left , top , width , height) => {         
    this.setState({ scrollPosition : left , totalWidth : width  });      
  }

  goToPage = (pageNumber) => {
    console.log("pageNumber=" + pageNumber);
    console.log(this.reactPageScroller);
    this.reactPageScroller.handlePage(pageNumber);
    this.setState({ scrollIndex : pageNumber   });      
  }
 
  pageOnChange = (pageNumber) => {        
    this.setState({ scrollIndex : pageNumber   });      
  }

  updateSize = (height) => {
    console.log('updateSize : ' + height);
    this.reactPageScroller.updateSize(height);
  }

  componentDidMount = async() => {        
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);

    
     const recv = await findTheme();    
     const { UiActions } = this.props;    
     console.log(recv.theme);     
     UiActions.setThemeData({theme: recv.theme});
    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  }

  updateHeight = () => {
    const { UiActions } = this.props;    
    UiActions.setUiData({width: window.innerWidth, height: window.innerHeight});
  }


  render() {    
    const { theme } = this.props;

    if(theme === '')
      return (<div></div>);

    return (
      <div>
      <DesktopBreakpoint>
      <PageContainerAbout ref={c => this.reactPageScroller = c} page= { theme.about.length + 1  } pageOnChange = {this.pageOnChange} pageMove={this.goToPage} pageIndex={this.state.scrollIndex + 1} />    
      </DesktopBreakpoint>

      <TabletBreakpoint>
      <PageContainerAbout ref={c => this.reactPageScroller = c} page= { theme.about.length + 1  }  pageOnChange = {this.pageOnChange} pageMove={this.goToPage} pageIndex={this.state.scrollIndex + 1} />    
      </TabletBreakpoint>

      <PhoneBreakpoint>
      <PageContainerAbout ref={c => this.reactPageScroller = c} page= { theme.aboutMobile.length + 1  }  pageOnChange = {this.pageOnChange} pageMove={this.goToPage} pageIndex={this.state.scrollIndex + 1} />    
      </PhoneBreakpoint>


        
        {/* <ReactPagination  pageCount = {5} pageIndex = { this.state.scrollIndex + 1 }  pageMove = {this.goToPage} direction="column" justify="space-between" /> */}
        {/* <FixedMenu pageMove={this.goToPage} pageIndex={this.state.scrollIndex} /> */}
        { /* <BottomCompany height = { this.props.height * 0.1 } /> */ }
        <BottomCompany/>
      </div>
    )  
  }
}


export default connect(
  (state) => ({
    width: state.ui.get('ui').get('width'),    
    height: state.ui.get('ui').get('height'),   
    theme:state.ui.get('ui').get('theme'),    
  }),
  (dispatch) => ({
    UiActions: bindActionCreators(uiActions, dispatch),    
  })
)(About);
