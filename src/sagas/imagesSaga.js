import { put, call, select, takeEvery } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImages } from '../api';
import { setError, setImages } from '../actions';

const getPage = state => state.nextPage;

function* handleImageLoad() {
    try {
        const page = yield select(getPage);
        const images = yield call(fetchImages, page);
        yield put(setImages(images));
    } catch (err) {
        yield put(setError(err));
    }
}

export default function* watchImageLoad() {
    yield takeEvery(IMAGES.LOAD, handleImageLoad);
}
