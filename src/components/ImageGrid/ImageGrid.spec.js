import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store';
import ImageGrid from './ImageGrid';
import { waitForComponentToPaint } from '../../utils/testUtils';
import * as api from '../../api';
import {
    imagesResponsePage1,
    imagesResponsePage2,
} from '../../fixtures/imagesResponseMock';
import Stats from '../Stats';
import Button from '../Button';

const imageStatsMock = { downloads: { total: 10 } };

describe('<ImageGrid />', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('should render the list of images fetched and stats badge', async () => {
        jest.spyOn(api, 'fetchImages').mockResolvedValueOnce(
            imagesResponsePage1,
        );
        jest.spyOn(api, 'fetchImageStats').mockResolvedValue(imageStatsMock);

        const store = configureStore();
        const wrapper = mount(
            <Provider store={store}>
                <ImageGrid />
            </Provider>,
        );

        await waitForComponentToPaint(wrapper, 300);

        const statsComponents = wrapper.find(Stats);
        const statsDownloadsCounterComponents = wrapper.find('.stats');

        expect(statsComponents).toHaveLength(imagesResponsePage1.length);
        expect(statsDownloadsCounterComponents).toHaveLength(
            imagesResponsePage1.length,
        );
    });

    it('should render the list of images and stats of the second page when the load more button is clicked', async () => {
        jest.spyOn(api, 'fetchImages').mockResolvedValueOnce(
            imagesResponsePage1,
        );
        jest.spyOn(api, 'fetchImages').mockResolvedValue(imagesResponsePage2);
        jest.spyOn(api, 'fetchImageStats').mockResolvedValue(imageStatsMock);

        const store = configureStore();
        const wrapper = mount(
            <Provider store={store}>
                <ImageGrid />
            </Provider>,
        );

        await waitForComponentToPaint(wrapper, 300);

        // first render
        let statsComponents = wrapper.find(Stats);
        let totalImageItensRendered = imagesResponsePage1.length;
        expect(statsComponents).toHaveLength(totalImageItensRendered);

        // load more clicked
        const loadMoreButton = wrapper.find(Button);
        loadMoreButton.simulate('click');

        await waitForComponentToPaint(wrapper);
        statsComponents = wrapper.find(Stats);
        totalImageItensRendered =
            imagesResponsePage1.length + imagesResponsePage2.length;
        expect(statsComponents).toHaveLength(totalImageItensRendered);
    });
});
