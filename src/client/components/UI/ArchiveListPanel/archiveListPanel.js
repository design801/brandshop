import React from 'react';
import classNames from 'classnames/bind';
import styles from './archiveListPanel.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton, MuiThemeProvider, Grid  } from '@material-ui/core/';

import BottomNav from '@components/common/BottomNav';

const cx = classNames.bind(styles);

const mailStr = "nouroom@naver.com";
  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';


import ScrollContainer from 'react-indiana-drag-scroll';
import DragScrollBar from '@components/common/DragScrollbar';

import AchiveListComponent from '@components/common/AchiveListComponent';

import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

import { Link } from '@common/routes';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';
import MobileMenuComponent from '@components/common/Mobile_SlideMenu';

import FixedMenu from '@components/common/FixedMenu';

const tileData = [
  {
    img: '/static/images/archive/1.jpg',
    title: '2018 / 12 / WARM HEARTED',    
  },

  {
    img: '/static/images/archive/2.jpg',
    title: '2019 / 01 / coming up',    
  },

  {
    img: '/static/images/archive/3.jpg',
    title: '2019 / 02 / coming up',    
  },

  {
    img: '/static/images/archive/4.jpg',
    title: '2019 / 03 / coming up',    
  },

  // {
  //   img: '/static/images/archive/1.jpg',
  //   title: '2019 / 04 / coming up',    
  // },

  // {
  //   img: '/static/images/archive/2.jpg',
  //   title: '2019 / 05 / coming up',    
  // },

  // {
  //   img: '/static/images/archive/3.jpg',
  //   title: '2019 / 06 / coming up',    
  // },

  // {
  //   img: '/static/images/archive/4.jpg',
  //   title: '2019 / 07 / coming up',    
  // },


  // {
  //   img: '/static/images/archive/1.jpg',
  //   title: '2019 / 08 / coming up',    
  // },

  // {
  //   img: '/static/images/archive/2.jpg',
  //   title: '2019 / 09 / coming up',    
  // },

  // {
  //   img: '/static/images/archive/3.jpg',
  //   title: '2019 / 10 / coming up',    
  // },

  // {
  //   img: '/static/images/archive/4.jpg',
  //   title: '2019 / 11 / coming up',    
  // },

];


class ArchiveListPanel extends React.Component {

  state = {
    scrollPosition : 0,
    totalWidth: 0,

    open: false,
    mail_open: false,
  }

  handle_scroll = ( left , top , width , height) => {          
    this.setState({ scrollPosition : left , totalWidth : width  });      
  }

  handleMenu = () => {
    console.log('handleMenu');
    this.setState({
      open: true,
    });
  }

  handleClickClose = () => {
    console.log('handleClickClose');
    this.setState({
      open: false,
    });
  }

  handle_mail = () => {        
    this.setState({ mail_open: true });        
  }

  handle_mailClose = () => {
    this.setState({ mail_open: false });
  };

