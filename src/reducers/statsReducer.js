const { IMAGE_STATS: IMAGE_STATUS } = require('../constants');

const statsReducer = (state = {}, action) => {
    switch (action.type) {
        case IMAGE_STATUS.LOAD:
            return {
                ...state,
                [action.id]: {
                    isLoading: true,
                    downloads: null,
                    error: null,
                },
            };
        case IMAGE_STATUS.LOAD_FAIL:
            return {
                ...state,
                [action.id]: {
                    isLoading: false,
                    downloads: null,
                    error: action.error,
                },
            };
        case IMAGE_STATUS.LOAD_SUCCESS:
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
