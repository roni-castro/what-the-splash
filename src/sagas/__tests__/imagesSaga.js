import { runSaga } from 'redux-saga';

import { getPage, handleImagesLoad } from '../imagesSaga';
import * as api from '../../api'; // we'll mock the fetchImages api
import { setImages, setError } from '../../actions';

describe('imagesSaga', () => {
    it('should return the next page correctly', () => {
        const state = { nextPage: 1 };
        const nextPage = getPage(state);
        expect(nextPage).toBe(1);
    });

    it('should set images into state in case of success', async () => {
        const dispatchedActions = [];

        const mockedImages = ['img1', 'img2'];
        const fetchImagesSpy = jest
            .spyOn(api, 'fetchImages')
            .mockResolvedValue(mockedImages);

        const fakeStore = {
            getState: () => ({ nextPage: 1 }),
            dispatch: action => dispatchedActions.push(action),
        };

        await runSaga(fakeStore, handleImagesLoad).toPromise();

        expect(fetchImagesSpy).toHaveBeenCalledWith(1);
        expect(dispatchedActions).toContainEqual(setImages(mockedImages));
    });

    it('should set error in state case of fail', async () => {
        const dispatchedActions = [];

        const error = new Error('error message');
        jest.spyOn(api, 'fetchImages').mockRejectedValue(error);

        const fakeStore = {
            getState: () => ({ nextPage: 1 }),
            dispatch: action => dispatchedActions.push(action),
        };

        await runSaga(fakeStore, handleImagesLoad).toPromise();

        expect(fetchImagesSpy).toHaveBeenCalledWith(1);
        expect(dispatchedActions).toContainEqual(setError(error));
    });
});
