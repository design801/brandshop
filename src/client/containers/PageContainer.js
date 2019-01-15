import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './PageContainer.scss';

const cx = classNames.bind(styles);

import anime from 'animejs';
import Swipe from 'react-easy-swipe';
import ReactTouchEvents from "react-touch-events";

//page container 에 들어갈 패널 종류
//shop 처음 화면
import ShopIndexPanel from '@components/UI/ShopIndexPanel';
//반복되면 제목 , more 패턴 패널
import ImagePanel from '@components/UI/ImagePanel';
// commin up 패널
import ConstructPanel from '@components/UI/ConstructionPanel';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as uiActions from '@store/modules/ui';
import { DesktopBreakpoint, TabletBreakpoint, PhoneBreakpoint } from '@components/common/Responsive_utilities';

import { Swipeable, defineSwipe } from 'react-touch';

const pageDatas = [
    {
        imagePath:'/static/images/shop/desktop/aurevoir/bg.jpg',
        imagePathMobile:'/static/images/shop/mobile/aurevoir/bg.jpg',
        title: 'Au Revoir',
        title_detail: 'Au Revoir',
        koreaTitle:'오 흐부아흐',
        desc: '오 흐부아흐는 <span>친자연적 소재</span>를 바탕으로 <span>자연스러운 일상의 모습</span>을 디자인합니다. <br/>' + 
                '<a href="http://aurevoir.me/goods/goods_list.php?cateCd=001" target="blank">더 많은 Au Revoir의 제품 보러가기</a>',
        descMobile: '오 흐부아흐는 친자연적 소재를 바탕으로<br/>자연스러운 일상의 모습을 디자인합니다.<br/>' + 
        '<a href="http://aurevoir.me/goods/goods_list.php?cateCd=001" target="blank">더 많은 Au Revoir의 제품 보러가기</a>',
        linkDesc:'더 많은 Au Revoir의 제품 보러가기',
        imagePattern:1,
        imageData: ['/static/images/shop/desktop/aurevoir/1.jpg' , '/static/images/shop/desktop/aurevoir/2.jpg' ],
        imageDataMobile: ['/static/images/shop/mobile/aurevoir/1.jpg' , '/static/images/shop/mobile/aurevoir/2.jpg' ],
        linkData : ['http://aurevoir.me/goods/goods_view.php?goodsNo=1000000020','http://aurevoir.me/goods/goods_view.php?goodsNo=1000000028'],
        homepage :'http://aurevoir.me/goods/goods_list.php?cateCd=001',
    },
  
    {
        imagePath:'/static/images/shop/desktop/prida/bg.jpg',
        imagePathMobile:'/static/images/shop/mobile/prida/bg.jpg',
        title: 'PRIDA',
        title_detail: 'PRIDA',
        koreaTitle:'프리다',
        desc: '<span>견고한 퀄리티</span>와 <span>따뜻한 마음</span>까지 전하는 천연 밀랍 캔들<br/>' + 
        '<a href="http://prida.co.kr/" target="blank">더 많은 PRIDA의 제품 보러가기</a>',
        descMobile: '견고한 퀄리티와 따뜻한 마음까지<br/>전하는 천연 밀랍 캔들<br/>' + 
        '<a href="http://prida.co.kr/" target="blank">더 많은 PRIDA의 제품 보러가기</a>',
        linkDesc:'더 많은 PRIDA 의 제품 보러가기',
        imagePattern:2,
        imageData: ['/static/images/shop/desktop/prida/1.jpg' , '/static/images/shop/desktop/prida/2.jpg' , '/static/images/shop/desktop/prida/3.jpg' , '/static/images/shop/desktop/prida/4.jpg',
                    '/static/images/shop/desktop/prida/5.jpg' , '/static/images/shop/desktop/prida/6.jpg' , '/static/images/shop/desktop/prida/7.jpg' , '/static/images/shop/desktop/prida/8.jpg' ],

        imageDataMobile: ['/static/images/shop/mobile/prida/1.jpg' , '/static/images/shop/mobile/prida/2.jpg' , '/static/images/shop/mobile/prida/3.jpg' , '/static/images/shop/mobile/prida/4.jpg',
                    '/static/images/shop/mobile/prida/5.jpg' , '/static/images/shop/mobile/prida/6.jpg' , '/static/images/shop/mobile/prida/7.jpg' , '/static/images/shop/mobile/prida/8.jpg' ],

        linkData : ['http://prida.co.kr/product/detail.html?product_no=27',                               //a    
                  'http://prida.co.kr/product/detail.html?product_no=71&cate_no=1&display_group=6',     //b
                  'http://prida.co.kr/product/detail.html?product_no=48&cate_no=1&display_group=6',     //c
                  'http://prida.co.kr/product/detail.html?product_no=54&cate_no=24&display_group=1',    //d
                  'http://prida.co.kr/product/detail.html?product_no=74&cate_no=1&display_group=6',     //e    
                  'http://prida.co.kr/product/detail.html?product_no=78&cate_no=1&display_group=4',     //f
                  'http://prida.co.kr/product/detail.html?product_no=47',                               //g
                  'http://prida.co.kr/product/detail.html?product_no=55&cate_no=24&display_group=1',    //h    
                 ],
        homepage :'http://prida.co.kr/',
    },
  
    {
        imagePath:'/static/images/shop/desktop/moohae/bg.jpg',
        imagePathMobile:'/static/images/shop/mobile/moohae/bg.jpg',
        title: 'moohae',
        title_detail: 'moohae',
        koreaTitle:'무해',
        desc: '환경과 건강한 삶을 위한 <span>100%오가닉코튼 </span>나이트웨어<br/>' + 
        '<a href="https://instagram.com/moohae_space?utm_source=ig_profile_share&igshid=enofze6ao2i3" target="blank">더 많은 moohae의 제품 보러가기</a>',
        descMobile: '환경과 건강한 삶을 위한 <br/>100% 오가닉코튼 나이트웨어<br/>' + 
        '<a href="https://instagram.com/moohae_space?utm_source=ig_profile_share&igshid=enofze6ao2i3" target="blank">더 많은 moohae의 제품 보러가기</a>',
        linkDesc:'더 많은 moohae 의 제품 보러가기',
        imagePattern:3,
        imageData: ['/static/images/shop/desktop/moohae/1.jpg' , '/static/images/shop/desktop/moohae/2.jpg', '/static/images/shop/desktop/moohae/3.jpg' , '/static/images/shop/desktop/moohae/4.jpg'],
        imageDataMobile: ['/static/images/shop/mobile/moohae/1.jpg' , '/static/images/shop/mobile/moohae/2.jpg', '/static/images/shop/mobile/moohae/3.jpg' , '/static/images/shop/mobile/moohae/4.jpg'],
        
        linkData : ['https://www.instagram.com/p/Bp_EmukA2nD/?utm_source=ig_share_sheet&igshid=17j5yjodesnnk(b)', //a
                    'https://www.instagram.com/p/BquI3iQg24B/?utm_source=ig_share_sheet&igshid=1xtjai2khc6be',    //b
                    'https://www.instagram.com/p/BqpXphXA866/?utm_source=ig_share_sheet&igshid=10bssvun8r829',    //c
                    'https://www.instagram.com/p/BqWTcxuAw0f/'],                                                  //d        
        homepage :'https://instagram.com/moohae_space?utm_source=ig_profile_share&igshid=enofze6ao2i3',
  
    },
  
    {
        imagePath:'/static/images/shop/desktop/fradore/bg.jpg',
        imagePathMobile:'/static/images/shop/mobile/fradore/bg.jpg',
        title: 'fradore',
        title_detail: 'fradore',
        koreaTitle:'프라도어',
        desc: '당신의 기억을 부를 <span>어떤 향기에 관하여</span><br/>' + 
        '<a href="https://www.amorepacificmall.com/kr/ko/display/brand/brand35?displayMenuId=brand35&brandSn=30#none" target="blank">더 많은 fradore의 제품 보러가기</a>',
        descMobile: '당신의 기억을 부를 <br/>어떤 향기에 관하여<br/>' + 
        '<a href="https://www.amorepacificmall.com/kr/ko/display/brand/brand35?displayMenuId=brand35&brandSn=30#none" target="blank">더 많은 fradore의 제품 보러가기</a>',
        linkDesc:'더 많은 fradore 의 제품 보러가기',
        imagePattern:3,
        imageData: ['/static/images/shop/desktop/fradore/1.jpg' , '/static/images/shop/desktop/fradore/2.jpg','/static/images/shop/desktop/fradore/3.jpg' , '/static/images/shop/desktop/fradore/4.jpg'],
        imageDataMobile: ['/static/images/shop/mobile/fradore/1.jpg' , '/static/images/shop/mobile/fradore/2.jpg','/static/images/shop/mobile/fradore/3.jpg' , '/static/images/shop/mobile/fradore/4.jpg'],
        linkData : [
                        'https://www.amorepacificmall.com/kr/ko/product/detail?onlineProdSn=22152&onlineProdCode=111860000018',
                        'https://www.amorepacificmall.com/kr/ko/product/detail?onlineProdSn=22153&onlineProdCode=111860000019',
                        'https://www.amorepacificmall.com/kr/ko/product/detail?onlineProdSn=21795&onlineProdCode=111860000011',
                        'https://www.amorepacificmall.com/kr/ko/product/detail?onlineProdSn=22150&onlineProdCode=111860000016'
                    ],
        homepage :'https://www.amorepacificmall.com/kr/ko/display/brand/brand35?displayMenuId=brand35&brandSn=30#none',
    },
  
    {
        imagePath:'/static/images/shop/desktop/tumblbug/bg.jpg',
        imagePathMobile:'/static/images/shop/mobile/tumblbug/bg.jpg',
        title: 'tumblbug',
        title_detail: 'tumblbug',
        koreaTitle:'텀블벅',
        desc: "장애아동을 돕는 가장 맛있는 방법<span> '그대로괜찮은쿠키 '</span>시즌3<br/>" + 
                '<a href="https://tumblbug.com/" target="blank">' + "더 많은 tumblbug의 펀딩 보러가기</a>",
        descMobile: "장애아동을 돕는 가장 맛있는 방법<br/> '그대로괜찮은쿠키 ' 시즌3<br/>" + 
        '<a href="https://tumblbug.com/" target="blank">' + "더 많은 tumblbug의 펀딩 보러가기</a>",
        linkDesc:"<span>'그대로괜찮은 쿠키'</span>펀딩하러 가기",
        imagePattern:1,
        imageData: ['/static/images/shop/desktop/tumblbug/1.jpg' , '/static/images/shop/desktop/tumblbug/2.jpg' ],
        imageDataMobile: ['/static/images/shop/mobile/tumblbug/1.jpg' , '/static/images/shop/mobile/tumblbug/2.jpg' ],
        linkData : ['https://tumblbug.com/justfinecookie_3','https://tumblbug.com/justfinecookie_3'],
        homepage :'https://tumblbug.com/',

    },
  ];

