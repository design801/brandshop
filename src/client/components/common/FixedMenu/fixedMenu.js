import React from 'react';
import classNames from 'classnames/bind';
import styles from './fixedMenu.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider, IconButton , Grid } from '@material-ui/core/';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const cx = classNames.bind(styles);
  
const mailStr = "nouroom@naver.com";

class FixedMenu extends React.Component {

  state = {
    open: false,
    
  };

  handle_mail = () => {        
    this.setState({ open: true });        
  }

  handleClose = () => {
    this.setState({ open: false });
  };

 
  render() {        
    return (  
      <div className={cx('FixedMenu')}> 
        <div className={cx('FixedMenu-root', this.props.open && 'open')}>        
          <Grid
            container
            spacing={0}            
            direction="column"            
            alignItems="center"
            justify="space-between"
          >
            <a href="https://www.instagram.com/nou.room_/" target="_blank"> 
              <svg className={cx('FixedMenu-iconStyle', 'FixedMenu-buttonStyle')} viewBox="0 0 68 68"> 
                <use xlinkHref="/static/images/svg/instagram.svg#instagram"></use>
              </svg> 
            </a>

            <a href="https://blog.naver.com/nouroom" target="_blank">
              <svg className={cx('FixedMenu-iconStyle', 'FixedMenu-buttonStyle')} viewBox="0 0 76.64 64.29"> 
                <use href="/static/images/svg/blog.svg#blog"></use>
              </svg>
            </a>


            <CopyToClipboard text={mailStr}>
              <div onClick={this.handle_mail} className={cx('FixedMenu-buttonStyle')}>
                <svg className={cx('FixedMenu-iconStyle')} viewBox="0 0 76 53.58"> 
                  <use xlinkHref="/static/images/svg/mail.svg#mail"></use>
                </svg>
              </div>
            </CopyToClipboard>
          </Grid>
        </div>
 
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}         
        >
          <DialogTitle> 무엇을 도와드릴까요? </DialogTitle>
          <DialogContent>
            <DialogContentText>
                { mailStr }가 클립보드로 복사되었습니다.
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

FixedMenu.propTypes = {    
  pageMove  : PropTypes.func,   //페이지 이동 함수  
  pageIndex : PropTypes.number, //현재 페이지 인덱스 0 page 일땐 top 버튼 안 보이게
}


export default FixedMenu;
