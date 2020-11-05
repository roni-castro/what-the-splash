import { runSaga } from 'redux-saga';
import { handleImageStatLoad } from '../imageStatsSaga';
import {
    loadImageStats,
    setImageStats,
    setImageStatsError,
} from '../../actions';
import * as api from '../../api'; // we'll mock the fetchImageStats api

describe('imageStatsSaga', () => {
    it('should load and set the image stats in case of success', async () => {
        const fakeImageId = '123';
        const dispatchedActions = [];
        const fakeStore = {
            dispatch: action => dispatchedActions.push(action),
        };

        const mockedStats = { downloads: { total: 1 } };
        const fetchImageStatsSpy = jest
            .spyOn(api, 'fetchImageStats')
            .mockResolvedValue(mockedStats);

        await runSaga(fakeStore, handleImageStatLoad, fakeImageId).toPromise();

        expect(dispatchedActions[0]).toMatchObject(loadImageStats(fakeImageId));
        expect(fetchImageStatsSpy).toHaveBeenCalledWith(fakeImageId);
        expect(dispatchedActions[1]).toMatchObject(
            setImageStats(fakeImageId, mockedStats.downloads),
        );
    });

    it('should load and handle the image stats error (incl. retries) in case of failure', async () => {
        const fakeImageId = '123';
        const dispatchedActions = [];
        const fakeStore = {
            dispatch: action => dispatchedActions.push(action),
        };

        const mockedError = new Error('error fetch image status');
        const fetchImageStatsSpy = jest
            .spyOn(api, 'fetchImageStats')
            .mockRejectedValue(mockedError);

        await runSaga(fakeStore, handleImageStatLoad, fakeImageId).toPromise();

        expect(dispatchedActions[0]).toMatchObject(loadImageStats(fakeImageId));
        expect(fetchImageStatsSpy).toHaveBeenCalledTimes(3);
        expect(dispatchedActions[1]).toMatchObject(
            setImageStatsError(fakeImageId, mockedError),
        );
    });
});
