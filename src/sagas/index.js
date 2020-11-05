import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import imageStatsSaga from './imageStatsSaga';

export default function* rootSaga() {
    yield all([imagesSaga(), imageStatsSaga()]);
}
