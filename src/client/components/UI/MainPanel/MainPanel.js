import React from 'react';
import classNames from 'classnames/bind';
import styles from './MainPanel.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton, MuiThemeProvider  } from '@material-ui/core/';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import BottomNav from '@components/common/BottomNav';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const cx = classNames.bind(styles);
  
const homepageStr = "http://www.numixent.com";

class MainPanel extends React.Component {

  state = {
    open: false,
  };

  drawFAB = () => {
    return (
      <div align="left" className = { cx('clipboardStyle')}  >
        <Button onClick = { this.handleClickOpen }>
          ClipBoard
        </Button>
      </div>
    );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    <CopyToClipboard text= { homepageStr } />  
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {       

    return (                  
      
        <div className = {cx('MainPanel')}  style= {{ backgroundImage:  "url(" +  this.props.imagePath + ")" }}>

            <div align ="center" className = { cx('bottomNavMenu')}>
                { /* bottom Menu  */}
                { this.drawFAB() }
                <BottomNav pageIndex = { this.props.pageIndex } />
            </div>

            <Dialog
                open={this.state.open}
                onClose={this.handleClose}         
            >
                <DialogContent>
                    <DialogContentText>
                    누:룸의 웹사이트 주소가 클립보드로 복사되었습니다.
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

MainPanel.propTypes = {  
  imagePath : PropTypes.string,  //페이지 갯수
  pageIndex : PropTypes.number,  //페이지 index  
}

export default MainPanel;
