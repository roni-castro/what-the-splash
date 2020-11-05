import { IMAGES, IMAGE_STATS } from '../constants';

export const loadImages = () => ({
    type: IMAGES.LOAD,
});

export const setImages = images => ({
    type: IMAGES.LOAD_SUCCESS,
    images,
});

export const setError = error => ({
    type: IMAGES.LOAD_FAIL,
    error,
});

export const loadImageStats = id => ({
    type: IMAGE_STATS.LOAD,
    id,
});

export const setImageStats = (id, downloads) => ({
    type: IMAGE_STATS.LOAD_SUCCESS,
    downloads,
    id,
});

export const setImageStatsError = (id, error) => ({
    type: IMAGE_STATS.LOAD_FAIL,
    id,
    error,
});
