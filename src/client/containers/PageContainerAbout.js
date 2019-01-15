import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './PageContainerAbout.scss';

const cx = classNames.bind(styles);

import anime from 'animejs';
import Swipe from 'react-easy-swipe';
//import ReactTouchEvents from "react-touch-events";

//page container 에 들어갈 패널 종류
//shop 처음 화면
import AboutIndexPanel from '@components/UI/AboutIndexPanel';
//반복되면 제목 , more 패턴 패널
import AboutPanel from '@components/UI/AboutPanel';

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';

import { Swipeable, defineSwipe } from 'react-touch';

const pageDatas = [
   
    {
        imagePath:'/static/images/about/desktop/2.jpg',
        imagePathMobile:'/static/images/about/mobile/2.jpg',      
    },  

    {
        imagePath:'/static/images/about/desktop/3.jpg',
        imagePathMobile:'/static/images/about/mobile/3.jpg',      
    },  
  
    {
        imagePath:'/static/images/about/desktop/4.jpg',
        imagePathMobile:'/static/images/about/mobile/4.jpg',      
    },  
    
    {
        imagePath:'/static/images/about/desktop/5.jpg',
        imagePathMobile:'/static/images/about/mobile/5.jpg',   
    },  

    {
        imagePath:'/static/images/about/desktop/6.jpg',
        imagePathMobile:'/static/images/about/mobile/6.jpg',   
    },  

    {

        imagePath:'/static/images/about/desktop/2.jpg',
        imagePathMobile: '/static/images/about/mobile/2.jpg',
        title:'VISION & MISSION',
        desc: ['세상에 도움ㄹ이 되는 작은 변화를 이끌어 내기 위해<br>크고 작은 다양한 프로젝트를 기획하고 구현하기 위해 사람과 환경을 위한 끊임없는 고민을 하고 있습니다.',
                '효과적인 온/오프라인 연계 홍보와 가치있는 고객 경험의<br>선사를 위해 누:룸은 다양한 소통이 이루어지는 공간을<br>만들어갑니다.'
                ],
        titleSize : 100,       
        descSize : 18,
    },
  
    {
        imagePath:'/static/images/about/desktop/3.jpg',
        imagePathMobile:'/static/images/about/mobile/3.jpg',  

      imagePath:'/static/images/about/2.jpg',      
      title:'VISION</br>& MISSION',
      desc: ['세상에 도움이 되는 작은 변화를 이끌어 내기 위해<br>',
             '크고 작은 다양한 프로젝트를 기획하고 구현하기 위해<br>',
             '사람과 환경을 위한 끊임없는 고민을 하고 있습니다.</br></br>',
             '효과적인 온/오프라인 연계 홍보와 가치있는 고객 경험의<br>',
             '선사를 위해 누:룸은 다양한 소통이 이루어지는 공간을<br>',
             '만들어갑니다.'
            ],
      titleSize : 100,         
      descSize : 18,
      titleStr: 'title_1',    
      descStr: 'desc_1',    
    },
  
    {
      imagePath:'/static/images/about/desktop/3.jpg',      
      title:'PHILOSOPHY',
      desc: ['지속가능함을 지향적으로하는 누:룸은 지나치게 풍족하고 지나치게 빠르기만한 소비시장에서<br>',
             '조금은 제한적인 제품과 공간을 통해 가치있는 경험과 바른 소비가 이루어질 수 있는 공간<br>',
             '플렛폼을 선보입니다.소비자와 생산자를 일방적으로 연결하는 물리적 공간이 아니라 생산자와<br>',
             '소비자를 한 공간에 불러 모으고 그 안에 시너지가 이루어지는 경험을 편집,제공함으로써<br>',                       
             '정체되어 있는 공간이 아닌 항상 생동감이 넘치는 즐거운 장소가 되도록 노력 할 것입니다.</br></br>',
             '가치 있는 소비를 지향하고 지속 가능한 삶을 바라는 사람이라면 누:룸은 누구에게나<br>',             
             ,'열려있습니다.<span>누:룸은 세상을 향한 작은 변화를 차곡차곡 이루어 나갈 것 입니다.</span>',
            ],
      titleSize : 100,       
      descSize : 18,
      titleStr: 'title_2',    
      descStr: 'desc_2',    

    },

  ];

