import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import apiService from './server-api';

const newService = new apiService();
const galleryRef = document.querySelector('.gallery');
const submitFormRef = document.querySelector('#search-form');
const loadMoreButtonRef = document.querySelector('.load-more');

submitFormRef.addEventListener('submit', onFormSubmit);

loadMoreButtonRef.addEventListener('click', onLoadButtonCkick);

function onLoadButtonCkick() {
  newService.getPictures().then(({ totalHits, hits }) => {
    createGalleryMarkup(hits);
    if (galleryRef.children.length >= totalHits) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      loadMoreButtonRef.classList.add('is-hidden');
    }
  });
}

function onFormSubmit(evt) {
  const searchQuery = evt.target.elements.searchQuery.value.trim();
  if (searchQuery !== '') {
    evt.preventDefault();
    loadMoreButtonRef.classList.add('is-hidden');
    clearGalery();
    newService.resetPage();
    newService.query = searchQuery;
    htmlRequest();
  }
}

function htmlRequest() {
  newService.getPictures().then(({ totalHits, hits }) => {
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createGalleryMarkup(hits);
      Notify.success(`Horray! We found ${totalHits} images`);
      loadMoreButtonRef.classList.remove('is-hidden');
    }
  });
}

function createGalleryMarkup(array) {
  const galeryMarkup = array
    .map(({ previewURL, tags, likes, views, comments, downloads }) => {
      return `
    <div class="photo-card">
  <img src="${previewURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      ${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');

  galleryRef.insertAdjacentHTML('beforeEnd', galeryMarkup);
}

function clearGalery() {
  galleryRef.innerHTML = '';
}
