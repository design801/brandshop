import React from 'react';


import classNames from 'classnames/bind'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

const cx = classNames.bind(styles);

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

import Sticky from 'react-sticky-el';
import Scrollspy from 'react-scrollspy'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


import DragScroll from 'react-dragscroll';

import ScrollContainer from 'react-indiana-drag-scroll';

import DragScrollBar from '@components/common/DragScrollbar';


import FixedMenu from '@components/common/FixedMenu';

import ReactPageScroller from "react-page-scroller";
import ReactPagination from '@components/common/PageScrollerIndigator';


import Zoom from '@material-ui/core/Zoom';


import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';


import ShopIndexPanel from '@components/UI/ShopIndexPanel';
import ImagePanel from '@components/UI/ImagePanel';



const temp = (70 / 12) + '%';



 
  
const pageDatas = [
  {
    imagePath:'/static/images/shop/shop_2.jpg',
    title:'Au Revoir',
    koreaTitle:'오흐부아흐',
    desc:'Daily look for the thoughtful women and men.',
    linkDesc:'더 많은 Au Revoir 의 제품 보러가기',
    imagePattern:1,
    imageData: ['/static/images/shop/aurevoir_1.jpg' , '/static/images/shop/aurevoir_2.jpg' ],
  },

  {
    imagePath:'/static/images/shop/shop_3.jpg',
    title:'PRIDA',
    koreaTitle:'프리다',
    desc:'견고한 퀄리티와 따뜻한 마음까지 전하는 천연 밀랍 캔들',
    linkDesc:'더 많은 PRIDA 의 제품 보러가기',
    imagePattern:2,
    imageData: ['/static/images/shop/prida_1.jpg' , '/static/images/shop/prida_2.jpg' , '/static/images/shop/prida_3.jpg' , '/static/images/shop/prida_4.jpg',
                '/static/images/shop/prida_5.jpg' , '/static/images/shop/prida_6.jpg' , '/static/images/shop/prida_7.jpg' , '/static/images/shop/prida_8.jpg' ],
  },

  {
    imagePath:'/static/images/shop/shop_4.jpg',
    title:'MOOHAE',
    koreaTitle:'무해',
    desc:'환경과 건강한 삶을 위한 100%오가닉코튼 나이트웨어',
    linkDesc:'더 많은 MOOHAE 의 제품 보러가기',
    imagePattern:3,
    imageData: ['/static/images/shop/moohae_1.jpg' , '/static/images/shop/moohae_2.jpg', '/static/images/shop/moohae_3.jpg' , '/static/images/shop/moohae_4.jpg'],
  },

  {
    imagePath:'/static/images/shop/shop_5.jpg',
    title:'fradore',
    koreaTitle:'프라도어',
    desc:'당신의 기억을 부를 어떤 향기에 관하여',
    linkDesc:'더 많은 fradore 의 제품 보러가기',
    imagePattern:3,
    imageData: ['/static/images/shop/fradore_1.jpg' , '/static/images/shop/fradore_2.jpg','/static/images/shop/fradore_3.jpg' , '/static/images/shop/fradore_4.jpg'],
  },

  {
    imagePath:'/static/images/shop/shop_6.jpg',
    title:'tumblbug',    
    imagePattern:0,    
  },

  {
    imagePath:'/static/images/shop/shop_7.jpg',
    title:'hobbyful',    
    imagePattern:0,    
  },
];


const fabs = [
  {
    color: 'primary',    
    icon: <AddIcon />,
  },
  {
    color: 'secondary',
    
    icon: <EditIcon />,
  },
  {
    color: 'inherit',    
    icon: <UpIcon />,
  },
];

const transitionDuration = {
  enter: 1000,
  exit: 1000,
};


class Index extends React.Component {  

  state = {
    scrollPosition : 0,
    totalWidth: 0,
    scrollIndex:1,
  }
  componentDidMount = () => {        
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
    this.goToPage(1);
    if(this.props.noMenu === undefined) {      
    
    }
    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
  }

  updateHeight = () => {
    const { UiActions } = this.props;
    UiActions.setUiData({width: window.innerWidth, height: window.innerHeight});
  }

  handle_scroll = ( left , top , width , height) => {          
      this.setState({ scrollPosition : left , totalWidth : width  });      
  }


  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }
 
  pageOnChange = (pageNumber) => {    
    this.setState({ scrollIndex : pageNumber   });      
  }

  

  drawScroller = () => {
    return (
      <div>
      <ReactPageScroller ref={c => this.reactPageScroller = c} pageOnChange = { this.pageOnChange }>
      <ShopIndexPanel  imagePath = { '/static/images/shop/shop_1.jpg' } pageIndex = { 1 } />      
      <ImagePanel  pageData = { pageDatas[0] } />            
      <ImagePanel  pageData = { pageDatas[1] } />            
      <ImagePanel  pageData = { pageDatas[2] } />            
      <ImagePanel  pageData = { pageDatas[3] } />            
      <ImagePanel  pageData = { pageDatas[4] } />            
      <ImagePanel  pageData = { pageDatas[5] } />                  
     </ReactPageScroller>
     <ReactPagination  pageCount = { 7 } pageIndex = { this.state.scrollIndex }  pageMove = { this.goToPage}  />       
     </div>
    );

  }

  render() {
    // const { classes } = this.props;
    return (
      <div>


       { this.drawScroller() }

        <FixedMenu  />

        <DesktopBreakpoint>    
        </DesktopBreakpoint>

        <TabletBreakpoint>
        </TabletBreakpoint>

        <PhoneBreakpoint>
        </PhoneBreakpoint>           

      </div>
    )  
  }
}

const styles = theme => ({
  main : {    
    height:'100%',    
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  scrollContainer:  {
    height: '30%',
    width: '70%',
    background: '#282828',    
    overflow: 'hidden',
  },
  hieroglyphs : {    
    display: 'flex',
    alignItems: 'center',        
  },
  divider : {
    height:5,
    width: '70%',
    backgroundColor:'red',
  },
  divider2 : {
    height: 3,    
    backgroundColor:'blue',
  }
});

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect(
  (state) => ({
    width: state.ui.get('ui').get('width'),    
    height: state.ui.get('ui').get('height'),   
  }),
  (dispatch) => ({
    UiActions: bindActionCreators(uiActions, dispatch),    
  })
)(Index));
