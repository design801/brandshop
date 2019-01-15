import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import classNames from 'classnames/bind';
import styles from './aboutPanel.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton, MuiThemeProvider  } from '@material-ui/core/';

const cx = classNames.bind(styles);
  
import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint , PhoneBreakpoint_Portrait ,  PhoneBreakpoint_Landscape  } from '@components/common/Responsive_utilities';

import ReactPagination from '@components/common/PageScrollerIndigator';
import FixedMenu from '@components/common/FixedMenu';

class AboutPanel extends React.Component {

  render() {        
    const {pageData} = this.props;
    console.log("AboutPanel=" + pageData);

    return (        
      <div className = { cx('AboutPanel')}>
        <div className='AboutPanelWrp' style= {{ backgroundImage:  "url(" +  this.props.pageData + ")" }}>
        </div>
        
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

      </div>
    );
  }
}

AboutPanel.propTypes = {  
  pageData:PropTypes.string,
}

export default AboutPanel;