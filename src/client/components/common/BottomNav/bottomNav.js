import React from 'react';
import classNames from 'classnames/bind';
import styles from './bottomNav.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton , Grid  } from '@material-ui/core/';

//link
import { Link } from '@common/routes';
import UIButton_New from '@components/common/UIButton_New';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {CopyToClipboard} from 'react-copy-to-clipboard';
const homepageStr = "http://nouroom.com";

const cx = classNames.bind(styles);
  
class BottomNav extends React.Component {
  
  state = {
    open: false,
  };

  handleClickOpen = () => {    
    this.setState({ open: true });    
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  draw_link_menu = ()  => {
    return (
      <div align="center" className={cx('BottomNav-centerMenu')}>  
      <Grid
        container
        spacing={0}            
        direction="row"            
        alignItems="flex-end"
        justify="space-between"
      >          
    
      {
        this.props.pageIndex === 2
        ?
        (
        <div className ={ cx('BottomNav-choiceStyle')}>          
          ABOUT
        </div>              
        
        )
        :
        (
        
          <Link route='about' passHref>
           <a className = { this.props.pageIndex === 2 ? cx('BottomNav-choiceStyle') : cx('BottomNav-linkStyle')} > ABOUT </a>
         </Link>
        )
      }

      {
        this.props.pageIndex === 1
        ?
        (
        <div className ={ cx('BottomNav-choiceStyle')}>          
            SHOP
        </div>              
        
        )
        :
        (
        
        <Link route='shop' passHref>                
          <a className = { this.props.pageIndex === 1 ? cx('BottomNav-choiceStyle') : cx('BottomNav-linkStyle')} > SHOP </a>
        </Link>
        )
      }

      
      {
        this.props.pageIndex === 3
        ?
        (
        <div className ={ cx('BottomNav-choiceStyle')}>          
        ARCHIVE
        </div>              
        
        )
        :
        (
        
          <Link route='archive' passHref>
           <a className = {this.props.pageIndex === 3 ? cx('BottomNav-choiceStyle') :  cx('BottomNav-linkStyle')} > ARCHIVE </a>
          </Link>
        )
      }
      </Grid>    
   </div>
    );
  }


  render() {        
    return (                  
        <div className={cx('BottomNav')}>

          <div align='left' className = { cx('BottomNav-clipboardStyle')}  >   
          <CopyToClipboard text={homepageStr}>
            <div onClick = { this.handleClickOpen } className = { cx('BottomNav-shareButtonStyle')}>
              <svg className={cx('BottomNav-iconStyle')} viewBox="0 0 69.52 90.97" > 
                <use xlinkHref="/static/images/svg/share.svg#share"></use>
              </svg>
            </div>
          </CopyToClipboard>
        </div>
          

        { 
          ( this.props.isMoved === undefined || this.props.isMoved === false )  && this.draw_link_menu() 
        }


         
         

           <Dialog
            open={this.state.open}
            onClose={this.handleClose}         
          >
            
            <DialogContent>
              <DialogContentText>                
                nouroom.com이 클립보드로 복사되었습니다. <br/>
                주변에 누:룸을 소개해보세요.
              </DialogContentText>            
            </DialogContent>        
            <DialogActions>                 
              <Button onClick={this.handleClose} color="primary">
                확인
              </Button>
            
            </DialogActions>

          </Dialog>
        </div>        
    );
  }
}

BottomNav.propTypes = {  
  pageIndex : PropTypes.number,  
  pageMove  : PropTypes.func,   //페이지 이동 함수  
}

export default BottomNav;