import axios from 'axios';

const API_KEY = '44257136-dfc34124ab45074cb7ae2d95f';
const URL = `https://pixabay.com/api`;

export async function fetchImages(value) {
  const response = await axios.get(URL, {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data.hits;
}
