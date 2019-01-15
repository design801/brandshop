import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPageContainer.scss';

const cx = classNames.bind(styles);

import anime from 'animejs';


import { connect } from 'react-redux';



import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';


import Delete from '@components/admin/delete';
import Update from '@components/admin/update';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

class AdminPageContainer extends Component {

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

        value: 0,
        id:'',  // menu id
    }

    componentDidMount() {
        // 스크롤링 이벤트 추가
        window.addEventListener("scroll", this.handleScroll);
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
        //this.props.pageOnChange(this.state.pageIndex);
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


    handleMove = (page , time ) => {
        const { animate, offset } = this.state;
        if(animate) return;

        if(page >= this.props.page) return;

        console.log('handleMove');

        // IE, Chrome 동시 사용을 위한 처리
        const scrollY =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        console.log(scrollY);

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
            showFloating : scrollTop >  100
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
        console.log("onSwipeUp");
        console.log(this.onSwipeDown) ;
        //this.handleDown(this.state.offset , 500);
        this.handleMove( this.state.pageIndex - 1 , 500);
    }

    onSwipeDown = (position) => {        
        console.log("onSwipeDown" + this);
        //this.handleUp(this.state.offset , 500);
        this.handleMove( this.state.pageIndex + 1 , 500);
    }

    wheel = e => {        
        console.log("wheel");

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
        console.log('handlePage : ' + page);
        this.handleMove(page , 500);
    }

    updateSize = (height) => {
        console.log('updateSize : ' + height);    
        this.setState({
            offset: height
        })
        console.log('__________________________________________________________this.state.pageIndex : ' + this.state.pageIndex);
        //this.handlePage( this.state.pageIndex );

    }

    onSwipeStart(event) {
        
    }

    onSwipeMove(position, event ) {    
        const { current, animate, down, pageIndex , offset  } = this.state;    
        console.log(current-position.y);          
        console.log( "client height=" + document.documentElement.scrollHeight );          
        console.log(`Moved ${position.y} pixels vertically`, event);  
        
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
        
         const { current, animate, down, pageIndex , offset , move   } = this.state;    

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

      constructor (props){
        super(props);
      
        
        this.onSwipeMove = this.onSwipeMove.bind(this);
        this.onSwipeEnd = this.onSwipeEnd.bind(this);        
        this.onSwipeStart = this.onSwipeStart.bind(this);        
      }

      handleChange = (event, value) => {
        console.log("handleChangeIndex" + value); 
        this.setState({ value:value });
        if(value === 2) {
            this.setState({ id:'' });
        }
    };

    handleChangeIndex = index => {
        console.log("handleChangeIndex" + index); 
        this.setState({ value: index });
    };

    handleId = str => {
        this.setState({ id: str });
    }



    render() {
        const { value } = this.state;

        return (
            <div id="page-container" onWheel = {(e) => this.wheel(e)}>
               
               <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        scrollable
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        
                        <Tab label="Theme 생성" icon={<PhoneIcon />} />                        
                        <Tab label="Theme 수정" icon={<PersonPinIcon />} />
                        
                    </Tabs>
                </AppBar>                
                {value === 0 && <Update id = { this.state.id}  />}                
                {value === 1 && <Delete menuChange = { this.handleChangeIndex } idChange = { this.handleId } /> }                
                   
               
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
  )(AdminPageContainer);