class PageContainerAbout extends Component {

    canvas = React.createRef();

    state = {
        current: 0, // 현재 위치(Y좌표)
        offset: 0,
        scrollTopI: 0,
        isScrollAnimation: false, // 스크롤 중인지 여부
        isWheel: false, // 휠 작동 여부
        animate: false, // 애니메이션 중인지 여부
        move: false,
        up: false,
        down: false,
        SmoothEndPosition:0,
        pageIndex: 0, // 페이지 인덱스
        showFloating:false,
    }

    componentDidMount() {
        // 스크롤링 이벤트 추가
        window.addEventListener("scroll", this.handleScroll);
        document.addEventListener('keydown', this.handleKeyPress);
        // this.setState({
        //     // offset: window.innerHeight * 0.9
        //     offset: window.innerHeight * 0.9
        // });
        // console.log(window.innerHeight * 0.9);

        this.handleMove(0,0);
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this.handleScroll);
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleUp = (n , time) => {
        const { current, animate, up, pageIndex } = this.state;
        if(up || animate) return;

        if(pageIndex === 0) return;

        this.setState({
            animate: true,
            isWheel: true,
        });
        
        let bust = {value: current}

        anime({
            targets: bust,
            value: current-n,
            easing: 'easeInSine', //'easeInCirc',
            duration: time,
            update: anim => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                });
            },
            complete: () => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                    animate: false,
                    isWheel: false,
                    pageIndex: pageIndex - 1,
                });                
                this.pageOnChange();
            }
        });
    }

    pageOnChange = () => {        
        this.props.pageOnChange(this.state.pageIndex);
    }

    handleDown = (n , time ) => {
        const { current, animate, down, pageIndex } = this.state;
        if(down || animate) return;

        if(pageIndex >= this.props.page) return;

        

        this.setState({
            animate: true,
            isWheel: true,
        });

        
        
        let bust = {value: current}

        anime({
            targets: bust,
            value: current+n,
            easing: 'easeInSine', //'easeInCirc',
            duration: time,
            update: anim => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                });
            },
            complete: () => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                    animate: false,
                    isWheel: false,
                    pageIndex: pageIndex + 1,
                });
                
                this.pageOnChange();
            }
        });
    }

    handleMove = (page , time ) => {
        const { animate, offset } = this.state;
        
        if(animate) return;
        
        if(page < 0)
            return;

        if(page >= this.props.page) return;
        
        // IE, Chrome 동시 사용을 위한 처리
        const scrollY =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
       // console.log(scrollY);

        let bust = {value: scrollY};

        this.setState({
            animate: true,
            isWheel: true,
        });
        
        anime({
            targets: bust,
            value: offset * page,
            easing: 'easeInSine', //'easeInCirc',
            duration: time,
            update: anim => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                });
            },
            complete: () => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                    animate: false,
                    isWheel: false,
                    pageIndex: page,
                });                
                this.pageOnChange();
            }
        });
    }

    handleScroll = () => {
        const { offset } = this.state;
        const scrollTop =
             (document.documentElement && document.documentElement.scrollTop) ||
           document.body.scrollTop;


        this.setState({
            showFloating : scrollTop > 100
        });

        // const { isScrollAnimation, scrollTopI, offset } = this.state;
        // if(isScrollAnimation)
        //     return;

        // console.log('run Scroll');

        // const scrollTop =
        //   (document.documentElement && document.documentElement.scrollTop) ||
        //   document.body.scrollTop;
        // console.log(scrollTop);

        // this.setState({
        //     isScrollAnimation: true,
        //     scrollTopI: scrollTop,
        // });

        // if(scrollTopI < scrollTop) // DOWN
        //     this.handleDown(offset);
        // else  // UP 
        //     this.handleUp(offset);
    }

    onSwipeUp = (position) => {        
      //  console.log("onSwipeUp");
      //  console.log(this.onSwipeDown) ;
        //this.handleDown(this.state.offset , 500);
        this.handleMove( this.state.pageIndex - 1 , 500);
    }

    onSwipeDown = (position) => {        
      //  console.log("onSwipeDown" + this);
        //this.handleUp(this.state.offset , 500);
        this.handleMove( this.state.pageIndex + 1 , 500);
    }

    wheel = e => {        
        const { isWheel, offset, pageIndex } = this.state;        
        if(isWheel)
            return;

        if(e.deltaY > 0) { // DOWN
            // this.handleDown(offset);
            this.onSwipeDown();
        } else { // UP
            //this.handleUp(offset);
            this.onSwipeUp();
        }
    }

    handlePage = page => {
      //  console.log('handlePage : ' + page);
        this.handleMove(page , 500);
    }

    updateSize = (height) => {
        //console.log('updateSize : ' + height);    
        this.setState({
            offset: height
        })
        //console.log('__________________________________________________________this.state.pageIndex : ' + this.state.pageIndex);
        //this.handlePage( this.state.pageIndex );

    }

    onSwipeStart(event) {
        //console.log('Start swiping...', event);
    }
     
    onSwipeMove(position, event ) {    
        const { current, animate, down, pageIndex , offset  } = this.state;    
        
        //console.log( "client height=" + document.documentElement.scrollHeight );          
        //console.log(`Moved ${position.y} pixels vertically`, event);  
        
        let positionY = current-position.y;
        let smooth = positionY - (position.y * 5);

        if(positionY < 0)
            positionY = 0;
        
        if(positionY > document.documentElement.scrollHeight )
            positionY = document.documentElement.scrollHeight;
        
        if(smooth < 0)
            smooth = 0;
        
        if(smooth > document.documentElement.scrollHeight )
            smooth = document.documentElement.scrollHeight;
        
            this.setState({
                move:true,
            });


        if(position.y > 0) { // DOWN
            window.scrollTo( 0 , positionY);
            this.setState({
                current: positionY,
                SmoothEndPosition: smooth,
                animate: false,
                isWheel: false,       
                pageIndex: Math.floor( positionY / offset  ) ,
            });
            this.pageOnChange();

        } else { // UP            
            window.scrollTo( 0 , positionY);
            this.setState({
                current: positionY,
                SmoothEndPosition: smooth,
                animate: false,
                isWheel: false,                    
                pageIndex: Math.floor( positionY / offset  ) ,
            });
            this.pageOnChange();
        }

      }
     
      onSwipeEnd(event) {
        //console.log('End swiping...', event);
        const { current, animate, down, pageIndex , offset , move  } = this.state;    


        if(move === false)
            return;

        let bust = {value: scrollY};

        this.setState({
            animate: true,
            isWheel: true,
            move:false,
            
        });

        anime({
            targets: bust,
            value:  this.state.SmoothEndPosition,
            easing: 'easeOutSine', //'easeInCirc',
            duration: 300,
            update: anim => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                });
            },
            complete: () => {
                window.scrollTo(0, bust.value);
                this.setState({
                    current: bust.value,
                    animate: false,
                    isWheel: false,
                    pageIndex: Math.floor( this.state.SmoothEndPosition / offset  ) ,
                });
                this.pageOnChange();                
            }
        });

      }

      onSwipeStart(event) {
        
      }
 
      constructor (props){
        super(props);
      
        
        this.onSwipeMove = this.onSwipeMove.bind(this);
        this.onSwipeEnd = this.onSwipeEnd.bind(this);        
        this.onSwipeStart = this.onSwipeStart.bind(this);       
        this.handleSwipe = this.handleSwipe.bind(this);         
        this.handleKeyPress = this.handleKeyPress.bind(this);        
      }


      drawAboutPanels = () => {
        const { theme } = this.props;        
        let aboutPush = [];          

        for(let i = 1; i < theme.about.length ; i++ )
        {
            aboutPush.push(<AboutPanel key={i} page = { this.props.page }   index={ i + 1 } pageData={ theme.about[i].img } pageIndex={this.props.pageIndex} pageMove={this.props.pageMove} />);                     
        }
        return aboutPush;          
      }

      drawAboutMobilePanels = () => {
        const { theme } = this.props;        
        let aboutPush = [];          

        for(let i = 1; i < theme.aboutMobile.length  ; i++ )
        {
            aboutPush.push(<AboutPanel key={i} page = { this.props.page }  index={ i + 1 } pageData={ theme.aboutMobile[i].img } pageIndex={this.props.pageIndex} pageMove={this.props.pageMove} />);                     
        }

        console.log("aboutPush=" + aboutPush);

        return aboutPush;          

      }


    draw_about = () => {
        const { theme } = this.props;
        return (
            <div>
            <AboutIndexPanel index={1} pageData={ theme } page = { this.props.page }  pageIndex={this.props.pageIndex} pageMove={this.props.pageMove} onSize={this.updateSize} />          
      
            { this.drawAboutPanels() }
         
            {
                this.state.showFloating  && (
                <div className={cx('page-container-FixedTopPosition')}>        
                    <div className={cx('page-container-listStyle')} >                            
                        <div className={cx('page-container-buttonStyle')} onClick = { () => this.handleMove(0,500) }>
                            <svg className={cx('page-container-iconStyle')} viewBox="0 0 54 54"> 
                                <use xlinkHref="/static/images/svg/floating.svg#floating"></use>
                            </svg>
                        </div>
                    </div>      
                </div>  
                )
            }
            </div>
        );
    } 


    drawConatents = () => {
        const { theme } = this.props;
        const swipe = defineSwipe({swipeDistance: 50});
        return (
            <div>
                {/* <ReactTouchEvents                         
                    onSwipe={ this.handleSwipe }
                > */}
                <Swipeable config={swipe} onSwipeUp={this.onSwipeDown} onSwipeDown={this.onSwipeUp}>
                    { this.draw_about() }
                </Swipeable>
                {/* </ReactTouchEvents> */}
            </div>
        );
    }

    draw_Mobile_Conatents = () => {
        const { theme } = this.props;
        return (
            <div>
        <AboutIndexPanel index={1} pageData={ theme } page = { this.props.page } pageIndex={this.props.pageIndex} pageMove={this.props.pageMove} onSize={this.updateSize} />          
      
        { this.drawAboutMobilePanels() }
      
        {
            this.state.showFloating  && (
            <div className={cx('page-container-FixedTopPosition')}>        
                <div className={cx('page-container-listStyle')} >                            
                    <div className={cx('page-container-buttonStyle')} onClick = { () => this.handleMove(0,500) }>
                        <svg className={cx('page-container-iconStyle')} viewBox="0 0 54 54"> 
                            <use xlinkHref="/static/images/svg/floating.svg#floating"></use>
                        </svg>
                    </div>
                </div>      
            </div>  
            )
        }
        </div>
        );
    }

    handleSwipe (direction) {
        if(direction === "top") {
            this.onSwipeDown();
        }
        else if(direction ==="bottom") {
            this.onSwipeUp();
        }
    }
    
    handleKeyPress(event) {        
        //down
        if(event.keyCode === 40 ) {
            this.onSwipeDown();            
        }
        else if(event.keyCode === 38) {
            this.onSwipeUp();
        }
    }


    render() {
        const { theme } = this.props;
        
        if(theme === '')
            return ( <div></div>);

        return (
            <div id="about-page-container" onWheel = {(e) => this.wheel(e)}  >
                   
                    <PhoneBreakpoint>
                    { this.draw_Mobile_Conatents() }
                    </PhoneBreakpoint>

                    <DesktopBreakpoint>
                        { this.drawConatents() }
                    </DesktopBreakpoint>

                    <TabletBreakpoint>
                     { this.drawConatents() }
                    </TabletBreakpoint>
                
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
  )(PageContainerAbout);
