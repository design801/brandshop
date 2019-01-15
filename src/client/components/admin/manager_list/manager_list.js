import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './manager_list.scss';

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

import { find , findTheme, boolTheme, changeTheme , findAccount } from '@lib/admin';

import UISnackbars from '@components/common/UISnackbars';
import createMixins from '@material-ui/core/styles/createMixins';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

class Manager_list extends React.Component {

    state = {
        accounts: [],
    }

    componentDidMount = async() => {
        const recv = await findAccount();     
        console.log("componentDidMount");
        console.log(recv);
        this.setState({
            accounts: recv.accounts
        });
    }

    render() {
        const { accounts } = this.props;
        return (
            <div className='delete'>
                <Paper className='root'>
                    <Table className='table'>
                        <TableHead>
                            <TableRow>                                
                                <TableCell className='center'>ID</TableCell>                                
                                <TableCell className='center'>패스워드</TableCell>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           
                            {
                                this.state.accounts.map((  acount , i) => {
                                return (
                                <TableRow key={i} >                                    
                                    <TableCell className='center'>{ acount.id}</TableCell>
                                    <TableCell className='center'>{ acount.passwd}</TableCell>
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
  )(Manager_list);
  