import SimpleLightbox from 'simplelightbox';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const galleryList = images
    .map(image => {
      return `<li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" />
            <ul class="descr-list">
              <li class="descr-item">
                <p class="category">Likes</p>
                <p class="value">${image.likes}</p>
              </li>
              <li class="descr-item">
                <p class="category">Views</p>
                <p class="value">${image.views}</p>
              </li>
              <li class="descr-item">
                <p class="category">Comments</p>
                <p class="value">${image.comments}</p>
              </li>
              <li class="descr-item">
                <p class="category">Downloads</p>
                <p class="value">${image.downloads}</p>
              </li>
            </ul>
          </a>
          </li>
        `;
    })
    .join('');
  gallery.innerHTML = galleryList;
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
