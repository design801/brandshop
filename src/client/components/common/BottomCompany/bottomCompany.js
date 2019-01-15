import React from 'react';
import classNames from 'classnames/bind';
import styles from './bottomCompany.scss';
import PropTypes from 'prop-types';

//mateirl-ui
import { Drawer , Typography , Fab , Button , Divider  } from '@material-ui/core/';

import { DesktopBreakpoint , TabletBreakpoint , PhoneBreakpoint } from '@components/common/Responsive_utilities';

const cx = classNames.bind(styles);

class BottomCompany extends React.Component {
  
      drawDiviver = () => {
            return (
                  <div align="center" className={cx('divierStyle')}>  </div>
            );
      }

// drawSecondLine = () => {
//       return (
//             <div>
//                   <div className={cx('lineStyle')}>
//                         <Typography className={cx('typoLongStyle')}>서울특별시 마포구 동교로 181-6 (동교동201-45) 1층 누룸</Typography>
//                         { this.drawDiviver() }
//                         <Typography className={cx('typoLongStyle')}>2호선 홍대입구역 1번 출구 도보 5분</Typography>
//                   </div>

//                   <div className={cx('lineStyle')}>                  
//                         <Typography className={cx('typoStyle')}>nouroom@naver.com</Typography>            
                        
//                   </div>
//             </div>
//       );
// }

// drawSecondMobile = () => {
//       return (
//             <div>
//                   <div className={cx('lineStyle')}>
//                         <Typography className={cx('typoLongStyle')}>서울특별시 마포구 동교로 181-6 1층 누룸</Typography>
//                         { this.drawDiviver() }
//                         <Typography className={cx('typoLongStyle')}>2호선 홍대입구역 1번 출구 도보 5분</Typography>
//                   </div>

//                   <div className={cx('lineStyle')}>                  
//                         <Typography className={cx('typoStyle')}>nouroom@naver.com</Typography>            
//                   </div>
//             </div>
//       );
// }

      render() {            
            return (   
                  <div className={cx('BottomCompany')}>
                        <DesktopBreakpoint>
                              { /* 첫번째 라인 */}
                              <div className={cx('lineStyle')}>
                                    <div>                  
                                          <svg className={cx('logoStyle')} viewBox="0 0 500.26 60.71"> 
                                                <use xlinkHref="/static/images/svg/nouroom_logo.svg#nouroom_logo"></use>
                                          </svg>
                                    </div>

                                    { this.drawDiviver() }
                                    <Typography className={cx('typoStyle')}><span>Seoul</span></Typography>
                                    { this.drawDiviver() }
                                    <Typography className={cx('typoStyle')}><span>South korea</span></Typography>
                              </div>

                              <div className={cx('lineStyle')}>
                                    <Typography className={cx('typoLongStyle')}>서울특별시 마포구 동교로 181-6 (동교동201-45) 1층 누룸</Typography>
                                    { this.drawDiviver() }
                                    <Typography className={cx('typoLongStyle')}>2호선 홍대입구역 1번 출구 도보 5분</Typography>
                              </div>

                              <div className={cx('lineStyle')}>                  
                                    <Typography className={cx('typoStyle')}>nouroom@naver.com</Typography>            
                              </div>
                        </DesktopBreakpoint>

                        <TabletBreakpoint>
                              { /* 첫번째 라인 */}
                              <div className={cx('lineStyle')}>
                                    <div>                  
                                    <svg className={cx('logoStyle')} viewBox="0 0 500.26 60.71"> <use xlinkHref="/static/images/svg/nouroom_logo.svg#nouroom_logo"></use></svg>
                                    </div>

                                    { this.drawDiviver() }
                                    <Typography className={cx('typoStyle')}><span>Seoul</span></Typography>
                                    { this.drawDiviver() }
                                    <Typography className={cx('typoStyle')}><span>South korea</span></Typography>
                              
                              </div>

                              <div className={cx('lineStyle')}>
                                    <Typography className={cx('typoLongStyle')}>서울특별시 마포구 동교로 181-6 (동교동201-45) 1층 누룸</Typography>
                                    { this.drawDiviver() }
                                    <Typography className={cx('typoLongStyle')}>2호선 홍대입구역 1번 출구 도보 5분</Typography>
                              </div>

                              <div className={cx('lineStyle')}>                  
                                    <Typography className={cx('typoStyle')}>nouroom@naver.com</Typography>            
                                    
                              </div>
                        </TabletBreakpoint>

                        <PhoneBreakpoint>
                              <div className={cx('lineStyle')}>
                                    <div>                  
                                          <svg className={cx('logoStyle')} viewBox="0 0 500.26 60.71"> 
                                                <use xlinkHref="/static/images/svg/nouroom_logo.svg#nouroom_logo"></use>
                                          </svg>
                                    </div>

                                    { this.drawDiviver() }
                                    <Typography className={cx('typoStyle')}><span>Seoul</span></Typography>
                                    { this.drawDiviver() }
                                    <Typography className={cx('typoStyle')}><span>South korea</span></Typography>
                              </div>

                              <div className={cx('lineStyle')}>
                                    <Typography className={cx('typoLongStyle')}>서울특별시 마포구 동교로 181-6 1층 누룸</Typography>
                                    { this.drawDiviver() }
                                    <Typography className={cx('typoLongStyle')}>2호선 홍대입구역 1번 출구 도보 5분</Typography>
                              </div>

                              <div className={cx('lineStyle')}>                  
                                    <Typography className={cx('typoStyle')}>nouroom@naver.com</Typography>            
                              </div>

                        </PhoneBreakpoint>
                  </div>                       
             );
      }
}

export default BottomCompany;