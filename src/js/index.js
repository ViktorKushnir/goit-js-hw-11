import 'tui-pagination/dist/tui-pagination.min.css';
import Pagination from 'tui-pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './pixabayAPI';
import { createGalleryCard } from './createGalleryCard';
import simpleLightbox from 'simple-lightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.getElementById('search-form');
const galleryListEl = document.querySelector('div.gallery');
const loadMoreBtnEl = document.querySelector('button.load-more');

searchFormEl.addEventListener('submit', handlesearchFormElSubmit);
const pixabayAPI = new PixabayAPI();

const lightbox = new SimpleLightbox('.gallery a');

function handlesearchFormElSubmit(event) {
  event.preventDefault();
  clearInterface();
  loadMoreBtnEl.classList.add("hidden");

  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();

  pixabayAPI.q = searchQuery;
  pixabayAPI.page = 1;

  if (!searchQuery) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
  }

  fetchPhotos();
}

// const formEl = document.querySelector('.search-form');
// const ulEl = document.querySelector('.gallery');
// const container = document.getElementById('tui-pagination-container');
// const api = new PixabayAPI();
// const options = {
//   itemsPerPage: 40,
//   page: 1,
// };

// const pagination = new Pagination(container, options);
// const page = pagination.getCurrentPage();

// formEl.addEventListener('submit', onSubmit);

// async function onSubmit(event) {
//   event.preventDefault();
//   const form = event.currentTarget;
//   const value = await form.elements;
//   console.log(value);
// }
// api.getImages(page).then(({ results, total }) => {
//   pagination.reset(total);
//   // console.log(results);
//   // let markup = createGalleryCard(results);
//   // ulEl.innerHTML = markup;
// });
