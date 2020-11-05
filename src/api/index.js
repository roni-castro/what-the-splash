const key = '5nNvLtch2mxPD3eXhzCcm2vF5bj_LCr9LlR2bSDER4g';
const API_URL = 'https://api.unsplash.com/photos/';

export const fetchImages = async page => {
    const response = await fetch(
        `${API_URL}?client_id=${key}&per_page=5&page=${page}`,
    );
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export const fetchImageStats = async id => {
    const response = await fetch(
        `${API_URL}/${id}/statistics?client_id=${key}`,
    );
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};
