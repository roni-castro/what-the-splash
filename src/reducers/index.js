import { combineReducers } from 'redux';
import imagesReducer from './imagesReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import pageReducer from './pageReducer';
import statsReducer from './statsReducer';

const rootReducer = combineReducers({
    images: imagesReducer,
    error: errorReducer,
    isLoading: loadingReducer,
    nextPage: pageReducer,
    imageStats: statsReducer,
});

export default rootReducer;
