import React from 'react';
import classNames from 'classnames/bind';
import styles from './pageScrollerIndigator.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton , Grid , Paper } from '@material-ui/core/';



import PageIcon from '@material-ui/icons/Brightness1';

const cx = classNames.bind(styles);
  
class PageScrollerIndigator extends React.Component {

  getScrollPosition = () => {
    const { totalListWidth  ,  scrollSizeWidth , scrollMovedWidth } = this.props;
    let rationWidth = totalListWidth  - scrollSizeWidth;    //총 이미지 사이즈에서 화면에 뿌려지는 사이즈를 빼면 이동 하는 이미지 사이즈 총량.
    let perRation = ( scrollSizeWidth - this.getWidth() )  / rationWidth ;    
    return (scrollMovedWidth * perRation);
  }

  getWidth = () => {    
    const { scrollSizeWidth  ,  imageCount } = this.props;
    return scrollSizeWidth / imageCount;
  }
  

  buttonClick = () => {
    console.log('1');
  }

  drawIconButtons = () => {
    let buttons = [];
    for (let i = 0; i < this.props.pageCount; i++) {
      let fontSize = 3;
      if(i + 1 === this.props.pageIndex)
        fontSize = 7;
        { /* <IconButton key = { i } disableRipple align='center' onClick = { e => this.props.pageMove( i )}> */ }
      buttons.push(                    
          <div key = { i }  style={{ height: fontSize , width: fontSize , borderRadius: fontSize / 2  , backgroundColor:'white' }}  />        
        
      );
    }
    return buttons;
  }

  getImagePixel = () => {
    return 28;
  }

  render() {        
    return (                  
        <div className = {cx('pageScrollerIndigator', this.props.open && 'open', this.props.row && 'row')} >
          <Grid
            container
            spacing={0}   
            direction={this.props.direction}      
            justify= "space-around"
            alignItems="center"
          >
            { this.drawIconButtons() }
          </Grid>
        </div>
    );
  }
}

PageScrollerIndigator.propTypes = {  
  pageCount : PropTypes.number,  //페이지 갯수
  pageIndex : PropTypes.number,  //페이지 index
  pageMove  : PropTypes.func,   //페이지 이동 함수  
}

export default PageScrollerIndigator;
