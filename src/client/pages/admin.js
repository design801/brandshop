import React, { Component } from 'react';

import AdminContainer from '@containers/AdminContainer';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

import { findTheme } from '@lib/admin';

class Admin extends React.Component {

    componentDidMount = async() => {

        console.log("Admin");
        document.body.style.overflow = "auto";
        if(this.props.theme === '') {
            const recv = await findTheme();    
            const { UiActions } = this.props;    
            UiActions.setThemeData({theme: recv.theme});
          }
    }

    componentWillUnmount() {
        document.body.style.overflow = "hidden";
    }


    render() {
        return (
            <div>
                <AdminContainer />
            </div>
        );
    }
}

export default connect(
    (state) => ({
      width: state.ui.get('ui').get('width'),    
      height: state.ui.get('ui').get('height'),   
      theme:state.ui.get('ui').get('theme'),    
    }),
    (dispatch) => ({
      UiActions: bindActionCreators(uiActions, dispatch),    
    })
  )(Admin);