  render() {        
    console.log( this.props.height);

    
    return (                  
      <div className = { cx('ArchiveListPanel')}>
      
        <DesktopBreakpoint>
          <div className='ArchiveListPanelWrp'>
            
            <div className = { cx('logoStyle')}>
              <Link route='shop' passHref>
                <img src='static/images/icon/logo.png' />
              </Link>              
            </div>

            <FixedMenu  open = { true } pageMove = {this.goToPage} pageIndex = { 1 } />
            
            { 
              this.props.height > 0 && 
              <div className={cx('listPosition')} >
                <ScrollContainer className={cx('scrollContainer')} vertical = { false } horizontal = { true } hideScrollbars = { false } onScroll = { this.handle_scroll }>
                  <div className={cx('hieroglyphs')} >
                  {
                    console.log(this.props.archiveDatas)
                  }
                  {       
                    this.props.archiveDatas.map((archive , i) => (                      
                      <AchiveListComponent key = {i}  archive = { archive  }  img = { archive.img } title = { archive.caption } link = { archive.link } linkTitle = { archive.title }  width = { this.props.width * 1 } height = { this.props.height * 0.8 - 100 } />
                    ))
                  }   
                </div>      
                </ScrollContainer>
                <DragScrollBar scrollSizeWidth = { this.props.width * 0.88 } scrollMovedWidth = { this.state.scrollPosition }  totalListWidth = { this.state.totalWidth } imageCount = { this.props.archiveDatas.length } cellWidth = { this.props.width }  cellHeight = { this.props.height * 0.8 - 100 } />
             </div>
          }
        </div>
        { /* bottom Menu  */}   
        <div className = { cx('bottomNavMenu')}>
        { /* bottom Menu  */}          
          <BottomNav pageIndex = { 3 } />
        </div>
          
          
        </DesktopBreakpoint>

        <TabletBreakpoint>
          <div className='ArchiveListPanelWrp'>            
            <FixedMenu  open = { true } pageMove = {this.goToPage} pageIndex = { 1 } />

                <div className = { cx('logoStyle')}>
                  <Link route='shop' passHref>
                    <img src='static/images/icon/logo.png' />
                  </Link>
                </div>              


                { 
                  this.props.height > 0 && 
                  <div className={cx('listPosition')} >
                    <ScrollContainer className={cx('scrollContainer')} vertical = { false } horizontal = { true } hideScrollbars = { false } onScroll = { this.handle_scroll }>
                      <div className={cx('hieroglyphs')} >                     
                      {       
                        this.props.archiveDatas.map((archive , i) => (                      
                          <AchiveListComponent key = {i}  archive = { archive  }  img = { archive.img } title = { archive.caption } link = { archive.link } linkTitle = { archive.title }  width = { this.props.width * 1 } height = { this.props.height * 0.8 - 100 } />
                        ))
                      }   
                      </div>      
                    </ScrollContainer>
                    <DragScrollBar scrollSizeWidth = { this.props.width * 0.88 } scrollMovedWidth = { this.state.scrollPosition }  totalListWidth = { this.state.totalWidth } imageCount = { this.props.archiveDatas.length } cellWidth = { this.props.width }  cellHeight = { this.props.height * 0.8 - 100 } />
                  </div>
              }

          </div>
          
               { /* bottom Menu  */}   
              <div className = { cx('bottomNavMenu')}>
              { /* bottom Menu  */}          
              <BottomNav pageIndex = { 3 } />
              </div>

        </TabletBreakpoint>

        <PhoneBreakpoint>
          <div className='ArchiveListPanelWrp'>

            { 
            this.props.height > 0 && 
            <div className={cx('listPosition')} >
              <ScrollContainer className={cx('scrollContainer')} vertical = { false } horizontal = { true } hideScrollbars = { false } onScroll = { this.handle_scroll }>
                <div className={cx('hieroglyphs')} >
                
                {       
                  this.props.archiveDatas.map((archive , i) => (
                    <AchiveListComponent key = {i}  archive = { archive  } img = { archive.img } title = { archive.caption  } linkTitle = { archive.title }  link = { archive.link } width = { this.props.width * 1 } height = { this.props.height * 0.8 - 100 } />
                  ))
                }   

                </div>      
              </ScrollContainer>
              <DragScrollBar scrollSizeWidth = { this.props.width * 0.88 } scrollMovedWidth = { this.state.scrollPosition }  totalListWidth = { this.state.totalWidth } imageCount = { this.props.archiveDatas.length } cellWidth = { this.props.width }  cellHeight = { this.props.height * 0.8 - 100 }  />
            </div>
            }

            <div className = { cx('logoStyle')}>
              <Link route='shop' passHref>
                <img src='static/images/icon/logo.png' />
              </Link>
            </div>

            <span onClick={this.handleMenu} className="icon-wrp">
              <i className="icon-oh lines-horizontal" title="">
                <svg>
                  <use xlinkHref={"/static/images/svg/lines-horizontal.svg#icon-oh-lines-horizontal"}></use>
                </svg>
              </i>
            </span>

           <MobileMenuComponent open = { this.state.open } onCloseClick = { this.handleClickClose }  onMailClick = { this.handle_mail} menu = {3} />

            <Dialog
              open={this.state.mail_open}
              onClose={this.handle_mailClose}         
            >
            <DialogTitle> 무엇을 도와드릴까요? </DialogTitle>
            <DialogContent>
                
              <DialogContentText>
                  { mailStr }가 클립보드로 복사되었습니다.
              </DialogContentText>            
            </DialogContent>        
            <DialogActions>                 
              <Button onClick={this.handle_mailClose} color="primary">
                확인
              </Button>
            
            </DialogActions>

          </Dialog>


        </div>
        </PhoneBreakpoint>

      </div>
    );
  }
}

ArchiveListPanel.propTypes = {  
  imagePath : PropTypes.string,  //페이지 갯수  
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
)(ArchiveListPanel);


