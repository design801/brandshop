import React from 'react';

import styles from '@styles/base.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

import FixedMenu from '@components/common/FixedMenu';
import ReactPagination from '@components/common/PageScrollerIndigator';

import { find , findTheme, boolTheme, changeTheme , findArchive } from '@lib/admin';

//마지막 footer 
import BottomCompany from '@components/common/BottomCompany';
//page 스크롤 
import PageContainer from '@containers/PageContainer';
  
//archive List 
import ArchiveListPanel from '@components/UI/ArchiveListPanel';

const transitionDuration = {
  enter: 1000,
  exit: 1000,
};

class Archive extends React.Component {  

  state = {
    scrollPosition : 0,
    totalWidth: 0,
    scrollIndex:0,
    archiveDatas:[],
  }

  handle_scroll = ( left , top , width , height) => {          
    this.setState({ scrollPosition : left , totalWidth : width  });      
  }

  goToPage = (pageNumber) => {
    console.log("pageNumber=" + pageNumber);
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

    
    const recv = await findArchive();    
    const { UiActions } = this.props;    
    console.log(recv);
    let datas = [];
    for(let i = 0 ; i < recv.themes.length ; i++)
    {
      let data = recv.themes[i].archive;
      datas.push( this.makeImageData( data.img , recv.themes[i].id , data.caption , data.isLink , data.title) );
    }
    this.setState({ archiveDatas : datas});      

    console.log( this.state.archiveDatas);
    

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  }

  updateHeight = () => {
    const { UiActions } = this.props;
    console.log("updateHeight" + window.innerHeight);
    UiActions.setUiData({width: window.innerWidth, height: window.innerHeight});
  }

  //데이터 만들기
  makeImageData = ( url , link , caption , isLink , title ) => {
    return (
        { img: url , link : link , caption: caption , isLink: isLink , title : title  }
    );
  }


  render() {
    // const { classes } = this.props;
    return (
      <div /*className={ classes.main}*/>        
        <ArchiveListPanel archiveDatas = { this.state.archiveDatas}/>                 
        <BottomCompany  />
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
)(Archive);
