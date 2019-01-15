import React from 'react';
import classNames from 'classnames/bind';
import styles from './achiveListComponent.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider, IconButton , Grid } from '@material-ui/core/';

//link
import { Link } from '@common/routes';


const cx = classNames.bind(styles);

class AchiveListComponent extends React.Component {

  
  
  render() {        
    if(this.props.img === '') {
      return (<div></div>);
    }

    return (  
      <div className={cx('AchiveListComponent')} >             
            <div align = "center " style = {{ height : this.props.height }} className = { cx('centerStyle')}>
            
            {
              this.props.archive.isLink === true
              ? 
              (
                <Link route='archiveLink' params={{id: this.props.link  , title: "'" + this.props.linkTitle + "'"  }} passHref >
                <a className = { this.props.pageIndex === 1 ? cx('BottomNav-choiceStyle') : cx('BottomNav-linkStyle')} > 
                    <img src={ this.props.img } className={cx('imgStyle')} style = {{ height : this.props.height * 0.9 }}  />  
                </a>
            </Link>            
              )
              :
              (
                <img src={ this.props.img } className={cx('imgStyle')} style = {{ height : this.props.height * 0.9 }}  />  
              )
            }

              <div className = { cx('titleStyle')}>
                  { this.props.title }
                
            </div>
            
          </div>

      </div>
    );
  }
}

AchiveListComponent.propTypes = {    
  img  : PropTypes.string,   
  title : PropTypes.string, 
  width : PropTypes.number, 
  height : PropTypes.number, 
}
export default AchiveListComponent;