class PageContainer extends Component {

    canvas = React.createRef();

    state = {
        current: 0, // 현재 위치(Y좌표)
        offset: 0,
        scrollTopI: 0,
        isScrollAnimation: false, // 스크롤 중인지 여부
        isWheel: false, // 휠 작동 여부
        animate: false, // 애니메이션 중인지 여부        
        move:false,
        up: false,
        down: false,
        SmoothEndPosition:0,
        pageIndex: 0, // 페이지 인덱스
    }

    componentDidMount() {
        // 스크롤링 이벤트 추가
        window.addEventListener("scroll", this.handleScroll);
        document.addEventListener('keydown', this.handleKeyPress);
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

        console.log('handleUp');

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
        console.log("pageOnChange")
        this.props.pageOnChange(this.state.pageIndex);
    }

    handleDown = (n , time ) => {
        const { current, animate, down, pageIndex } = this.state;
        if(down || animate) return;

        if(pageIndex >= this.props.page) return;

        console.log('handleDown');

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


    handleMove = (page , time) => {
        const { animate, offset, isWheel } = this.state;
        if(animate) return;

        if(isWheel) return;

        if(page >= this.props.page) return;

        if(page < 0)
            return;

        console.log('handleMove');

        //console.log('handleMove page' + page);

        // IE, Chrome 동시 사용을 위한 처리
        const scrollY =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        //console.log(scrollY);

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
        console.log('handleScroll')
        const { offset } = this.state;
        const scrollTop =
             (document.documentElement && document.documentElement.scrollTop) ||
           document.body.scrollTop;

        this.setState({
            showFloating : scrollTop >  100
        });
    }

    onSwipeUp = (position) => {        
        console.log("onSwipeUp");
        const { animate } = this.state;
        if(animate) return;

        //console.log(this.onSwipeDown) ;
        //this.handleDown(this.state.offset , 500);
        this.handleMove( this.state.pageIndex - 1 , 500);
    }

    onSwipeDown = (position) => {        
        console.log("onSwipeDown");
        const { animate } = this.state;
        if(animate) return;

        //this.handleUp(this.state.offset , 500);
        this.handleMove( this.state.pageIndex + 1 , 500);
    }

    wheel = e => {  
        console.log('onWheel');  
        
        const { isWheel } = this.state;
        if(isWheel) return;
             
        if(e.deltaY > 0) { // DOWN
            // this.handleDown(offset);
            this.onSwipeDown();
        } else { // UP
            //this.handleUp(offset);
            this.onSwipeUp();
        }
    }

    handlePage = page => {
        console.log('handlePage : ' + page);
        this.handleMove(page , 500);
    }

    updateSize = (height) => {
        
        this.setState({
            offset: height
        })
        
        //this.handlePage( this.state.pageIndex );

    }

    onSwipeStart(event) {
        
    }

    onSwipeMove(position, event) {    
        console.log('onSwipeMove');
        const { current, animate, down, pageIndex , offset  } = this.state;    
        // console.log(current-position.y);          
        // console.log( "client height=" + document.documentElement.scrollHeight );          
        // console.log(`Moved ${position.y} pixels vertically`, event);  
        
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
        console.log('onSwipeEnd');
        console.log(scrollY);
        const { current, animate, down, pageIndex , offset , move } = this.state;    

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
            duration: 500,
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

    constructor (props){
        super(props);
      
        
        this.onSwipeMove = this.onSwipeMove.bind(this);
        this.onSwipeEnd = this.onSwipeEnd.bind(this);        
        this.onSwipeStart = this.onSwipeStart.bind(this);        
        //this.handleSwipe = this.handleSwipe.bind(this);        
        this.handleKeyPress = this.handleKeyPress.bind(this);        
    }


    drawBrandPanels = () => {
        const { theme } = this.props;        
        let brandPush = [];          
        for(let i = 0; i < theme.brand.length ; i++ )
        {
            brandPush.push(  <ImagePanel key = { i } index={ 3 + i } pageIndex={this.props.pageIndex}  page = { this.props.page }  pageData = { theme.brand[i] } pageMove={this.props.pageMove}  theme = { theme } isMoved = { this.props.isMoved } />  );                     
        }
        return brandPush;          
      }


      
    drawContents = () => {
        return (
            <div>
            <ShopIndexPanel index={1}  page = { this.props.page } pageIndex={this.props.pageIndex}  pageMove = { this.props.pageMove } onSize={this.updateSize} isMoved = { this.props.isMoved } title = { this.props.title } />      
            <ConstructPanel index={2}  page = { this.props.page } pageIndex={this.props.pageIndex}  pageMove={this.props.pageMove} />
           
            { this.drawBrandPanels() }                 



            {
                this.state.showFloating && (
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

    // handleSwipe (direction) {
    //     if(direction === "top") {
    //         this.onSwipeDown();
    //     }
    //     else if(direction ==="bottom") {
    //         this.onSwipeUp();
    //     }
    // }
    
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

        if(this.props.theme === '' || this.props.theme === undefined  ) {
            return (<div></div>);
        }

        const swipe = defineSwipe({swipeDistance: 50});

        return (
            <div id="page-container" onWheel = {(e) => this.wheel(e)}>
                
                <DesktopBreakpoint>  
                    {/* <Swipe
                        onSwipeStart={this.onSwipeStart}
                        onSwipeMove={this.onSwipeMove}
                        onSwipeEnd={this.onSwipeEnd}>
                        { this.drawContents() } 
                    </Swipe> */}

                    <Swipeable config={swipe} onSwipeUp={this.onSwipeDown} onSwipeDown={this.onSwipeUp}>
                        { this.drawContents() } 
                    </Swipeable>
                    {/* <ReactTouchEvents                         
                        onSwipe={ this.handleSwipe }
                    >
                    { this.drawContents() }                    
                    </ReactTouchEvents>  */}
                    {/* <ReactTouchEvents1 /> */}
                </DesktopBreakpoint>
                
                <TabletBreakpoint>
                    {/* <Swipe
                        onSwipeStart={this.onSwipeStart}
                        onSwipeMove={this.onSwipeMove}
                        onSwipeEnd={this.onSwipeEnd}>
                        { this.drawContents() } 
                    </Swipe> */}
                    <Swipeable config={swipe} onSwipeUp={this.onSwipeDown} onSwipeDown={this.onSwipeUp}>
                        { this.drawContents() } 
                    </Swipeable>
                    {/* <ReactTouchEvents                         
                        onSwipe={ this.handleSwipe }
                    >
                    { this.drawContents() }                    
                    </ReactTouchEvents>  */}
                    {/* <ReactTouchEvents1 /> */}
                </TabletBreakpoint>

                <PhoneBreakpoint>                
                   { this.drawContents() }                   
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
  )(PageContainer);

