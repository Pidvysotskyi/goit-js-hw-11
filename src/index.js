import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import apiService from './server-api';

const newService = new apiService();
const galleryRef = document.querySelector('.gallery');
const submitFormRef = document.querySelector('#search-form');
const loadMoreButtonRef = document.querySelector('.load-more');

submitFormRef.addEventListener('submit', onFormSubmit);
loadMoreButtonRef.addEventListener('click', onLoadButtonCkick);

const shownPictures = galleryRef.children.length;

function onLoadButtonCkick() {
  newService.getPictures().then(({ totalHits, hits }) => {
    console.log(totalHits);
    createGalleryMarkup(hits);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  clearGalery();
  newService.resetPage();
  newService.searchQuery = evt.target.elements.searchQuery.value;
  htmlRequest();
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
