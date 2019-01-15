import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './Update.scss';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ComputerIcon from '@material-ui/icons/Computer';
import SecurityIcon from '@material-ui/icons/Security';
import GamePadIcon from '@material-ui/icons/Gamepad';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent  from '@material-ui/core/DialogContent';

import { findID, about, aboutMobile, findTheme, updateTheme , brand , archive } from '@lib/admin';

import UISnackbars from '@components/common/UISnackbars';

import axios , { post } from 'axios';

import Grid from '@material-ui/core/Grid';

import Checkbox from '@material-ui/core/Checkbox';

const cx = classNames.bind(styles);

const company_desc_sample = "ex ) 오 흐부아흐는 <span>친자연적 소재</span>를 바탕으로 <span>자연스러운 일상의 모습</span>을 디자인합니다.";
const company_desc_mobile_sample = "ex ) 오 흐부아흐는 친자연적 소재를 바탕으로<br/>자연스러운 일상의 모습을 디자인합니다.";
const company_link_sample = 'ex) 더 많은 Au Revoir의 제품 보러가기';
const company_link_mobile_sample = 'ex) 더 많은 Au Revoir의 제품 보러가기';

import UploadImage from 'react-upload-images';

const container_spacing = 8;

//config.json 에 있는 값 읽기ㅐ
import config from '@common/config.json';
const postURL = config[process.env.NODE_ENV].uploadURL;

class Update extends React.Component {

    canvas = React.createRef();

    state = {
        
        //메인 
        Main_Image_Data: [],
        Main_Mobile_Image_Data: [],
        //인트로
        Intro_Image:[],
        Intro_Mobile_Image:[],
        //상품 소개
        About_Image:[],
        About_Mobile_Image:[],

        //brandBG
        Brand_Image_Data: [],
        Brand_Mobile_Image_Data: [],


        //archieve
        Archive_Image:[],
        Archive_caption:'',
        Archive_caption_title:'',
        Archive_link:'',

        //send
        SendIndex:0,    //이미지 보낼 파일이 여러개일 경우  SendIndex++ 하며 보낸다.
        //////////////////////////////////////////////////////////
        More_Link:'',
        Company_Name:'',
        Company_KoreanName:'',
        Company_Desc:'',
        Company_Desc_Mobile:'',    
        Company_Link:'',
        Company_Link_Mobile:'',    
        Image_category: 1,              
        Image_folder:'',  
        Image_Data_Id:['','','','','','','',''],
        Image_Data: [null,null,null,null,null,null,null,null],
        Image_Mobile_Data: [null,null,null,null,null,null,null,null],
        Image_Data_Link:['','','','','','','',''],
        open: false,
        Temp_Data:null,
        Image_BG:'',
        Image_BG_Mobile:'',

        // 데이터 관리
        themeTitle: '',
        themeDesc: '',
        themeID: '',
        themeSort:0,

        // 메뉴 관리
        menuIndex:0,
        sendPostDialog:false,

        brandIndex:0,

        brandDatas:[],

        useArchiveLink : true,
    }

    componentDidMount = async() => {
        this.initData();
    }

    initData = async() => {

        const { id } = this.props;
        if(id === "")
            return;
        
        const recv = await findID(id);
        
        console.log(recv);

        this.setState({ 
            themeTitle: recv.theme.title,
            themeDesc: recv.theme.desc,
            themeID: recv.theme.id,
            themeSort: recv.theme.sort,

            About_Image:[],
            About_Mobile_Image:[],      
            Archive_Image:[],      
            brandDatas:recv.theme.brand,
            useArchiveLink : recv.theme.archive.isLink,
        });

        //about 이미지 정리
        let about = this.state.About_Image.slice(); //creates the clone of the state

        for(let i = 0 ; i < recv.theme.about.length ; i++)
        {
            about[i] = this.makeImageData(i,null , recv.theme.about[i].img);            
        }        
        about[recv.theme.about.length] = this.makeImageData( recv.theme.about.length  ,null , '' , false);  
        this.setState({ About_Image : about});

        //about 모바일 이미지 정리
        let aboutMobile = this.state.About_Mobile_Image.slice(); //creates the clone of the state
        for(let i = 0 ; i < recv.theme.aboutMobile.length ; i++)
        {
            aboutMobile[i] = this.makeImageData(i,null , recv.theme.aboutMobile[i].img);            
        }        
        aboutMobile[recv.theme.aboutMobile.length] = this.makeImageData( recv.theme.aboutMobile.length  ,null , '' , false);  
        this.setState({ About_Mobile_Image : aboutMobile});
     
        //main
        let main = this.state.Main_Image_Data.slice();
        main[0] = this.makeImageData( 0,null , recv.theme.main.img);                           
        this.setState({ Main_Image_Data : main});

        //mainmobile
        let mainMobile = this.state.Main_Mobile_Image_Data.slice();
        mainMobile[0] = this.makeImageData( 0,null , recv.theme.main.imgMobile);                           
        this.setState({ Main_Mobile_Image_Data : mainMobile});

        //intro
        let intro = this.state.Intro_Image.slice();
        intro[0] = this.makeImageData( 0,null , recv.theme.intro.img);                           
        this.setState({ Intro_Image : intro});
        
        //intro mobile
        let introMobile = this.state.Intro_Mobile_Image.slice();
        introMobile[0] = this.makeImageData( 0,null , recv.theme.intro.imgMobile);                           
        this.setState({ Intro_Mobile_Image : introMobile});

         //achieve 이미지 정리
         
        //main
        let archive = this.state.Archive_Image.slice();
        archive[0] = this.makeImageData( 0,null , recv.theme.archive.img);                           
        this.setState({ Archive_Image : archive});     

        this.setState({ Archive_caption : recv.theme.archive.caption});     
        this.setState({ Archive_caption_title : recv.theme.archive.title});     
        this.setState({ Archive_link : recv.theme.archive.link});     
    }

    //데이터 만들기
    makeImageData = ( index , fileData , url , use = true ) => {
        return (
            { index: index , fileData : fileData , url: url , use: use}
        );
    }


