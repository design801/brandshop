import React from 'react';
import classNames from 'classnames/bind';
import styles from './shopIndexPanel.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer, Typography, Fab, Button, Divider, IconButton, MuiThemeProvider, Grid  } from '@material-ui/core/';

import BottomNav from '@components/common/BottomNav';

const cx = classNames.bind(styles);


  
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MobileMenuComponent from '@components/common/Mobile_SlideMenu';

import ReactPagination from '@components/common/PageScrollerIndigator';
import FixedMenu from '@components/common/FixedMenu';

import DesktopWrp from './DesktopWrp';
import TabletWrp from './TabletWrp';
import PhoneWrp from './PhoneWrp';

const mailStr = "nouroom@naver.com";

class ShopIndexPanel extends React.Component {

  canvas = React.createRef();

  state = {
    open: false,
    mail_open: false,
  }

  componentDidMount = async() => {
    if(this.canvas.current !== null) {
      this.props.onSize(this.canvas.current.offsetHeight);
      window.addEventListener("resize", this.updateHeight);
    }
    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  }

  updateHeight = () => {
    if(this.canvas.current !== null) {
      this.props.onSize(this.canvas.current.offsetHeight);     
    }
  }

  getImageSize = () => {      
      if(this.props.width < 400 || this.props.height < 600) {
        if(this.props.width > this.props.height ) {
          //console.log("pattern 1 ");          
          return 12 + 0.050 * this.props.height;
        }
        else {
          //console.log("pattern 2 ");
          return 24 + 0.026 * this.props.width;
        }
      }
      else {
        if(this.props.width > this.props.height ) {
          //console.log("pattern 3 ");
          return 30 + 0.055 * this.props.height;          
        }
        else {
          //console.log("pattern 4 ");
          return 25 + 0.026 * this.props.width;
        }
      }
  }

  getImageWidth = () => {
    let ratio = this.getImageSize() * 0.01 * 550;
    return ratio * -0.5;    
  }

  getImageHeight = () => {
    let ratio = this.getImageSize() * 0.01 * 601;
    return ratio * -0.5;    
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
    
    const { theme } = this.props;
    
    if(theme === '')
    return(
        <div></div>
    );
    
    return (      
      <div className = { cx('ShopIndexPanel')} ref={this.canvas}>
          <DesktopBreakpoint>
            <DesktopWrp onSize={this.props.onSize} bgImg = { theme.main.img } isMoved = { this.props.isMoved } title = { this.props.title } pageMove={this.props.pageMove}  />
          </DesktopBreakpoint>

          <TabletBreakpoint>
            <TabletWrp onSize={this.props.onSize} bgImg = { theme.main.img } isMoved = { this.props.isMoved }  title = { this.props.title } pageMove={this.props.pageMove}  />
          </TabletBreakpoint>
          
          <PhoneBreakpoint>
            <PhoneWrp onSize={this.props.onSize} bgImg = { theme.main.imgMobile } isMoved = { this.props.isMoved } title = { this.props.title } pageMove={this.props.pageMove}  />
          </PhoneBreakpoint>

          <ReactPagination 
          open={this.props.pageIndex===this.props.index} 
          pageCount={ this.props.page } 
          pageIndex={this.props.pageIndex}
          pageMove={this.goToPage} 
          direction="column" 
          justify="space-between" 
        />

        <FixedMenu
          open={this.props.pageIndex===this.props.index} 
          pageMove={this.props.pageMove} 
          pageIndex={this.props.pageIndex}           
        />

      </div> 
    );
  }
}

ShopIndexPanel.propTypes = {  
  imagePath : PropTypes.string,  //페이지 갯수
  pageIndex : PropTypes.number,  //페이지 index  
  pageMove  : PropTypes.func,   //페이지 이동 함수  
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
)(ShopIndexPanel);


