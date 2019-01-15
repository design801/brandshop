import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

// action types
const UI_DATA = 'ui/UI_DATA';
const MENU_DATA = 'ui/MENU_DATA';
const SLIDE_DATA = 'ui/SLIDE_DATA';
const THEME_DATA = 'ui/THEME_DATA';

// action creators
export const setUiData = createAction(UI_DATA);
export const setThemeData = createAction(THEME_DATA);
export const setMenu = createAction(MENU_DATA);
export const setSlideData = createAction(SLIDE_DATA);

// initial state
const initialState = Map({  
  ui: Map ({
    width: 0, 
    height: 0,
    menu: 0,    
    noticeList:null,    //notice List 데이터
    noticeView: Map({id: "", page: 0, index :0}),    //noticeView 위한 데이터
    fullData: Map({}),
    isSlide: false, // 슬라이더 진행 여부
    theme:'',
  }),
});

// reducer
export default handleActions({
  [UI_DATA]: (state, action) => {
    return state.setIn(['ui','height'], action.payload.height)
                .setIn(['ui','width'], action.payload.width);                    
    //return
  },  

  [MENU_DATA]: (state, action) => {
    return state.setIn(['ui','menu'], action.payload.menu );
  },
  
  [SLIDE_DATA]: (state, action) => {
    return state.setIn(['ui','isSlide'], action.payload );
  },  

  [THEME_DATA]: (state, action) => {    
    return state.setIn(['ui','theme'], action.payload.theme );
  },  


}, initialState)