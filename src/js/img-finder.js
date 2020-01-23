import imagesService from './services/api-service.js';
import searchFormTemplate from '../templates/search-form.hbs';
import galleryListTemplate from '../templates/gallery-list.hbs';
import photoCardItemsTemplate from '../templates/photo-card-items.hbs';
import loadMoreButtonTemplate from '../templates/load-button.hbs';

const refs = {
  searchImagesApp: document.querySelector('.js-app'),
  // searchForm: document.querySelector('#search-form'),
  // galleryList: document.querySelector('.js-gallery'),
  // loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

createSearchInput();
createImageList();

const testSearchForm = document.querySelector('#search-form');
const testImageList = document.querySelector('.js-gallery');
// refs.loadMoreBtn.addEventListener('click', )
testSearchForm.addEventListener('submit', testHandleSubmit);

function testHandleSubmit(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;

  clearListItems();
  imagesService.resetPage();
  imagesService.searchQuery = inputValue;

  axiosImages();
}

function axiosImages() {
  imagesService
    .axiosImages()
    .then(data => {
      insertListItems(data.hits);

      createBtnLoadMore();

      const loadMoreBtn = document.querySelector(
        'button[data-action="load-more"]',
      );

      loadMoreBtn.addEventListener('click', loadMoreButtonHadlerCLick);
    })
    .catch(console.error);
}

function loadMoreButtonHadlerCLick() {
  axiosImages();
}

function insertListItems(item) {
  const markup = photoCardItemsTemplate(item);
  testImageList.insertAdjacentHTML('beforeend', markup);
}

function createSearchInput() {
  refs.searchImagesApp.insertAdjacentHTML('beforeend', searchFormTemplate());
}

function createImageList() {
  refs.searchImagesApp.insertAdjacentHTML('beforeend', galleryListTemplate());
}

function createBtnLoadMore() {
  refs.searchImagesApp.insertAdjacentHTML(
    'beforeend',
    loadMoreButtonTemplate(),
  );
}

function clearListItems() {
  testImageList.innerHTML = '';
}
