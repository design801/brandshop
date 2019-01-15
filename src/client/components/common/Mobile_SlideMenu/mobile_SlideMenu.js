import React from 'react';
import classNames from 'classnames/bind';
import styles from './mobile_SlideMenu.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider, IconButton , Grid } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

import { Link } from '@common/routes';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const cx = classNames.bind(styles);
  
const mailStr = "nouroom@naver.com";

class Mobile_SlideMenu extends React.Component {

  
  draw_link_menu = () => {
    return (
      <div className='link'>
      <Link route='about' passHref>
        {
           this.props.menu === 2
          ?
            <a className='alink active'>ABOUT</a>
          :
            <a className='alink'>ABOUT</a>
        }
        
      </Link>
      <Link route='shop' passHref>
        {
            this.props.menu === 1
            ?
              <a className='alink active'>SHOP</a>
            :
              <a className='alink'>SHOP</a>
        }
      </Link>
      <Link route='archive' passHref>
      {
            this.props.menu === 3
            ?
              <a className='alink active'>ARCHIVE</a>
            :
              <a className='alink'>ARCHIVE</a>
        }
      </Link>
    </div>

    );
  }


  render() {        

    console.log( this.props.menu );
    
    return (  
        <div className = { cx('Mobile_SlideMenu')}>
           <Slide direction="down" in={ this.props.open } mountOnEnter unmountOnExit>
              <Paper className = { cx('paperStyle')}>
                <IconButton className = { cx('closeButton')} onClick = { this.props.onCloseClick }>
                  <CloseIcon />
                </IconButton>

                { 
                   ( this.props.isMoved === undefined || this.props.isMoved === false )  && this.draw_link_menu() 
                }

                <Grid
                  container
                  spacing={0}            
                  direction="row"        
                  justify="space-between"                  
                  style={{marginTop: '80%'}}
                >
                
                  <IconButton className={cx('buttonStyle')}>              
                    <a href="https://www.instagram.com/nou.room_/" target="_blank"> <svg className={cx('iconStyle')} viewBox="0 0 68 68"> <use xlinkHref="/static/images/svg/instagram.svg#instagram"></use></svg> </a>
                  </IconButton>

                  <IconButton className={cx('buttonStyle')}>            
                    <a href="https://blog.naver.com/nouroom" target="_blank">
                    <svg className={cx('iconStyle')} viewBox="0 0 76.64 64.29"> <use xlinkHref="/static/images/svg/blog.svg#blog"></use></svg></a>
                  </IconButton>

                  <CopyToClipboard text={mailStr}>
                    <IconButton className={cx('buttonStyle')} onClick = { this.props.onMailClick }>            
                      <svg className={cx('iconStyle')} viewBox="0 0 76 53.58"> <use xlinkHref="/static/images/svg/mail.svg#mail"></use></svg>
                    </IconButton>
                  </CopyToClipboard>
                </Grid>
                
              </Paper>
            </Slide>
          </div>

    );
  }
}

Mobile_SlideMenu.propTypes = {    
  open  : PropTypes.bool,   //메뉴 나오냐 안 나오냐
  onCloseClick : PropTypes.func, // close 버튼
  onMailClick: PropTypes.func, // mail 버튼
  menu : PropTypes.number,
}

export default Mobile_SlideMenu;
