import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('#form-search');
const input = document.querySelector('#input-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#load-more-btn');

let currentPage = 1;
let totalPage = 1;
let currentValue = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleClick);

async function handleSubmit(event) {
  event.preventDefault();
  const value = input.value.trim();
  if (value === '') {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Please fill out the search bar',
    });
    return;
  }
  loader.style.display = 'block';
  gallery.innerHTML = '';
  currentPage = 1;
  currentValue = value;

  try {
    const data = await fetchImages(currentValue, currentPage);
    const images = data.hits;

    if (images.length === 0) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        position: 'topRight',
        title: 'No Results',
        message: 'Sorry... No results were found for your request',
      });
      form.reset();
      return;
    }
    renderImages(images);
    currentPage += 1;
    loadMoreBtn.style.display = 'block';

    if (data.totalHits < 15) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        position: 'topRight',
        title: 'No more results',
        message: 'Sorry... This is all we managed to find',
      });
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

async function handleClick() {
  loader.style.display = 'block';

  try {
    const data = await fetchImages(currentValue, currentPage);
    const images = data.hits;
    renderImages(images, true);
    loader.style.display = 'none';
    loadMoreBtn.style.display = 'block';
    window.scrollBy({
      top: 720,
      behavior: 'smooth',
    });
    totalPage = Math.ceil(data.totalHits / 15);
    if (totalPage === currentPage) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        position: 'topRight',
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
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
