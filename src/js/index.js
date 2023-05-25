import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import searchImages from './pixabay';
import loadMoreBtn from './loadMore.js';
import { createMarkup } from './markup';

const refs = {
  formEl: document.getElementById('search-form'),
  buttonEl: document.querySelector('.btn'),
  divEl: document.querySelector('.gallery'),
};

const options = {
  showCounter: false,
};
const newImage = new searchImages();
const newLoadMoreBtn = new loadMoreBtn('.load-more', true);
refs.formEl.addEventListener('submit', onSubmit);
newLoadMoreBtn.button.addEventListener('click', onClick);

function onSubmit(ev) {
  ev.preventDefault();
  const form = ev.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  if (value === '') {
    return Notiflix.Notify.warning(
      'Please enter a value to search for images!'
    );
  } else {
    newImage.values = value;
    newImage.restPage();

    newLoadMoreBtn.removeBtn();
    delitMarkup();

    onClick().finally(() => {
      form.reset();
    });
  }
}
function scroll() {
  const { height: cardHeight } =
    refs.divEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function onClick() {
  if (newImage.page > 1 && newImage.page > Math.ceil(newImage.totalHits / 40)) {
    newLoadMoreBtn.hideBtn();
    scroll();
    return Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  newLoadMoreBtn.disable();
  return getRestPage().then(() => newLoadMoreBtn.enable());
}

async function getRestPage() {
  try {
    const articles = await newImage.getImages();
    if (articles.length === 0) {
      throw new Error(onError);
    }

    const markup = articles.reduce(
      (markup, hit) => markup + createMarkup(hit),
      ''
    );
    if (newImage.page - 1 === 1) {
      Notiflix.Notify.success(`Hooray! We found ${newImage.totalHits} images.`);
    }

    updateMarkup(markup);
    initializeLightbox();
  } catch (err) {
    onError(err);
  }
}

function updateMarkup(markup) {
  refs.divEl.insertAdjacentHTML('beforeend', markup);
  scroll();
}
function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery__link', options);
  lightbox.refresh();
}
function delitMarkup() {
  refs.divEl.innerHTML = '';
}
function onError(er) {
  console.log(er);
  newLoadMoreBtn.hideBtn();
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    onClick();
  }
}

window.addEventListener('scroll', handleScroll);
