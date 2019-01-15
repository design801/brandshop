import React from 'react';
import classNames from 'classnames/bind';
import styles from './constructPanel.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton, MuiThemeProvider    } from '@material-ui/core/';

const cx = classNames.bind(styles);

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';


import ReactPagination from '@components/common/PageScrollerIndigator';
import FixedMenu from '@components/common/FixedMenu';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

class ConstructPanel extends React.Component {

  drawDesc = () => {
    const {pageData , theme} = this.props;
    return (
      <div className = { cx('PanelWrp')} style= {{ backgroundImage:  "url(" + theme.intro.img + ")" }}>        
        
      </div>
    );
  }

  drawDescMobile = () => {
    const {pageData , theme} = this.props;
    return (
      <div className = { cx('PanelWrp')} style= {{ backgroundImage:  "url(" + theme.intro.imgMobile + ")" }}>            
       
      </div>
    );
  }

  render() {        
    const {pageData , theme} = this.props;
    
    if(theme === '')
    return(
        <div></div>
    );

    return (        
      <div className = { cx('ConstructPanel')}>

        <DesktopBreakpoint>
        <ReactPagination 
          open={this.props.pageIndex===this.props.index} 
          pageCount={ this.props.page } 
          pageIndex={this.props.pageIndex}
          pageMove={this.goToPage} 
          direction="column" 
          justify="space-between" 
        />

        <FixedMenu
          open={this.props.pageIndex===this.props.index} 
          pageMove={this.props.pageMove} 
          pageIndex={this.props.pageIndex} 
        />

         { this.drawDesc() }
        </DesktopBreakpoint>

        <TabletBreakpoint>
        <ReactPagination 
          open={this.props.pageIndex===this.props.index} 
          pageCount={ this.props.page } 
          pageIndex={this.props.pageIndex}
          pageMove={this.goToPage} 
          direction="column" 
          justify="space-between" 
        />

        <FixedMenu
          open={this.props.pageIndex===this.props.index} 
          pageMove={this.props.pageMove} 
          pageIndex={this.props.pageIndex} 
        />

        { this.drawDesc() }
        </TabletBreakpoint>

        <PhoneBreakpoint>
        { this.drawDescMobile() }          
        </PhoneBreakpoint>

        
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
)(ConstructPanel);


