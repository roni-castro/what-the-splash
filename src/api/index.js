const key = '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';
const API_URL = 'https://api.unsplash.com/photos/';

export const fetchImages = async page => {
    const response = await fetch(
        `${API_URL}?client_id=${key}&per_page=3&page=${page}`,
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
