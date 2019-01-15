import { combineReducers } from 'redux';

import ui from './ui';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    ui,
    pender: penderReducer
});
