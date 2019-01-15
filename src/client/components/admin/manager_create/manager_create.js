import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './manager_create.scss';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { createAccount } from '@lib/admin';

import UISnackbars from '@components/common/UISnackbars';

class Manager_create extends React.Component {

    state = {
        userId: "",
        password: "",
        password_confirm: "",
    }

    handleTitle = event => {
        this.setState({ userId: event.target.value });
    }

    handleDesc = event => {
        this.setState({ password: event.target.value });
    }

    handleId = event => {
        this.setState({ password_confirm: event.target.value });
    }

    handleCreate = async() => {
        
        const { userId , password , password_confirm  } = this.state;

        if(userId === '' || password === '' || password_confirm === '') {
            let notify = {};
            notify = { type: 'error', message: 'id 나 password 를 입력하지 않았습니다.' };            
            UISnackbars(notify);        
        }
        else if(password !== password_confirm) {
            let notify = {};
            notify = { type: 'error', message: '암호가 다릅니다.' };            
            UISnackbars(notify);        
        }
        else {
            const recv = await createAccount(this.state.userId, this.state.password);
        
            let notify = {};
            if(recv.result === 'ok') {
                notify = { type: 'success', message: 'id 가 생성되었습니다.' };
                this.setState({title:'', desc: '', id:''});
            } else {
                notify = { type: 'error', message: 'id 생성 실패' };            
            }
            UISnackbars(notify);
        }        
    }

    render() {
        return (
            <div className='create'>
                <Paper className='root'>
                    <div className='typo'><Typography className="title" variant="h6"> 관리자 ID : </Typography> <Input value={this.state.userId} onChange={this.handleTitle} /></div>
                    <div className='typo'><Typography className="title" variant="h6"> password : </Typography> <Input value={this.state.password} onChange={this.handleDesc} /></div>
                    <div className='typo'><Typography className="title" variant="h6"> password 확인 : </Typography> <Input value={this.state.password_confirm} onChange={this.handleId} /></div>
                    <Button onClick={this.handleCreate} variant="contained" color="primary" className="button">생성</Button>
                </Paper>
            </div>
        );
    }
}

export default Manager_create;