import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import AddIcon from '@material-ui/icons/NoteAdd';
import BallotIcon from '@material-ui/icons/Ballot';
import PieChartIcon from '@material-ui/icons/PieChart';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import { findID, about, aboutMobile, findTheme, updateTheme , brand , archive , loginAccount  } from '@lib/admin';

//menu
import Report from '@components/admin/Report';
import Create from '@components/admin/create';
import Delete from '@components/admin/delete';
import Update from '@components/admin/update';
import ManageCreate from '@components/admin/manager_create';
import ManageList from '@components/admin/manager_list';

import UISnackbars from '@components/common/UISnackbars';


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

class AdminContainer extends React.Component {

    state = {
        value: 0,
        id:'',  // menu id
        not_verification: true,
        userId:'',
        password:'',
        snackbar_flag:false,
    };
    
    handleChange = (event, value) => {
        console.log("handleChangeIndex" + value); 
        this.setState({ value:value });
        if(value === 2) {
            this.setState({ id:'' });
        }
    };

    handleChangeIndex = index => {
        console.log("handleChangeIndex" + index); 
        this.setState({ value: index });
    };

    handleId = str => {
        this.setState({ id: str });
    }

    handle_Textfield_Change = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSend = async() => {
        const { userId  , password , snackbar_flag  } = this.state;
        const recv = await loginAccount( userId , password );

        if(recv.result === 'ok') {
            this.setState({ not_verification : false });     
            let notify = {};
            notify = { type: 'success', message: '로그인 되었습니다.' };
            UISnackbars(notify);
            

        }        
        else {
           // this.setState({ snackbar_flag : true });      
           let notify = {};
           notify = { type: 'error', message: '로그인 실패' + recv.result };
           UISnackbars(notify);

        }
    }

    draw_dialog = () => {
        return (            
            <Dialog
            open={this.state.not_verification}                        
          >
            <DialogTitle id="form-dialog-title"> 로그인 </DialogTitle>
            <DialogContent>  
             <TextField
                autoFocus
                margin="dense"
                id="userId"
                label="ID"         
                onChange={this.handle_Textfield_Change('userId')}       
                fullWidth
              />

              <TextField                
                margin="dense"
                id="password"
                label="Password"
                type="password"
                onChange={this.handle_Textfield_Change('password')}
                fullWidth
              />
            </DialogContent>
            <DialogActions>              
              <Button onClick={this.handleSend} color="primary">
                보내기
              </Button>
            </DialogActions>
          </Dialog>
        );
    }

    draw_snackbar = () => {
        return (
           
            <Dialog
                open={this.state.snackbar_flag}                        
            >
                <DialogTitle id="form-dialog-title"> 로그인 실패 </DialogTitle>
                <DialogContent>                 
                </DialogContent>
                
                <Button align="center" onClick={this.handle_snackbar_Close } color="primary">
                    닫기
                </Button>
                
            </Dialog>
            
            );
    }

    handle_snackbar_Close = () => {
        this.setState({ snackbar_flag : false });      
    }

    

    render() {
        const { value , verification  } = this.state;

        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        scrollable
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Theme 생성" icon={<AddIcon />} />                        
                        <Tab label="Theme 관리" icon={<BallotIcon />} />
                        <Tab disabled  label="Theme 업데이트" icon={<EditIcon />} />                        
                        <Tab label="Theme 리포트" icon={<PieChartIcon />} />
                        <Tab label="관리자 생성" icon={<PersonPinIcon />} />
                        <Tab label="관리자 리스트" icon={<ThumbUp />} />
                        
                    </Tabs>
                </AppBar>           
                {value === 0 && <Create />}           
                {value === 1 && <Delete menuChange={this.handleChangeIndex} idChange={this.handleId} />}
                {value === 2 && <Update id={this.state.id} />}                                
                {value === 3 && <Report />}             
                {value === 4 && <ManageCreate />}             
                {value === 5 && <ManageList />}             
                
                { this.draw_dialog() }
                { this.draw_snackbar() }
            </div>
        );
    }
}

export default AdminContainer;