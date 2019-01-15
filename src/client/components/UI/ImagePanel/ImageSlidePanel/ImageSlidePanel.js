import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './ImageSlidePanel.scss';

const cx = classNames.bind(styles);

import anime from 'animejs';
import Swipe from 'react-easy-swipe';

import ReactPagination from '@components/common/PageScrollerIndigator';
import { traffic } from '@lib/admin';


class ImageSlidePanel extends React.Component {

    canvas = React.createRef();

    state = {
        current: 0, // 현재 위치(x좌표)
        index: 0, // 현재 인덱스
        eventLength: 0, // 이벤트 갯수
        offsetWidth:0,
        animate: false,
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions() {

        if(this.canvas === undefined || this.canvas === null  )
            return;

        if(this.canvas.current === undefined || this.canvas.current === null)
            return;

        console.log(this.props.pageData.content.length);
        //console.log(this.canvas.current.scrollWidth);
        console.log(this.canvas.current.offsetWidth);

        this.setState({
            eventLength: this.props.pageData.content.length,
            //scrollWidth: this.canvas.current.scrollWidth,
            offsetWidth: this.canvas.current.offsetWidth,
        });
    }

    onSwipeLeft = () =>  {
        console.log('ImageSlidePanel onSwipeLeft');
        if(this.state.index + 1 >= this.state.eventLength)
            return;

        this.handleRight(this.canvas.current.offsetWidth);
    }

    onSwipeRight = () => {
        console.log('ImageSlidePanel onSwipeRight');
        if(this.state.index === 0)
            return;

        this.handleLeft(this.canvas.current.offsetWidth);
    }

    handleLeft = (n) => {
        const { current, animate } = this.state;
        if(animate) return;

        this.setState({
            animate: true,
        });
        
        let bust = {value: current}

        anime({
            targets: bust,
            value: current-n,
            easing: 'easeInSine', //'easeInCirc',
            duration: 500,
            update: anim => {
                this.canvas.current.scrollLeft = bust.value;
                this.setState({
                    current: bust.value,
                });
            },
            complete: () => {
                // this.updateArrow();
                this.setState({
                    animate: false,
                    index: this.state.index-1,
                    // barPosPercent: bust.value / (this.canvas.current.scrollWidth-this.canvas.current.offsetWidth),
                });
            }
        });
    }

    handleRight = (n) => {
        const { current, animate } = this.state;
        if(animate) return;

        this.setState({
            animate: true,
        });
        
        let bust = {value: current}

        anime({
            targets: bust,
            value: current+n,
            easing: 'easeInSine', //'easeInCirc',
            duration: 500,
            update: anim => {
                this.canvas.current.scrollLeft = bust.value;
                this.setState({
                    current: bust.value,
                });
            },
            complete: () => {
                // this.updateArrow();
                this.setState({
                    animate: false,
                    index: this.state.index+1,
                    // barPosPercent: bust.value / (this.canvas.current.scrollWidth-this.canvas.current.offsetWidth),
                });
            }
        });
    }

    goLink = async( contentsData ) => {
        const { theme , pageData  } = this.props;
        const recv = await traffic(theme.id , pageData.id , contentsData.id);            
    }

      
    render() {
        const {pageData} = this.props;
        return (
            <div className = { cx('ImageSlidePanel')}>
                <div style={{position: 'relative', overflow: 'hidden', width: '100%', height: '100%'}}>
                    <Swipe
                        onSwipeLeft={this.onSwipeLeft}
                        onSwipeRight={this.onSwipeRight}
                    >
                        <div className="homepage__scrollable" style={{position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px', overflow: 'hidden'/*, marginRight: '-17px', marginBottom: '-17px'*/}}
                            ref={this.canvas}
                        >
                            <div className={cx('homepage__row-events')}>
                                {
                                    this.props.pageData.content.map( (pp, i) => (
                                        <div key={i} className='eventbox-container' ref={i===0 && 'event'}>                                                                                          
                                            <a href={ pp.link } className = { cx('ImageSlidePanelWrp')} onClick={ e => this.goLink( pp ) } target="_blank"> 
                                                <img src= { pp.imgMobile } className = { cx('')} />      
                                            </a>   
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Swipe>
                </div>

                <ReactPagination 
                    pageCount = {this.state.eventLength} 
                    pageIndex = { this.state.index + 1 } 
                    // pageMove = {this.goToPage} 
                    direction="row"
                    justify="space-evenly"
                    row={true} 
                 />      
            </div>
        );
    }
}

export default ImageSlidePanel;