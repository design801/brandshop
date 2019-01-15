import React from 'react';


import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

import { withRouter } from 'next/router';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';


import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

import FixedMenu from '@components/common/FixedMenu';
import ReactPageScroller from "react-page-scroller";
import ReactPagination from '@components/common/PageScrollerIndigator';

//마지막 footer 
import BottomCompany from '@components/common/BottomCompany';
//page 스크롤 
import PageContainer from '@containers/PageContainer';

import { findID } from '@lib/admin';

import styles1 from '@styles/base.scss';

const cx = classNames.bind(styles1);

import 'babel-polyfill';

  
const transitionDuration = {
  enter: 1000,
  exit: 1000,
};

class archiveLink extends React.Component {  

  state = {
    scrollPosition : 0,
    totalWidth: 0,
    scrollIndex:0,

    query_id:'',
    query_title:'',

  }

  componentDidMount = async() => {        
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);

    if(this.props.router.query !== undefined) {      
      console.log(this.props.router.query.id);      
      console.log(this.props.router.query.title);      
      this.setState({ query_id : this.props.router.query.id   });      
      this.setState({ query_title : this.props.router.query.title   });      
    }

    


    console.log("this.props.theme" + this.props.theme);

      const recv = await findID(this.props.router.query.id);    
      console.log(recv);
      console.log(recv.theme);      
      const { UiActions } = this.props;    
      UiActions.setThemeData({theme: recv.theme});      
      console.log("!23");
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
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

  updateHeight = () => {
    const { UiActions } = this.props;    
    UiActions.setUiData({width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    // const { classes } = this.props;    

    const { theme } = this.props;        

    console.log("archilink render");
    console.log(this.props.theme);
    if(theme === '' || theme === undefined)
        return ( <div></div>);

    return (
      <div /*className={classes.main}*/>
        <PageContainer ref={c => this.reactPageScroller = c} page= { theme.brand.length + 3  }  pageOnChange={this.pageOnChange} pageIndex={this.state.scrollIndex + 1}  pageMove={this.goToPage} isSlide={this.props.isSlide} isMoved = { true } title = { this.state.query_title}/>            
        <BottomCompany />
      </div>
    )  
  }
}


export default withRouter(connect(
  (state) => ({
    width: state.ui.get('ui').get('width'),    
    height: state.ui.get('ui').get('height'),   
    isSlide: state.ui.get('ui').get('isSlide'),    
    theme:state.ui.get('ui').get('theme'),    
  }),
  (dispatch) => ({
    UiActions: bindActionCreators(uiActions, dispatch),    
  })
)(archiveLink));
