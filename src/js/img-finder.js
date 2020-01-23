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
testSearchForm.addEventListener('submit', testHAndleSubmit);

function testHAndleSubmit(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;
  console.log(inputValue);

  axiosImages(inputValue);
}

function axiosImages(query) {
  imagesService
    .axiosImages(query)
    .then(data => {
      insertListItems(data.hits);

      createBtnLoadMore();
    })
    .catch(console.error);
}

function insertListItems(item) {
  const markup = photoCardItemsTemplate(item);
  console.log(markup);
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
