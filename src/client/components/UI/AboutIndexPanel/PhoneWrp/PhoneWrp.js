import React, { Component, Fragment } from 'react';

import BottomNav from '@components/common/BottomNav';

import { Link } from '@common/routes';

import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider, IconButton , Grid } from '@material-ui/core/';

import MobileMenuComponent from '@components/common/Mobile_SlideMenu';
const mailStr = "nouroom@naver.com";

class PhoneWrp extends React.Component {

    canvas = React.createRef();

    state = {
        open: false,
        mail_open: false,
    }

    componentDidMount() {
        this.props.onSize(this.canvas.current.offsetHeight);        
        window.addEventListener("resize", this.updateSize);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }

    updateSize = () => {
        if(this.canvas.current !== null) {
            this.props.onSize(this.canvas.current.offsetHeight);
        }
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

        console.log( "PhoneWrp " + this.props.bgImg );

        return (
            <Fragment>                
                <div className='AboutIndexPanelWrp' style= {{ backgroundImage:  "url(" + this.props.bgImg +  ")" }} ref={this.canvas}>
                </div>

                <div className = 'logoStyle'>
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

                <MobileMenuComponent open = { this.state.open } onCloseClick = { this.handleClickClose }  onMailClick = { this.handle_mail} menu = {2}  />

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
            </Fragment>
        );
    }
}

export default PhoneWrp;