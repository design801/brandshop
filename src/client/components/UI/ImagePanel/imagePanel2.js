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


const cx = classNames.bind(styles);
  

class ImagePanel extends React.Component {

  state = {
    open: false,
  };


  handleClickOpen = () => {
    const {pageData} = this.props;

    if(pageData.imagePattern > 0)
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
                    <Typography className = { cx('content_logo')}>{pageData.title_detail}</Typography>
                    {/* <img src =  { pageData.title_detail }  className = { cx('content_logo')} /> /> */}
                    <Typography className = { cx('contentStyle_line_2_koreaTitle_typo')}>
                    { pageData.koreaTitle }
                    </Typography>
                    </div>

                  
                </div>                 
         
                <div className = { cx('contentStyle_right')} >
                    <Typography className = { cx('contentStyle_line_1_Desc_typo')}>
                      { ReactHtmlParser(pageData.desc) }
                    </Typography>                      
                </div>        
           
      </div>
    );
  }

  drawMobileText = () => {
    const {pageData} = this.props;
    return (
      <div className = { cx('contentStyle_Mobile')}>
           <div className = { cx('contentStyle_Top')} >
                    <Typography className = { cx('content_logo_Mobile')}>{pageData.title_detail}</Typography>
                    {/* <img src =  { pageData.title_detail }  className = { cx('content_logo_Mobile')} /> /> */}
                    <Typography className = { cx('contentStyle_line_2_koreaTitle_typo_Mobile')}>
                    { pageData.koreaTitle }
                    </Typography>
          </div>

          <div className = { cx('contentStyle_Top')} >
                   <Typography className = { cx('contentStyle_line_1_Desc_typo')}>
                      { ReactHtmlParser(pageData.desc) }
                    </Typography>           
          </div>
                   
               
                              
      </div>
    );
  }

  drawImagePattern_1 = () => {
    const {pageData} = this.props;
    //세로로 2개    
    return (
    <div className = { cx('imageStyle_1')}   >
       <a href={ pageData.linkData[0] } className = { cx('imageSize')} target="_blank"> <img src= { pageData.imageData[0] } className = { cx('imgFillStyle')}  /> </a>       
       <a href={ pageData.linkData[1] } className = { cx('imageSize')} target="_blank"> <img src= { pageData.imageData[1] } className = { cx('imgFillStyle')}  /> </a>       
    </div>
    );
  }

  drawImagePattern_2 = () => {
    const {pageData} = this.props;
    //가로 4개씩 2줄
    return (
    <div className = { cx('imageStyleDiv_2')} >
          <div className = { cx('imageStyle_2')}>
          <a href={ pageData.linkData[0] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[0] } className = { cx('imgFillStyle')} />       </a>         
          <a href={ pageData.linkData[1] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[1] } className = { cx('imgFillStyle')} />     </a>      
          <a href={ pageData.linkData[2] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[2] } className = { cx('imgFillStyle')} />  </a>     
          <a href={ pageData.linkData[3] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[3] } className = { cx('imgFillStyle')} />       </a>    
          </div>
          <div className = { cx('imageStyle_2')}>
          <a href={ pageData.linkData[4] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[4] } className = { cx('imgFillStyle')} />       </a>      
          <a href={ pageData.linkData[5] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[5] } className = { cx('imgFillStyle')} />       </a>      
          <a href={ pageData.linkData[6] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[6] } className = { cx('imgFillStyle')} />       </a>      
          <a href={ pageData.linkData[7] } className = { cx('imageSize_pattern_2')} target="_blank"> <img src= { pageData.imageData[7] } className = { cx('imgFillStyle')} />       </a>      
          </div>
    </div>   
    );
  }

  drawImagePattern_3 = () => {
    const {pageData} = this.props;

    return (
    //가로로 4개
    <div className = { cx('imageStyle_3')}   >
    <a href={ pageData.linkData[0] } className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.imageData[0] } className = { cx('imgFillStyle')} />      </a>            
    <a href={ pageData.linkData[1] } className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.imageData[1] } className = { cx('imgFillStyle')} />      </a>         
    <a href={ pageData.linkData[2] } className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.imageData[2] } className = { cx('imgFillStyle')} />      </a>         
    <a href={ pageData.linkData[3] } className = { cx('imageSize_pattern_3')} target="_blank"> <img src= { pageData.imageData[3] } className = { cx('imgFillStyle')} />      </a>          
   </div>

    );
  }


  drawImage = () => {
    const {pageData} = this.props;
    
    if(pageData.imagePattern == 1 )
      return this.drawImagePattern_1();
    else if(pageData.imagePattern == 2 )
      return this.drawImagePattern_2();
    else if(pageData.imagePattern == 3 )
      return this.drawImagePattern_3();

  }

  render() {        
    const {pageData} = this.props;

    return (        
      <div className = { cx('ImagePanel')}  style= {{ backgroundImage:  "url(" +  this.props.pageData.imagePath + ")" }}>

        {
          true && (
          <div className = { cx('moreStyle')} >
            {
              pageData.imagePattern === 0
              ?
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  {/* <img src={pageData.title}  className = { cx('titleStyle')} /> */}
                  <br></br>
                  <div className = { cx('morePosition')} >
                    <a href={ pageData.homepage } className = { cx('linkStyle')} target="_blank"><Button classes = {{ root: cx('buttonTextStyle')}} className = { cx('buttonStyle')} > more...</Button></a>
                    </div>
                </div>
                
              )
              :
              (
                <div>
                  <Typography className = { cx('titleStyle')}>{pageData.title}</Typography>
                  {/* <img src={pageData.title}  className = { cx('titleStyle')} /> */}
                  <br></br>
                  <div className = { cx('morePosition')} >
                    <Button classes = {{ root: cx('buttonTextStyle')}} onClick = { this.handleClickOpen }  className = { cx('buttonStyle')}  >more...</Button>
                  </div>
                </div>
              )
            }            
          </div>
          )
        }

        {
          
            <Slide direction="left" in={ this.state.open } mountOnEnter unmountOnExit>
              <Paper className = { cx('paperStyle')}>       
              <div className = { cx('closeButton')}>
              <IconButton onClick = { this.handleClickClose }>
                <CloseIcon />
              </IconButton>
              </div>

              <DesktopBreakpoint>
              { this.drawText() }  
              </DesktopBreakpoint>

              <TabletBreakpoint>
              { this.drawText() }
              </TabletBreakpoint> 
              
              <PhoneBreakpoint>
              { this.drawMobileText() }
              </PhoneBreakpoint>

              { this.drawImage() } 

              </Paper>
            </Slide>
          
        }
      </div>
    );
  }
}

ImagePanel.propTypes = {  
  pageData:PropTypes.object,
}

export default ImagePanel;

/*
imagePath:'/static/images/shop/shop_2.jpg',
title:'Au Revoir',
koreaTitle:'오흐부아흐',
desc:'Daily look for the thoughtful women and men.',
linkDesc:'더 많은 Au Revoir 의 제품 보러가기',
imagePattern:1,
imageData: ['/static/aurevoir_1.jpg' , '/static/aurevoir_2.jpg' ],
*/