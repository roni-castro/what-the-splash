import { IMAGE_STATS } from '../constants';

const statsReducer = (state = {}, action) => {
    switch (action.type) {
        case IMAGE_STATS.LOAD:
            return {
                ...state,
                [action.id]: {
                    isLoading: true,
                    downloads: null,
                    error: null,
                },
            };
        case IMAGE_STATS.LOAD_FAIL:
            return {
                ...state,
                [action.id]: {
                    isLoading: false,
                    downloads: null,
                    error: action.error,
                },
            };
        case IMAGE_STATS.LOAD_SUCCESS:
            return {
                ...state,
                [action.id]: {
                    isLoading: false,
                    downloads: action.downloads,
                    error: null,
                },
            };
        default:
            return state;
    }
};

export default statsReducer;
