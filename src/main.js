import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api'
import { renderImages } from './js/render-functions'

const form = document.querySelector('#form-search');
const input = document.querySelector('#input-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const value = input.value.trim();
  if (value == '') {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Please fill out the search bar',
    });
    return;
  }

  loader.style.display = 'block';
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(value);

    if (images.length === 0) {
      iziToast.info({
        position: 'topRight',
        title: 'No Results',
        message: 'Sorry... No results were found for your request',
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
}

