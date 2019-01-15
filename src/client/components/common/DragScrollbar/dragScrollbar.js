import React from 'react';
import classNames from 'classnames/bind';
import styles from './dragScrollbar.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

const cx = classNames.bind(styles);
  
class dragScrollbar extends React.Component {

  getScrollPosition = () => {
    const { totalListWidth  ,  scrollSizeWidth , scrollMovedWidth } = this.props;

    if(totalListWidth === 0 || scrollMovedWidth === 0)
      return 0;

    let rationWidth = totalListWidth  - scrollSizeWidth;    //총 이미지 사이즈에서 화면에 뿌려지는 사이즈를 빼면 이동 하는 이미지 사이즈 총량.
    let perRation = ( scrollSizeWidth - this.getWidth() )  / rationWidth ;    

    return (scrollMovedWidth * perRation);
  }

  getWidth = () => {        
    const { scrollSizeWidth  ,  imageCount , totalListWidth } = this.props;        
    let sellWidth = this.props.cellHeight *  0.9 * ( 44 / 73);
    let marginWidth = this.props.cellWidth * 0.9 * 0.04;    
    
    if(imageCount === 0)
      return 0;

    let totalWidth = sellWidth * imageCount + marginWidth * (imageCount - 1 );
    let widthRatio = scrollSizeWidth / totalWidth;    
    if(widthRatio > 1.0)
      widthRatio = 1.0;

    return scrollSizeWidth * widthRatio;
  }
  

  getSellWidth = () => {
    //height 이  베리현 width + 8%
    //  73/44
    
  }

  render() {        
    
    return (                  
        <div className={cx('dragScrollbar')} >
          <Divider className={cx('divider')}  style = {{ width : this.props.scrollSizeWidth }}  />
          <Divider className={cx('divider2')}  style = {{ marginLeft : this.getScrollPosition() , width : this.getWidth()}}  />
        </div>
    );
  }
}

dragScrollbar.propTypes = {  
  scrollSizeWidth : PropTypes.number,  //보여줄 scroll width 값
  scrollMovedWidth : PropTypes.number,  //움직인 scroll 값
  totalListWidth : PropTypes.number,  // 이미지를 길게 늘린 총 이미지 길이값
  imageCount : PropTypes.number,  // 이미지를 갯수
}

export default dragScrollbar;
