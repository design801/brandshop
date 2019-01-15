import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import classNames from 'classnames/bind';
import styles from './imagePanel.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider , IconButton, MuiThemeProvider  } from '@material-ui/core/';

import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import CloseIcon from '@material-ui/icons/Close';

import Grid from '@material-ui/core/Grid';

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

import ImageSlidePanel from './ImageSlidePanel';

const cx = classNames.bind(styles);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

import ReactPagination from '@components/common/PageScrollerIndigator';
import FixedMenu from '@components/common/FixedMenu';
  
import { traffic } from '@lib/admin';

class ImagePanel extends React.Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    const {pageData} = this.props;

    if(pageData.pattern > 0)
      this.setState({ open: true });       

  };

  handleClickClose = () => {
    this.setState({ open: false });       
  }

  drawText = () => {
    const {pageData} = this.props;
    return (
      <div className = { cx('contentStyle')}>
                <div className = { cx('contentStyle_left')} >

                    <div className = { cx('contentStyle_flex')}>
                    <Typography className = { cx('content_logo')}>{pageData.title}</Typography>
                    <Typography className = { cx('contentStyle_line_2_koreaTitle_typo')}>
                    { pageData.subTitle }
                    </Typography>
                    </div>

                  
                </div>                 
         
                <div className = { cx('contentStyle_right')} >
                    <Typography className = { cx('contentStyle_line_1_Desc_typo')}>
                      {
                         ReactHtmlParser( pageData.more.desc )                         
                      }
                      <br></br>
                      <a href={ pageData.more.link } onClick={ e => this.goMore( ) } target="_blank">   { ReactHtmlParser( pageData.more.linkDesc )}   </a>       
                    </Typography>                      
                </div>        
           
      </div>
    );
  }
  
  goLink = async( contentsData ) => {
    const { theme , pageData  } = this.props;
    const recv = await traffic(theme.id , pageData.id , contentsData.id);         
  }

  goMore = async() => {    
    const { theme , pageData  } = this.props;
    const recv = await traffic(theme.id , pageData.id , "");         
  }


  drawImagePattern_1 = () => {
    const {pageData} = this.props;
    //세로로 2개    
    return (
    <div className = { cx('imageStyle_1')}   >
       <a href={ pageData.content[0].link } onClick={ e => this.goLink( pageData.content[0] ) } className = { cx('imageSize')} target="_blank"> <img src= { pageData.content[0].img } className = { cx('imgFillStyle')}  /> </a>       
       <a href={ pageData.content[1].link } onClick={ e => this.goLink( pageData.content[1] ) }  className = { cx('imageSize')} target="_blank"> <img src= { pageData.content[1].img } className = { cx('imgFillStyle')}  /> </a>       
    </div>
    );
  }

  drawImagePattern_2 = () => {
    const {pageData} = this.props;
    //가로 4개씩 2줄
    return (
    <div className = { cx('imageStyleDiv_2')} >
          <div className = { cx('imageStyle_2')}>
          <a href={ pageData.content[0].link } onClick={ e => this.goLink( pageData.content[0] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[0].img } className = { cx('imgFillStyle')} />       </a>         
          <a href={ pageData.content[1].link } onClick={ e => this.goLink( pageData.content[1] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[1].img } className = { cx('imgFillStyle')} />     </a>      
          <a href={ pageData.content[2].link } onClick={ e => this.goLink( pageData.content[2] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[2].img } className = { cx('imgFillStyle')} />  </a>     
          <a href={ pageData.content[3].link } onClick={ e => this.goLink( pageData.content[3] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[3].img } className = { cx('imgFillStyle')} />       </a>    
          </div>
          <div className = { cx('imageStyle_2')}>
          <a href={ pageData.content[4].link } onClick={ e => this.goLink( pageData.content[4] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[4].img } className = { cx('imgFillStyle')} />       </a>      
          <a href={ pageData.content[5].link } onClick={ e => this.goLink( pageData.content[5] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[5].img } className = { cx('imgFillStyle')} />       </a>      
          <a href={ pageData.content[6].link } onClick={ e => this.goLink( pageData.content[6] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[6].img } className = { cx('imgFillStyle')} />       </a>      
          <a href={ pageData.content[7].link } onClick={ e => this.goLink( pageData.content[7] ) }  className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.content[7].img } className = { cx('imgFillStyle')} />       </a>      
          </div>
    </div>   
    );
  }

  drawImagePattern_3 = () => {
    const {pageData} = this.props;

    return (
    //가로로 4개
    <div className = { cx('imageStyle_3')}   >
    <a href={ pageData.content[0].link } onClick={ e => this.goLink( pageData.content[0] ) }  className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.content[0].img } className = { cx('imgFillStyle')} />      </a>            
    <a href={ pageData.content[1].link } onClick={ e => this.goLink( pageData.content[1] ) }  className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.content[1].img } className = { cx('imgFillStyle')} />      </a>         
    <a href={ pageData.content[2].link } onClick={ e => this.goLink( pageData.content[2] ) }  className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.content[2].img } className = { cx('imgFillStyle')} />      </a>         
    <a href={ pageData.content[3].link } onClick={ e => this.goLink( pageData.content[3] ) }  className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.content[3].img } className = { cx('imgFillStyle')} />      </a>          
   </div>

    );
  }


  drawImage = () => {
    const {pageData} = this.props;
    
    if(pageData.pattern == 1 )
      return this.drawImagePattern_1();
    else if(pageData.pattern == 2 )
      return this.drawImagePattern_2();
    else if(pageData.pattern == 3 )
      return this.drawImagePattern_3();

  }

  handleShow = () => {
    console.log('handleShow');
    const { UiActions } = this.props;
    UiActions.setSlideData(true);
    this.setState({
      open: true,
    });
  }

  handleHidden = () => {
    console.log('handleHidden');
    const { UiActions } = this.props;
    UiActions.setSlideData(false);
    this.setState({
      open: false,
    });
  }


  draw_button_link = () => {
    const {pageData} = this.props;
    if(this.props.isMoved === undefined || this.props.isMoved === false ) {
      return (
        <div className = { cx('morePosition')} >
            <Button classes = {{ root: cx('buttonTextStyle')}} onClick = { this.handleClickOpen }  className = { cx('buttonStyle')}  >more...</Button>
        </div>
      );
    }
    else {
       return (
          <div className = { cx('morePosition')} >
            <a href={ pageData.more.link } className = { cx('linkStyle')} target="_blank"><Button classes = {{ root: cx('buttonTextStyle')}} className = { cx('buttonStyle')} > more...</Button></a>        
          </div>
       );
    }
  }


  draw_slide_button = () => {
    const {pageData} = this.props;
    if(this.props.isMoved === undefined || this.props.isMoved === false ) {
      return (
        <div>
          <div className={cx('leftButton', this.state.open && 'hidden')} onClick={this.handleShow}>
          </div>
            
          <div className={cx('rightButton', !this.state.open && 'hidden')} onClick={this.handleHidden}>
          </div>
        </div>
      );
    }    
  }

  draw_slide_link = () => {
    const {pageData} = this.props;
    if(this.props.isMoved === undefined || this.props.isMoved === false ) {
      return (
        <Slide direction="left" in={ this.state.open } mountOnEnter unmountOnExit>
        <Paper className = { cx('paperStyle_mobile')}>       
          <ImageSlidePanel pageData={pageData} theme = { this.props.theme }  />
        </Paper>
      </Slide>
      );
    }    
  }


  render() {        
    const {pageData} = this.props;
    //console.log("pageData");
    //console.log(pageData);

    return (       

      <div className = { cx('ImagePanel')}>        
        <DesktopBreakpoint>
        <div className = { cx('moreStyle')} >
            {
              pageData.pattern === 0
              ?
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  <br></br>
                  <div className = { cx('morePosition')} >
                    <a href={ pageData.more.link } className = { cx('linkStyle')} target="_blank"><Button classes = {{ root: cx('buttonTextStyle')}} className = { cx('buttonStyle')} > more...</Button></a>
                    </div>
                </div>
                
              )
              :
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  <br></br>
                      { this.draw_button_link() }                                      
                </div>
              )
            }     
          </div>

          <Slide direction="left" in={ this.state.open } mountOnEnter unmountOnExit>
              <Paper className = { cx('paperStyle')}>       
              <div className = { cx('closeButton')}>
              <IconButton onClick = { this.handleClickClose }>
                <CloseIcon />
              </IconButton>
              </div>

              { this.drawText() } 
              { this.drawImage() } 

              </Paper>
            </Slide>


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

          <div className='ImagePanelWrp' style= {{ backgroundImage: "url(" +  this.props.pageData.bg + ")" }}>
          </div>
        </DesktopBreakpoint>

        <TabletBreakpoint>
          <div className = { cx('moreStyle')} >
            {
              pageData.pattern === 0
              ?
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  <br></br>
                  <div className = { cx('morePosition')} >
                    <a href={ pageData.more.link } className = { cx('linkStyle')} target="_blank"><Button classes = {{ root: cx('buttonTextStyle')}} className = { cx('buttonStyle')} > more...</Button></a>
                    </div>
                </div>
                
              )
              :
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  <br></br>
                  
                    { this.draw_button_link() }
                  
                </div>
              )
            }     
          </div>

          <Slide direction="left" in={ this.state.open } mountOnEnter unmountOnExit>
              <Paper className = { cx('paperStyle')}>       
              <div className = { cx('closeButton')}>
              <IconButton onClick = { this.handleClickClose }>
                <CloseIcon />
              </IconButton>
              </div>

              { this.drawText() } 
              { this.drawImage() } 

              </Paper>
            </Slide>

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

          <div className='ImagePanelWrp' style= {{ backgroundImage: "url(" +  this.props.pageData.bg + ")" }}>
          </div>
        </TabletBreakpoint>

        <PhoneBreakpoint>
          { this.draw_slide_button() }
          <div className = { cx('moreStyle')} >
            {
              pageData.pattern === 0
              ?
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  <br></br>
                  <div className = { cx('morePosition')} >
                    <a href={ pageData.more.link } className = { cx('linkStyle')} target="_blank"><Button classes = {{ root: cx('buttonTextStyle')}} className = { cx('buttonStyle')} > more...</Button></a>
                    </div>
                </div>
              )
              :
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  <Typography className = { cx('koreaStyle')}>{pageData.subTitle}</Typography>
                  <br/>
                  <Typography className = { cx('contentStyle_line_1_Desc_typo_mobile')}>
                     { ReactHtmlParser( pageData.more.descMobile )}
                      <br></br>
                      <a href={ pageData.more.link } onClick={ e => this.goMore() } target="_blank">   { ReactHtmlParser( pageData.more.linkDescMobile )}   </a>    
                  </Typography>  
                </div>
              )
            }            
          </div>

          { this.draw_slide_link() }

          <div className={cx('ImagePanelWrp')} style= {{ backgroundImage: "url(" +  this.props.pageData.bgMobile + ")" }}>
          </div>
        </PhoneBreakpoint>
        
      </div>
    );
  }
}

ImagePanel.propTypes = {  
  pageData:PropTypes.object,
}

export default connect(
  (state) => ({
      isSlide: state.ui.get('ui').get('isSlide'),    
  }),
  (dispatch) => ({
    UiActions: bindActionCreators(uiActions, dispatch),    
  })
)(ImagePanel);

/*
imagePath:'/static/images/shop/shop_2.jpg',
title:'Au Revoir',
koreaTitle:'오흐부아흐',
desc:'Daily look for the thoughtful women and men.',
linkDesc:'더 많은 Au Revoir 의 제품 보러가기',
imagePattern:1,
imageData: ['/static/aurevoir_1.jpg' , '/static/aurevoir_2.jpg' ],
*/