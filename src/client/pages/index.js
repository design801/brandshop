import React from 'react';


import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

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

import { findTheme } from '@lib/admin';

import styles1 from '@styles/base.scss';

const cx = classNames.bind(styles1);

import 'babel-polyfill';
  
const transitionDuration = {
  enter: 1000,
  exit: 1000,
};

class Index extends React.Component {  

  state = {
    scrollPosition : 0,
    totalWidth: 0,
    scrollIndex:0,
  }

  componentDidMount = async() => {        
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
    
    const recv = await findTheme();    
    const { UiActions } = this.props;    
    UiActions.setThemeData({theme: recv.theme});

    // console.log(recv.theme);
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
    if(theme === '')
        return ( <div></div>);

    return (
      <div /*className={classes.main}*/>
        <PageContainer ref={c => this.reactPageScroller = c} page= { theme.brand.length + 3  }  pageOnChange={this.pageOnChange} pageIndex={this.state.scrollIndex + 1}  pageMove={this.goToPage} isSlide={this.props.isSlide} isMoved = { false }/>            
        <BottomCompany />
      </div>
    )  
  }
}

const styles = theme => ({
  main : {    
    height:'100%',        
    overflow:'scroll',        
  },    
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',    
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  scrollContainer:  {
    height: '30%',
    width: '70%',
    background: '#282828',        
  },
  hieroglyphs : {    
    display: 'flex',
    alignItems: 'center',        
  },  
});

Index.propTypes = {
  //classes: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    width: state.ui.get('ui').get('width'),    
    height: state.ui.get('ui').get('height'),   
    isSlide: state.ui.get('ui').get('isSlide'),    
    theme:state.ui.get('ui').get('theme'),    
  }),
  (dispatch) => ({
    UiActions: bindActionCreators(uiActions, dispatch),    
  })
)(Index);
