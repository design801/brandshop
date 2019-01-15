import React, { Component, Fragment } from 'react';

import BottomNav from '@components/common/BottomNav';

import { Link } from '@common/routes';

class TabletWrp extends React.Component {

    canvas = React.createRef();

    componentDidMount() {
        this.props.onSize(this.canvas.current.offsetHeight);        
        window.addEventListener("resize", this.updateSize);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }

    updateSize = () => {
        if(this.canvas.current !== null) {
            this.props.onSize(this.canvas.current.offsetHeight);
        }
    }

    render() {
        console.log( "TabletWrp" );
        return (
            <Fragment>
                <div className = 'logoStyle'>
                    <Link route='shop' passHref>
                    <img src='static/images/icon/logo.png' />
                    </Link>
                </div>
     
                <BottomNav pageIndex={2}  pageMove={this.props.pageMove}/>

                <div className='AboutIndexPanelWrp' style= {{ backgroundImage:  "url(" + this.props.bgImg +  ")" }} ref={this.canvas}>
                </div>
            </Fragment>
        );
    }
}

export default TabletWrp;