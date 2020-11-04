import { combineReducers } from 'redux';
import imagesReducer from './imagesReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    images: imagesReducer,
    error: errorReducer,
    isLoading: loadingReducer,
});

export default rootReducer;
