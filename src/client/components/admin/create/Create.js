import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './Create.scss';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { createTheme } from '@lib/admin';

import UISnackbars from '@components/common/UISnackbars';

class Create extends React.Component {

    state = {
        title: "",
        desc: "",
        id: "",
    }

    handleTitle = event => {
        this.setState({ title: event.target.value });
    }

    handleDesc = event => {
        this.setState({ desc: event.target.value });
    }

    handleId = event => {
        this.setState({ id: event.target.value });
    }

    handleCreate = async() => {
        
        const recv = await createTheme(this.state.title, this.state.desc, this.state.id);
        
        let notify = {};
        if(recv.result === 'ok') {
            notify = { type: 'success', message: 'Theme가 생성되었습니다.' };
            this.setState({title:'', desc: '', id:''});
        } else if(recv.result === 'no') {
            notify = { type: 'error', message: '중복된 ID 입니다.' };
        } else if(recv.result === 'empty') {
            notify = { type: 'error', message: '빈 문자열이 존재합니다.' };
        } else {
            notify = { type: 'error', message: '테마 생성 오류가 발생했습니다.' };
        }
        UISnackbars(notify);
    }

    render() {
        return (
            <div className='create'>
                <Paper className='root'>
                    <div className='typo'><Typography className="title" variant="h6">Theme 제목 : </Typography> <Input value={this.state.title} onChange={this.handleTitle} /></div>
                    <div className='typo'><Typography className="title" variant="h6">Theme 설명 : </Typography> <Input value={this.state.desc} onChange={this.handleDesc} /></div>
                    <div className='typo'><Typography className="title" variant="h6">ID(유니크 값) : </Typography> <Input value={this.state.id} onChange={this.handleId} /></div>
                    <Button onClick={this.handleCreate} variant="contained" color="primary" className="button">생성</Button>
                </Paper>
            </div>
        );
    }
}

export default Create;