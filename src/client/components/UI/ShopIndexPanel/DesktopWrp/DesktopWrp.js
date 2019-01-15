import React, { Component, Fragment } from 'react';

import BottomNav from '@components/common/BottomNav';

import { Link } from '@common/routes';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ReactHtmlParser from 'react-html-parser';


class DesktopWrp extends React.Component {

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

    draw_logo_img = () => {
        return (
            <div className = 'logoStyle'>
                <Link route='shop' passHref>
                   <img src='static/images/icon/logo.png' />
                </Link>
        </div>
        );
    }

    draw_archive_img = () => {
        let str = "< Back to Archive";        
        return (
            <div className = 'logoStyle'>                
            <Typography className = 'archiveTextTitle' variant="h6"> [ARCHIVE] </Typography>
            <Typography className = 'archiveText' variant="h6"> { ReactHtmlParser(this.props.title.replace( /'/g ,'')) } </Typography>

            <Link route='archive' passHref>
                <Button  style={{            
                    backgroundColor: 'white',            
                    color:'black',
                    textTransform:'none',                    
                }} 
                size="small"                 
                variant="contained" color="primary" className="button"> { str } </Button>
            </Link>
            </div>
        );

    }


    render() {
        return (
            <Fragment>

                { this.props.isMoved === true 
                  ?
                  (  this.draw_archive_img() )                  
                  :
                  (  this.draw_logo_img() )
                }

                <BottomNav pageIndex={1}  pageMove={this.props.pageMove} isMoved = { this.props.isMoved }/>

                <div className='ShopIndexPanelWrp' style= {{ backgroundImage:  "url(" + this.props.bgImg +  ")" }} ref={this.canvas}>
                </div>
            </Fragment>
        );
    }
}

export default DesktopWrp;