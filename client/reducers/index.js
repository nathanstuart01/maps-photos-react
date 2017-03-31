import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth'
import flash from './flash';
import photos from './photos';

const rootReducer = combineReducers({ routing: routerReducer, auth, flash, photos });

export default rootReducer;
