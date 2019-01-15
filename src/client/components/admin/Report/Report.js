import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './Report.scss';


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
import Grid from '@material-ui/core/Grid';

import moment from 'moment';

import { find , findTheme, boolTheme, changeTheme , report } from '@lib/admin';


//date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
//chart
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';



import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';

import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';


const cx = classNames.bind(styles);

//data sample
const data = [
    { name: '00', '12': 1, '2': 2 },
];

  
  //데이터를 찾는다.
  const timeDatas = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

const color_data = [
    '#9ACD32',
    '#6A5ACD',
    '#4169E1',
    '#FFA500',
    '#1E90FF',
    '#008000',
    '#FF00FF',
    '#FFC0CB',
    '#2E8B57',
    '#800080',
    '#191970',
  ];


class Report extends React.Component {

    state = {

        themes: [],

        open_chart: false,
        open_chart_value: 1,       

        open_theme: false,
        open_theme_value: 1,       
        open_theme_menu : 1,
        open_brand: false,
        open_brand_value: 1,       

        selectDate:'',        

        brandDatas: [],
        makeBrandDatas:[],
    }

    handle_open_chart = () => {
        this.setState({ open_chart : true });
      };
    
    handle_close_chart = () => {
    this.setState({ open_chart : false });
    };


    handle_open_theme = () => {
        this.setState({ open_theme : true });
      };
    
    handle_close_theme = () => {
    this.setState({ open_theme : false });
    };

    handle_open_brand = () => {
        this.setState({ open_brand: true });
      };
    
    handle_close_brand = () => {
        this.setState({ open_brand: false });
    };

    handleChange = name => event => {        
        
        this.setState({
            [name]: event.target.value,
        });

       
    };