    handleChange = name => event => {
        
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeMenu = (event, value) => {
        this.setState({ menuIndex: value });
        if(value === 3) {            
            this.handleBrand(0);
        }        
    };

    //상단 메뉴
    handleId = event => {
        this.setState({ id: event.target.value });
    }


    onFileMainImage  = index => event => {        
        
        let a = this.state.Main_Image_Data.slice(); //creates the clone of the state
        a[index] =  this.makeImageData(index , event.file , "");
        this.setState({ Main_Image_Data : a});
    }

    
    //ABOUT 관련 함수
    // 화면에 뿌려주는 부분
    setAbout = () => {
        return (
            <div className = { this.state.menuIndex === 0 ? 'show' : 'notShow' }>                
                <Grid container spacing={24}>                                
                    <Grid item xs={6}>        
                        <Paper className="paper">
                                <Typography className="title" variant="h6"> About 데스크탑 이미지(1920X1080 jpg) </Typography> 
                                <Button onClick={ e=> this.handleAbout()} variant="contained" color="primary" className="buttomMargin">저장</Button>          
                                { 
                                    this.state.About_Image.map (( image , i) => {
                                        return (
                                        this.drawAboutImage( i )
                                        );
                                    })                        
                                }
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>        
                        <Paper className="paper">
                            <Typography className="title" variant="h6"> About 모바일 이미지(640X1160 jpg) </Typography>     
                            <Button onClick={ e=> this.handleAboutMobile()} variant="contained" color="primary" className="buttomMargin">저장</Button>    

                            { 
                                this.state.About_Mobile_Image.map (( image , i) => {
                                    return (
                                    this.drawAboutMobileImage( i )
                                    );
                                })                        
                            }
                    </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

    drawAboutImage = index => {
        const { About_Image } = this.state;        
        return (
               <div key={ index } className = 'imageSetting' >
                   <Typography className={ 'inline'} variant="h6"> { index }  번 </Typography>                    
        
                           <Checkbox
                            checked={About_Image[index].use}
                            onChange={this.handleCheckBoxChange( About_Image , index)}                            
                            color="primary"
                            />

                            <img src={  About_Image[index].url } className="imageStyle"  /> 
                            
                            <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileAboutChange(index) }  />    
                    


               
               </div>

        );
    }

    drawAboutMobileImage = index => {
        const { About_Mobile_Image } = this.state;                
        return (
               <div key={ index } className = 'imageSetting' >
                   <Typography className={ 'inline'} variant="h6"> { index }  번 </Typography>          
                   <Checkbox
                            checked={About_Mobile_Image[index].use}
                            onChange={this.handleCheckBoxChange( About_Mobile_Image , index)}                            
                            color="primary"
                            />
                   <img src={  About_Mobile_Image[index].url } className="imageStyle"  /> 
                   <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileAboutMobileChange(index) }  />
               </div>

        );
    }


    //이미지를 업로드 했을때 파일 데이터를 STATE 에 저장
    onFileAboutChange  = index => event => {        
        
       let a = this.state.About_Image.slice(); //creates the clone of the state       
       a[index]= this.makeImageData(index , event.file , "");
       if(this.state.About_Image.length === index + 1)
        a[index + 1] = this.makeImageData(index + 1 , "" , "" , false);
       this.setState({ About_Image : a});
    }

        //이미지를 업로드 했을때 파일 데이터를 STATE 에 저장
    onFileAboutMobileChange  = index => event => {                
       let a = this.state.About_Mobile_Image.slice(); //creates the clone of the state
       a[index]= this.makeImageData(index , event.file , "");
       if(this.state.About_Mobile_Image.length === index + 1)
        a[index + 1] = this.makeImageData(index + 1 , "" , "" , false);
       this.setState({ About_Mobile_Image : a});
    }


    //데이터를 서버에 보낸다.
    handleAbout = async() => {              
        this.setState({ sendPostDialog: true });
        let imgArray=[];
        
        for( var i = 0; i < this.state.About_Image.length - 1; ++i) {
            
            if(this.state.About_Image[i].use === true) {
                if(this.state.About_Image[i].fileData === null)
                    imgArray.push({img: this.state.About_Image[i].url });
                else
                    imgArray.push({img: ''});
            }

        }

        const recv = await about(this.props.id , imgArray );        
        let sendId = 0;
        if(recv.result === 'ok') {
            //이미지 날린다.
            this.setState({ SendIndex: 0 });
            let themeStr = "?theme=" + this.props.id + "";
            let idStr = "&id=" + "about.desktop.brand";
            let PostStr = postURL + themeStr + idStr;           
            this.sendPost(PostStr , this.state.About_Image );           
        }      
        else {
            this.setState({ sendPostDialog: false });
        } 
    }
    
    handleAboutMobile = async() => {
        this.setState({ sendPostDialog: true });
        let imgArray=[];
        
        for( var i = 0; i < this.state.About_Mobile_Image.length - 1; ++i) {
            if(this.state.About_Mobile_Image[i].use === true) {
                if(this.state.About_Mobile_Image[i].fileData === null)
                    imgArray.push({img: this.state.About_Mobile_Image[i].url });
                else
                    imgArray.push({img: ''});
            }

        }


        const recv = await aboutMobile(this.props.id , imgArray );        
        let sendId = 0;
        if(recv.result === 'ok') {
            //이미지 날린다.
            this.setState({ SendIndex: 0 });

          
            let themeStr = "?theme=" + this.props.id + "";
            let idStr = "&id=" + "about.mobile.brand";
            let PostStr = postURL + themeStr + idStr;           
            this.sendPost(PostStr , this.state.About_Mobile_Image );           
        }      
        else {
            this.setState({ sendPostDialog: false });
        }  
    }


    //MAIN 관련 함수

    setMain = () => {
        const { Main_Image_Data , Main_Mobile_Image_Data } = this.state;    

        return (
        <div className = { this.state.menuIndex === 1 ? 'show' : 'notShow' }>        
              <Grid container spacing={24}>
                  <Grid item xs={6}>                  
                      <Paper className="paper">                        
                            <Typography className="title" variant="h6">Main 데스크탑 이미지(1920X1080 jpg)</Typography> 
                            <Button onClick={ e=> this.handleMain()} variant="contained" color="primary" className="buttomMargin">저장</Button>          
                            <div className = 'imageSetting' >
                            { 
                                Main_Image_Data.length > 0 && 
                                <img src={  Main_Image_Data[0].url } className="imageStyle"  /> 
                            }
                            
                            <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileMainImage(0) } />
                            </div>
                      </Paper>
                </Grid>      
                <Grid item xs={6}>     
                      <Paper className="paper">                        
                            <Typography className="title" variant="h6">Main 모바일 이미지(640X1160 jpg)</Typography> 
                            <Button onClick={ e=> this.handleMain_Mobile()} variant="contained" color="primary" className="buttomMargin">저장</Button>          
                            <div className = 'imageSetting' >
                            {   
                                Main_Mobile_Image_Data.length > 0 && 
                                <img src={  Main_Mobile_Image_Data[0].url } className="imageStyle"  /> 
                            }
                            
                            <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileMain_Mobile_Image(0) } />
                            </div>
                      </Paper>

                </Grid>                    
            </Grid>
        
      </div>
        );
    }

    onFileMainImage  = index => event => {        
        
        let a = this.state.Main_Image_Data.slice(); //creates the clone of the state
        a[index] =  this.makeImageData(index , event.file , "");
        this.setState({ Main_Image_Data : a});
    }

    onFileMain_Mobile_Image  = index => event => {        
        
        let a = this.state.Main_Mobile_Image_Data.slice(); //creates the clone of the state
        a[index] = this.makeImageData(index , event.file , "");
        this.setState({ Main_Mobile_Image_Data : a});
     }

      //데이터를 서버에 보낸다.
      handleMain = async() => {      

        this.setState({ sendPostDialog: true });
        //이미지 날린다.
        this.setState({ SendIndex: 0 });
        let themeStr = "?theme=" + this.props.id + "";
        let idStr = "&id=" + "main.desktop.";
        let PostStr = postURL + themeStr + idStr;           
        this.sendPost(PostStr , this.state.Main_Image_Data );                          
    }

    
    handleMain_Mobile = async() => {
      
            //이미지 날린다.
            this.setState({ sendPostDialog: true });
            this.setState({ SendIndex: 0 });

            let themeStr = "?theme=" + this.props.id + "";
            let idStr = "&id=" + "main.mobile.";
            let PostStr = postURL + themeStr + idStr;           
            this.sendPost(PostStr , this.state.Main_Mobile_Image_Data );           
    }


    //INTRO 관련 함수
    setIntro = () => {

        const { Intro_Image , Intro_Mobile_Image } = this.state;    

        return (
             <div className = { this.state.menuIndex === 2 ? 'show' : 'notShow' }>
                        <Grid container spacing={24}>                                
                            <Grid item xs={6}>        
                                <Paper className="paper">             
                                    <Typography className="title" variant="h6">Intro 데스크탑 이미지(1920X1080 jpg)</Typography> 
                                    <Button onClick={ e=> this.handleIntro()} variant="contained" color="primary" className="buttomMargin">저장</Button>          
                                    <div className = 'imageSetting' >
                                    { Intro_Image.length > 0 &&                                 
                                        <img src={  Intro_Image[0].url } className="imageStyle"  /> 
                                    }

                                    
                                    <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileIntroImage(0) } />
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>        
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6">Intro 모바일 이미지(640X1160 jpg)</Typography> 
                                    <Button onClick={ e=> this.handleIntroMobile()} variant="contained" color="primary" className="buttomMargin">저장</Button>          
                                    <div className = 'imageSetting' >
                                    { Intro_Mobile_Image.length > 0 &&                                 
                                        <img src={  Intro_Mobile_Image[0].url } className="imageStyle"  /> 
                                    }                                    
                                    <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileIntro_Mobile_Image(0) } />
                                    </div>
                                </Paper>
                            </Grid>                            
                        </Grid>
                        
                </div>
        );
    }

    onFileIntroImage  = index =>  event => {        
        let a = this.state.Intro_Image.slice(); //creates the clone of the state
        a[index] = this.makeImageData(index , event.file , "");
        this.setState({ Intro_Image : a});
     }

     onFileIntro_Mobile_Image  = index =>  event => {        
        let a = this.state.Intro_Mobile_Image.slice(); //creates the clone of the state
        a[index] = this.makeImageData(index , event.file , "");
        this.setState({ Intro_Mobile_Image : a});
     }

     handleIntro = async() => {      
        this.setState({ sendPostDialog: true });
        //이미지 날린다.
        this.setState({ SendIndex: 0 });
        let themeStr = "?theme=" + this.props.id + "";
        let idStr = "&id=" + "intro.desktop.";
        let PostStr = postURL + themeStr + idStr;           
        this.sendPost(PostStr , this.state.Intro_Image );                   
    }
    
    handleIntroMobile = async() => {      
         //이미지 날린다.
         this.setState({ sendPostDialog: true });
         this.setState({ SendIndex: 0 });

         let themeStr = "?theme=" + this.props.id + "";
         let idStr = "&id=" + "intro.mobile.";
         let PostStr = postURL + themeStr + idStr;           
         this.sendPost(PostStr , this.state.Intro_Mobile_Image );           
    }


    handleCheckBoxChange = ( ArrayData , index) => event => {
        
        let a = ArrayData.slice(); //creates the clone of the state
        a[index].use = event.target.checked;
        this.setState({ [ ArrayData ] : a});

      };


      handleArchiveLinkCheckBoxChange = ( link ) => event => {
        this.setState({ [ link ] : event.target.checked });
      };

        getNextIndex( ArrayData ) {
        
        let index = this.state.SendIndex;
        for(let i = index ; i < ArrayData.length ; i++ )
        {
            if(ArrayData[i] !== null && ArrayData[i].use === true) {
                return i;
            }
        }

        return ArrayData.length;
    }

    //브랜드
    onBrandBg  = index => event => {        
        
        let a = this.state.Brand_Image_Data.slice(); //creates the clone of the state
        a[index] =  this.makeImageData(index , event.file , "");
        this.setState({ Brand_Image_Data : a});
    }

    onBrandMobile  = index => event => {        
        
        let a = this.state.Brand_Mobile_Image_Data.slice(); //creates the clone of the state
        a[index] =  this.makeImageData(index , event.file , "");
        this.setState({ Brand_Mobile_Image_Data : a});
    }

    //네트워크
    sendPost_brand(PostStr , stateArray) {

        let nextIndex = this.getNextIndex(stateArray);

        this.setState({ SendIndex: nextIndex });

        if(stateArray.length === this.state.SendIndex ) {
            this.setState({ sendPostDialog: false });
            
            setTimeout(function() { //Start the timer
                this.initData();
            }.bind(this), 1000)
            return; //끝
        }


        const formData = new FormData();                
        formData.append( "" , stateArray[ this.state.SendIndex ].fileData);              
        let postStr = PostStr + this.state.SendIndex;
        
        post(postStr , formData)           
        .then(res => {
            if(stateArray.length > this.state.SendIndex + 1) {
                this.setState({ SendIndex: this.state.SendIndex + 1 });
                const formData = new FormData();        
                formData.append( "" , stateArray[ this.state.SendIndex ]);    
                this.sendPost_brand(PostStr ,stateArray);
            }
            else {
                this.setState({ sendPostDialog: false });
                setTimeout(function() { //Start the timer
                    this.initData();
                }.bind(this), 1000)
            }

        });
    }
    

    //네트워크
    sendPost(PostStr , stateArray) {

        let nextIndex = this.getNextIndex(stateArray);
        this.setState({ SendIndex: nextIndex });

        if(stateArray.length === this.state.SendIndex ) {
            this.setState({ sendPostDialog: false });
            this.initData();
            return; //끝
        }

        const formData = new FormData();                
        formData.append( "" , stateArray[ this.state.SendIndex ].fileData);              
        let postStr = PostStr + this.state.SendIndex + "." + this.state.SendIndex;
        
        post(postStr , formData)           
        .then(res => {
            if(stateArray.length - 1 > this.state.SendIndex + 1) {
                this.setState({ SendIndex: this.state.SendIndex + 1 });
                const formData = new FormData();        
                formData.append( "" , stateArray[ this.state.SendIndex ]);    
                this.sendPost(PostStr ,stateArray);
            }
            else {
                this.setState({ sendPostDialog: false });
                this.initData();
            }

        });
    }

     //ABOUT 관련 함수
    // 화면에 뿌려주는 부분
    setArchive = () => {
        const { Archive_Image } = this.state;    

        return (
        <div className = { this.state.menuIndex === 4 ? 'show' : 'notShow' }>
        
            
              <Grid container spacing={0}>
              <Button onClick={ e=> this.handleArchive()} variant="contained" color="primary" className="buttomMargin">저장</Button>          
              <Grid item xs={12}>                            
                            <Paper className="paper">
                                <Checkbox
                                checked={  this.state.useArchiveLink }
                                onChange={this.handleArchiveLinkCheckBoxChange('useArchiveLink')}                            
                                color="primary"
                                />
                                <Typography className="brandTitle" variant="h6"> Link 사용  </Typography> 
                            </Paper>                        
                  </Grid>                     


                <Grid item xs={12}>
                            
                            <Paper className="paper">
                                <Typography className="title" variant="h6"> Archive caption  </Typography> 
                                <Input className="input" value = { this.state.Archive_caption } onChange={this.handleChange('Archive_caption')} />
                            </Paper>                        
                  </Grid>                     

                  <Grid item xs={12}>
                            
                            <Paper className="paper">
                                <Typography className="title" variant="h6"> Archive caption Title </Typography> 
                                { console.log(this.state.Archive_caption_title ) }
                                <Input className="input" value = { this.state.Archive_caption_title } onChange={this.handleChange('Archive_caption_title')} />
                            </Paper>                        
                  </Grid>                     

              


                  <Grid item xs={12}>                  
                      <Paper className="paper">                        
                            <Typography className="title" variant="h6"> Archive List 이미지 (440X730 jpg)</Typography>                             
                            { 
                                Archive_Image.length > 0 && 
                                <img src={  Archive_Image[0].url } className="imageStyle"  /> 
                            }                            
                            <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileArchiveChange(0) } />
                      </Paper>
                  </Grid>                    
              </Grid>
        
      </div>
        );
    }

    handleArchive = async() => {                            
        
        this.setState({ sendPostDialog: true });
        const { Archive_Image , Archive_caption , Archive_link , useArchiveLink , Archive_caption_title  } = this.state;    
        
        const recv = await archive(this.props.id , Archive_Image[0].url ,  Archive_link , Archive_caption ,  useArchiveLink , Archive_caption_title  );        
        let sendId = 0;
        if(recv.result === 'ok') {
            //이미지 날린다.
            this.setState({ SendIndex: 0 });
            let themeStr = "?theme=" + this.props.id + "";
            let idStr = "&id=" + "archive.desktop.";
            let PostStr = postURL + themeStr + idStr;           
            this.sendPost(PostStr , this.state.Archive_Image );      
        }      
        else {
            this.setState({ sendPostDialog: false });
        }             
    }


    //이미지를 업로드 했을때 파일 데이터를 STATE 에 저장
    onFileArchiveChange  = index => event => {                
        let a = this.state.Archive_Image.slice(); //creates the clone of the state
        a[index] =  this.makeImageData(index , event.file , "");
        this.setState({ Archive_Image : a});
    }

    //상품 관련 아직 미정리

      handleClose = () => {
        this.setState({ open: false });
      };
    
      handleOpen = () => {
        this.setState({ open: true });
      };

     onChange  = event => {        
        const formData = new FormData();
        formData.append('upload',event.target.files[0] , event.target.files[0].name);        
     }

     onFileTestImage = index => event  => {        
        let fileData = event.file;
        this.setState({ Temp_Data : fileData});         
     }

     
     onImageLink  = index => event => {        
        let a = this.state.Image_Data_Link.slice(); //creates the clone of the state
        a[index] = event.target.value;
        this.setState({ Image_Data_Link : a});
     }

     onImageID  = index => event => {        
        let a = this.state.Image_Data_Id.slice(); //creates the clone of the state
        a[index] = event.target.value;
        this.setState({ Image_Data_Id : a});
     }

     onFileChange  = index => event => {        
        let a = this.state.Image_Data.slice(); //creates the clone of the state
        a[index] = this.makeImageData(index , event.file , "");
        this.setState({ Image_Data : a});
     }

     onFileMobileChange  = index => event => {        
        let a = this.state.Image_Mobile_Data.slice(); //creates the clone of the state
        a[index] = this.makeImageData(index , event.file , "");
        this.setState({ Image_Mobile_Data : a});
     }


     handleBrand = (index) => {

        const { brandDatas }    = this.state;

        if(brandDatas.length === index) {
            this.setState({ 
                brandIndex: index,
                Image_folder : '' ,
                Company_Name : '' ,
                Company_KoreanName : '' ,
                Company_Desc : '' ,
                Image_category : 1,
                Image_BG : '' ,
                Image_BG_Mobile : '' ,
                Company_Desc :'' ,
                Company_Desc_Mobile : '',
                Company_Link: '' ,
                Company_Link_Mobile: '' ,
                More_Link: '',                
                
                Image_Data_Id:['','','','','','','',''],
                Image_Data: [null,null,null,null,null,null,null,null],
                Image_Mobile_Data: [null,null,null,null,null,null,null,null],
                Image_Data_Link:['','','','','','','',''],

         });


        }
        else {

            let Image_Data_Id = ['','','','','','','',''];
            let Image_Data = [null,null,null,null,null,null,null,null];
            let Image_Mobile_Data = [null,null,null,null,null,null,null,null];
            let Image_Data_Link = ['','','','','','','',''];

            for(let i = 0 ; i < brandDatas[index].content.length ; i++ )
            {
                Image_Data_Id[i] = brandDatas[index].content[i].id;
                Image_Data[i] = this.makeImageData(i,null , brandDatas[index].content[i].img , false );     
                Image_Mobile_Data[i] = this.makeImageData(i,null , brandDatas[index].content[i].imgMobile , false );     
                Image_Data_Link[i] = brandDatas[index].content[i].link;
            }

            this.setState({ 
                brandIndex: index,
                Image_folder : brandDatas[index].id  ,
                Company_Name : brandDatas[index].title  ,
                Company_KoreanName : brandDatas[index].subTitle  ,
                Company_Desc : brandDatas[index].title  ,
                Image_category : brandDatas[index].pattern  ,
                Image_BG : brandDatas[index].bg  ,
                Image_BG_Mobile : brandDatas[index].bgMobile  ,
                Company_Desc : brandDatas[index].more.desc ,
                Company_Desc_Mobile : brandDatas[index].more.descMobile ,
                Company_Link: brandDatas[index].more.linkDesc  ,
                Company_Link_Mobile: brandDatas[index].more.linkDescMobile  ,
                More_Link: brandDatas[index].more.link  ,

                Image_Data: Image_Data,
                Image_Mobile_Data: Image_Mobile_Data,
                Image_Data_Id : Image_Data_Id,
                Image_Data_Link:Image_Data_Link,
         });
        }        
     }

    getUrlFromImageData = (data) => {
        if(data === null || data === undefined)
            return "";
        else
            return data.url;
    }


     makeContent_Data = ( index ) => {
        const { Company_Name , Company_KoreanName , Company_Desc ,  Company_Desc_Mobile , Company_Link ,  Company_Link_Mobile , Image_category , Image_folder , More_Link , brandDatas , brandIndex , Image_Data_Id , Image_Data_Link , Image_Data , Image_Mobile_Data } = this.state;                
        return (
            {
                id: Image_Data_Id[index],
                img: this.getUrlFromImageData(Image_Data[index]),
                imgMobile: this.getUrlFromImageData(Image_Mobile_Data[index]),
                link: Image_Data_Link[index],
            }

        );
     }


    handleCreate = async() => {
        this.setState({ sendPostDialog: true });
        const { Company_Name , Company_KoreanName , Company_Desc ,  Company_Desc_Mobile , Company_Link ,  Company_Link_Mobile ,
                Image_category , Image_folder , More_Link , brandDatas , brandIndex , Image_Data_Id  , Brand_Image_Data ,
                Brand_Mobile_Image_Data , Image_BG , Image_BG_Mobile } = this.state;                
        let dataArray = [];       
        let contentArray = [];

        if(Image_category === 1) {
            contentArray.push( this.makeContent_Data(0));            
            contentArray.push( this.makeContent_Data(1));            
            
        }
        else if(Image_category === 2) {
            contentArray.push(this.makeContent_Data(0));            
            contentArray.push(this.makeContent_Data(1));            
            contentArray.push(this.makeContent_Data(2));            
            contentArray.push(this.makeContent_Data(3)); 
            contentArray.push(this.makeContent_Data(4));            
            contentArray.push(this.makeContent_Data(5));            
            contentArray.push(this.makeContent_Data(6));            
            contentArray.push(this.makeContent_Data(7));                       
        }
        else if(Image_category === 3) {
            contentArray.push(this.makeContent_Data(0));            
            contentArray.push(this.makeContent_Data(1));            
            contentArray.push(this.makeContent_Data(2));            
            contentArray.push(this.makeContent_Data(3));            
        }

        for(let i = 0 ; i < brandDatas.length + 1 ; i++)
        {
            if(i === brandIndex ) {
                dataArray.push({
                    id: Image_folder ,          // id
                    title: Company_Name,            //회사 이름
                    subTitle : Company_KoreanName,
                    bg:Image_BG,
                    bgMobile:Image_BG_Mobile,
                    pattern:Image_category,
                    more: {
                                desc:Company_Desc,
                                descMobile:Company_Desc_Mobile,
                                linkDesc:Company_Link,
                                linkDescMobile:Company_Link_Mobile,
                                link:More_Link,
                          },

                    content:  contentArray,                    
                });
            }
            else {
                if(brandDatas.length > i)
                    dataArray.push( brandDatas[i] );                
            }
        }
        const recv = await brand(this.props.id , dataArray );        
        let sendId = 0;
        if(recv.result === 'ok') {
            //올려야 할것..
            let themeStr = "?theme=" + this.props.id + "";
            {
                if(this.state.Brand_Image_Data.length > 0) {
                    let idStr = "&id=" + "shop.desktop." + this.state.brandIndex + ".bg";
                    let PostStr = postURL + themeStr + idStr;           
                    const formData = new FormData();                
                    formData.append( "" , this.state.Brand_Image_Data[0].fileData);                          
                    post(PostStr , formData)           
                    .then(res => {
                        console.log(res);            
                    });
                }
            }

            {
                if(this.state.Brand_Mobile_Image_Data.length > 0) {
                    let idStr = "&id=" + "shop.mobile." + this.state.brandIndex +".bg";
                    let PostStr = postURL + themeStr + idStr;                      
                    const formData = new FormData();                
                    formData.append( "" , this.state.Brand_Mobile_Image_Data[0].fileData);                          
                    post(PostStr , formData)           
                    .then(res => {
                        console.log(res);            
                    });
                }
                
            }

            {
                //brand image 날린다.
                //이미지 날린다.
                this.setState({ SendIndex: 0 });            
                let idStr = "&id=" + "shop.desktop." + this.state.brandIndex +".";
                let PostStr = postURL + themeStr + idStr;           
                this.sendBrandPost(PostStr , this.state.Image_Data);         
            }
            
        }       
        
    }

    sendBrandMobilePost = () => {        
        this.setState({ SendIndex: 0 });
        let themeStr = "?theme=" + this.props.id + "";
        let idStr = "&id=" + "shop.mobile."  + this.state.brandIndex +".";
        let PostStr = postURL + themeStr + idStr;           
        this.sendPost_brand(PostStr , this.state.Image_Mobile_Data );         
    }

     //네트워크
     sendBrandPost(PostStr , stateArray , callback) {

        let nextIndex = this.getNextIndex(stateArray);
        this.setState({ SendIndex: nextIndex });
        
        if(stateArray.length === this.state.SendIndex ) {
            this.sendBrandMobilePost();
            return; //끝
        }

        const formData = new FormData();                
        formData.append( "" , stateArray[ this.state.SendIndex ].fileData);              
        let postStr = PostStr + this.state.SendIndex;
        
        post(postStr , formData)           
        .then(res => {
        
            if(stateArray.length > this.state.SendIndex + 1) {
                this.setState({ SendIndex: this.state.SendIndex + 1 });
                const formData = new FormData();        
                formData.append( "" , stateArray[ this.state.SendIndex ]);    
                this.sendBrandPost(PostStr ,stateArray , callback);
            }
            else {
                this.sendBrandMobilePost();
            }

        });
    }


    handleDelete = async() => {
        this.setState({ sendPostDialog: true});
        const { Company_Name , Company_KoreanName , Company_Desc ,  Company_Desc_Mobile , Company_Link ,  Company_Link_Mobile , Image_category , Image_folder , More_Link , brandDatas , brandIndex} = this.state;        
        let dataArray = [];       
        for(let i = 0 ; i < brandDatas.length ; i++)        {
            if(i === brandIndex ) {
                
            }
            else {
                if(brandDatas.length > i)
                    dataArray.push( brandDatas[i] );                
            }
        }
        const recv = await brand(this.props.id , dataArray );        
        this.setState({ 
            sendPostDialog: false,
            brandDatas: dataArray,
        });
        this.handleBrand(this.state.brandDatas.length);
    }

    drawImageLink = (index, desktop, mobile) => {
        return (
            <div>
              <Paper className="brand_paper">     
      
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography align="center" variant="h6"> 브랜드 상품 { index + 1} </Typography> 
                        </Toolbar>
                    </AppBar>
                    <div className="imageCategorySelect" >
                    <br></br>
                    <Typography className="brandTitle"  variant="h6"> ID </Typography> <Input className="id_input" value = { this.state.Image_Data_Id[index] } onChange={this.onImageID( index)} />
                    <br></br>
                    <Typography className="brandTitle"  variant="h6"> 링크 URL </Typography>  <Input className="id_input" value = { this.state.Image_Data_Link[index] }  onChange={this.onImageLink( index)} />
                    <br></br>
                    <Grid container spacing={ container_spacing }>
                        <Grid item xs={6}>
                        <Typography className="title" variant="h6">데스크탑 이미지{desktop}</Typography>                         
                        {                        
                            this.state.Image_Data[index] != null &&  <img src={  this.state.Image_Data[index].url } className="imageStyle"  />          
                        }
                        <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileChange( index ) } />
                        </Grid>
                        <Grid item xs={6}>
                        <Typography className="title" variant="h6">모바일 이미지{mobile}</Typography>      
                        {
                            this.state.Image_Mobile_Data[index] !== null &&  <img src={  this.state.Image_Mobile_Data[index].url } className="imageStyle"  />          
                        }                        
                        <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileMobileChange( index ) } />
                        </Grid>
                    </Grid>
                    </div>
            </Paper>
            </div>
        );
    }


    drawLink = () => {

        if(this.state.Image_category == 1) {
            return (
                <div>
                    
                      <Grid container spacing={ container_spacing }>
                        <Grid>
                           { this.drawImageLink(0, '(1661X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(1, '(1661X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                     </Grid>
                   
                </div>
            );

        }
        else if(this.state.Image_category == 2) {
            return (
                <div>
               
                      <Grid container spacing={ container_spacing }>
                      <Grid>
                            { this.drawImageLink(0, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(1, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(2, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(3, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(4, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(5, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(6, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(7, '(416X397 jpg)', '(560X1160 jpg)') }
                        </Grid>
                     </Grid>                   
                </div>
            );

        }
        else if(this.state.Image_category == 3) {
            return (
                <div>
                      <Grid container spacing={ container_spacing }>
                      <Grid>
                            { this.drawImageLink(0, '(416X795 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(1, '(416X795 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(2, '(416X795 jpg)', '(560X1160 jpg)') }
                        </Grid>
                        <Grid>
                            { this.drawImageLink(3, '(416X795 jpg)', '(560X1160 jpg)') }
                        </Grid>
                     </Grid>                   
                </div>
            );
            
        }
        
    }


    drawInput = () => {

        if(this.state.Image_category == 1) {
            return (
                <div>
                    <Paper className="paper">
                        <Typography className="title" variant="h6"> 데스크탑 이미지 </Typography> 
                      <Grid container spacing={ container_spacing }>
                        <Grid item xs={6}>
                        <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography> 
                                    <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileChange(0) } />
                        </Paper>
                        </Grid>
                        <Grid item xs={6}>
                        <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 2 </Typography> 
                                    <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileChange(1) } />
                        </Paper>
                        </Grid>
                     </Grid>
                   </Paper>
                </div>
            );

        }
        else if(this.state.Image_category == 2) {
            return (
                <div>
                  <Paper className="paper">
                        <Typography className="title" variant="h6"> 데스크탑 이미지 </Typography> 
                      <Grid container spacing={ container_spacing }>
                        <Grid>                  
                              <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography> 
                                    <UploadImage type="file"  name="file"  className="image_input" onChange = {  this.onFileChange(0) } />
                                </Paper>
                        </Grid>
                        <Grid>                  
                            <Paper className="paper">       
                                    <Typography className="title" variant="h6"> 이미지 2 </Typography> 
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(1) } />
                            </Paper>
                        </Grid>
                        <Grid>                  
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 3 </Typography> 
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(2) } />
                                </Paper>
                        </Grid>
                        <Grid>       
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 4 </Typography>            
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(3) } />
                                </Paper>
                        </Grid>
                        <Grid>     
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 5 </Typography>              
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(4) } />
                            </Paper>
                        </Grid>
                        <Grid>     
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 6 </Typography>              
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(5) } />
                            </Paper>
                        </Grid>
                        <Grid>         
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 7 </Typography>          
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(6) } />
                            </Paper>
                        </Grid>
                        <Grid>     
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 8 </Typography>              
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileChange(7) } />
                            </Paper>
                        </Grid>
                     </Grid>
                   </Paper>
                </div>
            );

        }
        else if(this.state.Image_category == 3) {
            return (
                <div>
                <Paper className="paper">
                        <Typography className="title" variant="h6"> 데스크탑 이미지 </Typography> 
                      <Grid container spacing={ container_spacing }>
                        <Grid item xs={3}>      
                              <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography>                    
                                      <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileChange(0) } />                            
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>                  
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 2 </Typography>        
                                    <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileChange(1) } />
                                </Paper>
                        </Grid>
                        <Grid item xs={3}>                  
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 3 </Typography>        
                                    <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileChange(2) } />
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>                  
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 4 </Typography>        
                                    <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileChange(3) } />
                                </Paper>
                        </Grid>
                     </Grid>
                   </Paper>
                </div>
            );
            
        }
        
    }

    drawMobileInput = () => {

        if(this.state.Image_category == 1) {
            return (
                <div>
                <Paper className="paper">
                  <Typography className="title" variant="h6"> 모바일 이미지 </Typography> 
                  <Grid container spacing={ container_spacing }>
                        <Grid item xs={6}>
                        <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography>      
                        <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileMobileChange(0) } />
                        </Paper>
                        </Grid>
                        <Grid item xs={6}>
                        <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 2 </Typography>      
                        <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onFileMobileChange(1) } />
                        </Paper>
                        </Grid>
                </Grid>
                </Paper>
                </div>
            );

        }
        else if(this.state.Image_category == 2) {
            return (
                <div>
                    <Paper className="paper">
                        <Typography className="title" variant="h6"> 모바일 이미지 </Typography> 
                            <Grid container spacing={ container_spacing }>
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(0) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 2 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input"  onChange = {  this.onFileMobileChange(1) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 3 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(2) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 4 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(3) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 5 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(4) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 6 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(5) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 7 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(6) } />
                                    </Paper>
                                </Grid>   
                                <Grid>   
                                <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 8 </Typography>      
                                    <UploadImage type="file"  name="file" className="image_input" onChange = {  this.onFileMobileChange(7) } />
                                    </Paper>
                                </Grid>   
                            </Grid>   
                        </Paper>
                </div>
            );

        }
        else if(this.state.Image_category == 3) {
            return (
                <div>
                  <Paper className="paper">
                        <Typography className="title" variant="h6"> 모바일 이미지 </Typography> 
                        <Grid container spacing={ container_spacing }>
                            <Grid item xs={3}>      
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography>                  
                                <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileMobileChange(0) } />
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>                
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 1 </Typography>      
                                <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileMobileChange(1) } />
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>                
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 2 </Typography>      
                                <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileMobileChange(2) } />
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>                
                            <Paper className="paper">     
                                    <Typography className="title" variant="h6"> 이미지 3 </Typography>      
                                <UploadImage type="file"  name="file" className="image_input" onChange = { this.onFileMobileChange(3) } />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                        
                </div>
            );
            
        }
        
    }

    handleSetMenu = index => {
        this.setState({
            menuIndex: index,
        });
    }

    handleCreateProduct = () => {

    }

    //상단 메뉴
    drawTopMenu = () => {
        return (
        //메인 메뉴 
        <div>
            <Grid 
            container spacing={0}
            direction='column' 
            justify= "center"            
            >
                <Grid>     
                    <div className='titleDiv'>
                        <div><span>Theme ID : </span><Input disabled={true} value={this.state.themeID} onChange={this.handleChange('themeID')} /></div>
                        <div><span>Theme Title : </span><Input value={this.state.themeTitle} onChange={this.handleChange('themeTitle')} /></div>
                        <div><span>Theme Desc : </span><Input value={this.state.themeDesc} onChange={this.handleChange('themeDesc')} /></div>                        
                        <div><span>Theme Sort : </span><Input value={this.state.themeSort}  type="number" onChange={this.handleChange('themeSort')} /></div>
                    </div>               
                </Grid>               
            </Grid>
        </div>
        );
    }

    getBrandImgUrl = () => {        
        if(this.state.brandIndex === this.state.brandDatas.length)
            return ("");
        else {
            return (this.state.brandDatas[this.state.brandIndex].bg);
        }
    }

    get_Mobile_BrandImgUrl = () => {
        if(this.state.brandIndex === this.state.brandDatas.length)
            return ("");
        else {
            return (this.state.brandDatas[this.state.brandIndex].bgMobile);
        }
    }


    handleBrandChange = (event, value) => {
        this.handleBrand(value);
    };

    
    setNewProduct = () => {

        const { brandDatas } = this.state;

        return (
        <div className = { this.state.menuIndex === 3 ? 'show' : 'notShow' }>
    
        <AppBar position="static" style = {{ backgroundColor:'gray'}}>  
          <Tabs  
           indicatorColor ="primary"
            value={this.state.brandIndex} onChange={this.handleBrandChange} >            
             {
                brandDatas.map (( brand  , i) => {

                    return (
                        <Tab key={i} label={ i  + "번" } />      
                    );
                })                  
            }

            <Tab label={ "새상품" } />      
          </Tabs>
        </AppBar>
        <br></br>
        {
            this.state.brandIndex < this.state.brandDatas.length
            ?
            (
                <div>
                <Button onClick={ e=> this.handleCreate()} variant="contained" color="primary" className="buttomMargin">브랜드 업데이트</Button>    
                <Button onClick={ e=> this.handleDelete()} variant="contained" color="primary" className="buttomMargin">브랜드 삭제</Button>    
                </div>
            )
            :
            (
                <Button onClick={ e=> this.handleCreate()} variant="contained" color="primary" className="buttomMargin">브랜드 추가 </Button>    
            )
        }
        
            <div className='typo'>
                <Grid container spacing={ container_spacing }>

                     <Grid item xs={12}>
                            <Paper className="paper">
                                <Typography className="title" variant="h6"> 브랜드 아이디  </Typography> 
                                <Input className="input" value = { this.state.Image_folder } onChange={this.handleChange('Image_folder')} />
                            </Paper>                        
                    </Grid>

                     <Grid item xs={12}>
                            <Paper className="paper">
                                <Typography className="title" variant="h6"> 브랜드 배경  </Typography> 

                                <Grid container spacing={ container_spacing }>
                                    <Grid item xs={6}>
                                        <Paper className="paper">
                                            <Typography className="title" variant="h6">데스크탑 배경 이미지(1920X1080 jpg)</Typography>                                             
                                            {
                                                this.getBrandImgUrl() !== "" &&  <img src={  this.getBrandImgUrl() } className="imageStyle"  />          
                                            }
                                            <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onBrandBg(0) }  />    
                                        </Paper>          
                                    </Grid>              
                                    <Grid item xs={6}>
                                        <Paper className="paper">
                                            <Typography className="title" variant="h6">모바일 배경 이미지(640X1160 jpg)</Typography> 
                                            {
                                                this.get_Mobile_BrandImgUrl() !== "" &&  <img src={  this.get_Mobile_BrandImgUrl() } className="imageStyle"  />          
                                            }
                                            
                                            <UploadImage type="file"  name="file" className="image_input"  onChange = { this.onBrandMobile(0) }  />    
                                        </Paper>                        
                                    </Grid>              
                                </Grid>
                           </Paper>                                            
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className="paper">
                            <Typography className="title" variant="h6">영문 이름</Typography> 
                            <Input className="input" placeholder="ex ) Au Revoir"  value = { this.state.Company_Name }  onChange={this.handleChange('Company_Name')} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className="paper">
                            <Typography className="title" variant="h6">한국 이름</Typography> 
                            <Input className="input"  placeholder="ex ) 오 흐부아흐"   value = { this.state.Company_KoreanName }   onChange={this.handleChange('Company_KoreanName')} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className="paper">
                            <Typography className="title" variant="h6">링크 URL</Typography> 
                            <Input className="input"  placeholder="ex ) http://aurevoir.me/goods/goods_list.php?cateCd=001" value = { this.state.More_Link }   onChange={this.handleChange('More_Link')} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <div className='typo'>
                <Grid container spacing={ container_spacing }>
                    <Grid item xs={12}>
                        <Paper className="paper">
                            <Typography className="title" variant="h6">소개(데스크탑)</Typography> 
                            <Input className="input" placeholder={company_desc_sample } value = { this.state.Company_Desc }   onChange={this.handleChange('Company_Desc')} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className="paper">
                            <Typography className="title" variant="h6">소개(모바일)</Typography> 
                            <Input className="input" placeholder={company_desc_mobile_sample }  value = { this.state.Company_Desc_Mobile }   onChange={this.handleChange('Company_Desc_Mobile')} />
                        </Paper>
                    </Grid>
            </Grid>
            </div>

            <div className='typo'>
                <Grid container spacing={ container_spacing }>
                        <Grid item xs={12}>
                            <Paper className="paper">
                                <Typography className="title" variant="h6">링크 설명(데스크탑)</Typography> 
                                <Input className="input" placeholder={company_link_sample } value = { this.state.Company_Link }  onChange={this.handleChange('Company_Link')} />
                            </Paper>
                        </Grid>
                    <Grid item xs={12}>
                        <Paper className="paper">
                            <Typography className="title" variant="h6">링크 설명(모바일)</Typography> 
                            <Input className="input" placeholder={company_link_mobile_sample } value = { this.state.Company_Link_Mobile }  onChange={this.handleChange('Company_Link_Mobile')} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <div className='typo'>
            <Paper className="paper">
                <FormControl>
                    <Typography className={cx("brandTitle")} variant="h6">상품 카테고리 
                    
                    <Select
                        className={cx("imageCategorySelect")}
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.Image_category}
                        onChange={this.handleChange('Image_category')}
                        inputProps={{
                        name: 'imageCategory',
                        id: 'demo-controlled-open-select',
                        }}
                    >
                        <MenuItem value={1}> 2개 세로 </MenuItem>
                        <MenuItem value={2}> 4개 가로 * 2 세로 </MenuItem>
                        <MenuItem value={3}> 4개 가로 </MenuItem>
                    </Select>
                    </Typography>                     
                    </FormControl>
                    <br></br>
                    {
                        this.drawLink()
                    }                 
                    </Paper>
                </div>
            </div>
        );
    }


    themeUpdate = async() => {        
        const { themeID, themeTitle, themeDesc , themeSort  } = this.state;
        const recv = await updateTheme(themeID, themeTitle, themeDesc , themeSort);
        this.setState({ 
            themeTitle: recv.theme.title,
            themeDesc: recv.theme.desc,
            themeID: recv.theme.id,
            themeSort: recv.theme.sort,
        });
    }

    render() {
        const { menuIndex } = this.state;
        return (
            <div className='update'>
                <Paper className='root'>
                    <div className='typo'>
                        <Typography className="title" variant="h6">Theme Update </Typography>       
                    </div>
                    <br/>
                    { this.drawTopMenu() }
                    <Button onClick={ e=> this.themeUpdate()} variant="contained" color="primary" className="buttomMargin">Update</Button>
                    <br></br>     
                    <div>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={ menuIndex }
                                onChange={this.handleChangeMenu}
                                scrollable
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="About" icon={<SecurityIcon />} />
                                <Tab label="Main" icon={<GamePadIcon />} />                        
                                <Tab label="Intro" icon={<ComputerIcon />} />
                                <Tab label="Brand" icon={<ShoppingCartIcon />} />
                                <Tab label="Archive" icon={<ShoppingCartIcon />} />

                            </Tabs>
                        </AppBar>           
                        

                        { /* 서버에 한번 post 하면 다시 그린다. */ }
                        { this.state.sendPostDialog === false && this.setAbout()}   
                        { this.state.sendPostDialog === false && this.setMain()}           
                        { this.state.sendPostDialog === false && this.setIntro()}                
                        { this.state.sendPostDialog === false && this.setNewProduct()}
                        { this.state.sendPostDialog === false && this.setArchive()}

                    </div>

                    <Dialog                
                        open={this.state.sendPostDialog}                    
                    >
                        <DialogContent>
                            <Typography className="title" variant="h6"> 서버에 전송중입니다. 기다려주세요. </Typography> 
                            
                        </DialogContent>
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

export default Update;