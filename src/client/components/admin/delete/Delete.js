import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './Delete.scss';

const cx = classNames.bind(styles);

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { find , findTheme, boolTheme, changeTheme } from '@lib/admin';

import UISnackbars from '@components/common/UISnackbars';
import createMixins from '@material-ui/core/styles/createMixins';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

class Delete extends React.Component {

    state = {
      themes: [],
    }

    componentDidMount = async() => {
        const recv = await find();        
        this.setState({
            themes: recv.themes
        });
    }

    handleTheme = async(id) => {        
        const recv = await boolTheme(id);        
        this.setState({
            themes: recv.themes
        });
    }

    handleChange = async(id) => {        
        this.props.idChange(id);
        this.props.menuChange(2);
    }

    handleChangeMain = async(id) => {        
        const recv = await changeTheme(id);        
        const { UiActions } = this.props;    
        UiActions.setThemeData({theme: recv.theme});
    }

    render() {
        const { theme } = this.props;
        return (
            <div className='delete'>
                <Paper className='root'>
                    <Table className='table'>
                        <TableHead>
                            <TableRow>
                                <TableCell className='center'>Title</TableCell>
                                <TableCell className='center'>ID</TableCell>
                                <TableCell className='center'>상태</TableCell>
                                <TableCell className='center'>관리</TableCell>
                                <TableCell className='center'>업데이트</TableCell>
                                <TableCell className='center'>대표</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.themes.map( (pp, i) => {
                            return (
                            <TableRow key={i} className={cx( theme.id === pp.id ? 'select':'' )}>
                                <TableCell className='center' component="th" scope="row">{pp.title}</TableCell>
                                <TableCell className='center'>{pp.id}</TableCell>
                                <TableCell className='center'>{pp.isDisplay ? 'visible':'hidden'}</TableCell>
                                <TableCell className='center'><Button variant="contained" className={cx('button', pp.isDisplay ? 'del':'')} onClick={() => this.handleTheme(pp.id)}>{pp.isDisplay ? '숨김':'등록'}</Button></TableCell>
                                <TableCell className='center'><Button variant="contained" className={cx('button','change')} onClick={() => this.handleChange(pp.id)}>{'업데이트'}</Button></TableCell>
                                <TableCell className='center'>
                                    {
                                        theme.id !== pp.id
                                         ?
                                             <Button variant="contained" className={cx('button','main')} onClick={() => this.handleChangeMain(pp.id)}>{'변경'}</Button>
                                         :
                                            <Typography variant="subtitle1"> 적용중 </Typography> 
                                    }
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default connect(
    (state) => ({ 
        theme:state.ui.get('ui').get('theme'),    
    }),
    (dispatch) => ({
        UiActions: bindActionCreators(uiActions, dispatch),    
    })
  )(Delete);
  