    handleDateChange(date) {
        this.setState({
            selectDate: date            
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            selectDate: new Date(),
            open_theme_value: 1,                   
            open_brand_value: 1,     
            open_chart_value: 1,       
            open_theme_menu: 1,

        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    getSelectDataStr = () => {        
        let str = moment(this.state.selectDate).format('YYYYMMDD');        
        return str;
    }

    makeData = () => {        
        //우선 브랜드 아이디를 만든다.
        let ids = [];        
        let title = [];

        this.state.themes[ this.state.open_theme_value - 1].brand.map(( brand , i) => {                
                ids.push(brand.id);    
                title.push(brand.title);
        })

        let datas = [];
        for(let i = 0 ; i < timeDatas.length ; i++ )
        {
            let str = '{"name":' + i;

            for(let j = 0 ; j < ids.length ; j++)
            {
                str += ',' + this.getBrandCount( ids[j] , title[j], timeDatas[i] );
            }

            str += '}';
            var obj = JSON.parse(str);
            datas.push(obj);
        }

        this.setState({
            makeBrandDatas: datas
        });
    }

    getBrandCount( brandId , title ,  time ) {
        const { brandDatas } = this.state;
        for(let i = 0 ; i <  brandDatas.length ; i++)
        {            

             if(brandDatas[i].brand === brandId &&  brandDatas[i].time === time)   
                return '"' + title + '":' + brandDatas[i].count;
        }
        return '"' + title + '":0';
    }

    
    componentDidMount = async() => {
        const recv = await find();    
        this.setState({
            themes: recv.themes
        });        
        this.report();
    }

    report = async() => {

        this.setState({
            open_theme_value: this.state.open_theme_menu
        });

        const recv = await report( this.state.themes[ this.state.open_theme_menu - 1].id , this.getSelectDataStr()  );    

        this.setState({
            brandDatas: recv.data
        });
        this.makeData();
    }


    draw_line_chart = () => {
        return (
            <ResponsiveContainer width="90%" height={420}>
            <LineChart data={ this.state.makeBrandDatas}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid vertical={true} strokeDasharray="1 1" />
            <Tooltip />
            <Legend />
            {
                this.state.themes[ this.state.open_theme_value - 1].brand.map(( brand , i) => {
                    return (
                        <Line key = { i + 1 }  type="monotone" dataKey= { brand.title }  stroke= { color_data[ i % 10 ] } />
                    );
                })
            }
            </LineChart>
            </ResponsiveContainer>
        );

    }

    draw_area_chart = () => {
        return (
            <ResponsiveContainer width="90%" height={420}>
            <AreaChart data={ this.state.makeBrandDatas}>
            <CartesianGrid vertical={true} strokeDasharray="1 1"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            {
                this.state.themes[ this.state.open_theme_value - 1].brand.map(( brand , i) => {
                    return (
                        <Area key = { i + 1 }  type="monotone" dataKey= { brand.title }  stroke= { color_data[ i % 10 ] }  fill= { color_data[ i % 10 ] }  />
                    );
                })
            }

         </AreaChart>
         </ResponsiveContainer>
        );
        
    }

    draw_area_bar = () => {
        return (
            <ResponsiveContainer width="90%" height={420}>
            <BarChart data={ this.state.makeBrandDatas}>
            <CartesianGrid vertical={true} strokeDasharray="1 1"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            {
                this.state.themes[ this.state.open_theme_value - 1].brand.map(( brand , i) => {
                    return (
                        <Bar key = { i + 1 }  type="monotone" dataKey= { brand.title }  stroke= { color_data[ i % 10 ] }  fill= { color_data[ i % 10 ] }  />
                    );
                })
            }

         </BarChart>
         </ResponsiveContainer>
        );
        
    }

    render() {

        if(this.state.themes === undefined) {
            return (<div></div>);
        }
        
        return (
            <div className='Report'>                
                <Grid container spacing={24}>
                     <Grid item xs={3}>                  
                        <Typography className={cx("brandTitle")} variant="h6"> 차트 선택
                        </Typography>
                            <Select
                                    className={cx("imageCategorySelect")}
                                    open={this.state.open_chart}
                                    onClose={this.handle_close_chart}
                                    onOpen={this.handle_open_chart}
                                    value={this.state.open_chart_value}
                                    onChange={this.handleChange('open_chart_value')}                        
                            >
                            <MenuItem value={ 1 }> Line </MenuItem>
                            <MenuItem value={ 2 }> Area </MenuItem>
                            <MenuItem value={ 3 }> Bar </MenuItem>
                            </Select>
                        

                  </Grid>       


                  <Grid item xs={3}>                
                        <Typography className={cx("brandTitle")} variant="h6"> 날짜 선택   </Typography>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={this.state.selectDate}
                                onChange={this.handleDateChange }
                                todayButton={"Select Today"}
                            />      

                  </Grid>             

                  <Grid item xs={4}>                  
                        <Typography className={cx("brandTitle")} variant="h6"> 테마 고르기
                        </Typography>
                            <Select
                                    className={cx("imageCategorySelect")}
                                    open={this.state.open_theme}
                                    onClose={this.handle_close_theme}
                                    onOpen={this.handle_open_theme}
                                    value={this.state.open_theme_menu}
                                    onChange={this.handleChange('open_theme_menu')}                        
                            >                                    
                                    {
                                        this.state.themes.map( (pp, i) => {
                                            return (
                                                <MenuItem key = { i + 1 } value={ i + 1}> { pp.title } </MenuItem>
                                            );
                                        })
                                    }

                            </Select>
                        

                  </Grid>       

                  <Grid item xs={1}>                  
                    <Button onClick={ e=> this.report()} variant="contained" color="primary" > 검색 </Button>          
                  </Grid>                       
              </Grid>

                <br></br>
                
                {
                  this.state.open_chart_value === 1 &&  this.draw_line_chart() 
                }                    
                {
                  this.state.open_chart_value === 2 &&  this.draw_area_chart() 
                }                            
                {
                  this.state.open_chart_value === 3 &&  this.draw_area_bar() 
                }          
            </div>
        );
    }
}

export default Report;