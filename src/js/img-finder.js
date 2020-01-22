import imagesService from './services/api-service.js';
import searchFormTemplate from '../templates/search-form.hbs';
import galleryListTemplate from '../templates/gallery-list.hbs';
import photoCardItemsTemplate from '../templates/photo-card-items.hbs';

const refs = {
  // searchImagesApp: document.querySelector('.js-app'),
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

// refs.loadMoreBtn.addEventListener('click', )
// refs.searchForm.addEventListener('submit')

imagesService
  .axiosImages('cat')
  .then(data => createElement(data.hits))
  .catch(console.error);

function createElement(item) {
  const markup = photoCardItemsTemplate(item);
  console.log(markup);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function createApp() {
  
}
