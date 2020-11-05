import { put, all, fork, retry, takeEvery } from 'redux-saga/effects';
import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import { loadImageStats, setImageStats, setImageStatsError } from '../actions';

function* handleImageStatLoad(id) {
    try {
        yield put(loadImageStats(id));
        const response = yield retry(3, 1000, fetchImageStats, id);
        yield put(setImageStats(id, response.downloads));
    } catch (error) {
        yield put(setImageStatsError(id, error));
    }
}

export default function* watchImageStatsRequest() {
    function* handleMultipleImageStatLoad(state) {
        const { images } = state;
        return yield all(
            images.map(image => fork(handleImageStatLoad, image.id)),
        );
    }

    yield takeEvery(IMAGES.LOAD_SUCCESS, handleMultipleImageStatLoad);
}
