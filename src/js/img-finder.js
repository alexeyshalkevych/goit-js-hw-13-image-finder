import imagesService from './services/api-service.js';
import searchFormTemplate from '../templates/search-form.hbs';
import photoCardListTemplate from '../templates/photo-card-list.hbs';
import photoCardItemsTemplate from '../templates/photo-card-items.hbs';
import loadMoreButtonTemplate from '../templates/load-button.hbs';
import searchImagesAppTemplate from '../templates/search-image-app.hbs';

class searchImageApp {
  constructor() {
    this.body = document.querySelector('body');
    this.app = null;
    this.searchForm = null;
    this.imageList = null;
    this.loadMoreBtn = null;
    this.inputValue = null;

    this.init();
  }

  init() {
    this.createDomElement(this.body, searchImagesAppTemplate(), 'afterbegin');
    this.app = document.querySelector('.js-app');

    this.createDomElement(this.app, searchFormTemplate(), 'beforeend');
    this.createDomElement(this.app, photoCardListTemplate(), 'beforeend');
    this.searchForm = document.querySelector('.js-search-form');
    this.imageList = document.querySelector('.js-card-list');

    this.searchForm.addEventListener('submit', this.handlerSubmit.bind(this));
  }

  createDomElement(insertElem, element, path) {
    insertElem.insertAdjacentHTML(path, element);
  }

  handlerSubmit(event) {
    event.preventDefault();

    this.input = event.currentTarget.elements.query;

    this.clearImageListItems();
    imagesService.resetPage();

    imagesService.searchQuery = this.input.value;

    this.axiosImages();

    this.input.value = '';
  }

  axiosImages() {
    imagesService
      .axiosImages()
      .then(data => {
        if (data.hits.length) {
          this.insertListItems(data.hits);
        }
      })
      .catch(console.error);
  }

  insertListItems(item) {
    

    if (!this.imageList.children.length && !this.loadMoreBtn) {
      this.createDomElement(this.app, loadMoreButtonTemplate(), 'beforeend');
      this.loadMoreBtn = document.querySelector(
        'button[data-action="load-more"]',
      );

      this.loadMoreBtn.addEventListener(
        'click',
        this.loadMoreButtonHadlerCLick.bind(this),
      );
    }

    this.createDomElement(
      this.imageList,
      photoCardItemsTemplate(item),
      'beforeend',
    );
  }

 

  loadMoreButtonHadlerCLick() {
    this.axiosImages();
  }

  clearImageListItems() {
    this.imageList.innerHTML = '';
  }
}

new searchImageApp();
// const refs = {
//   searchImagesApp: document.querySelector('.js-app'),
//   // searchForm: document.querySelector('#search-form'),
//   // galleryList: document.querySelector('.js-gallery'),
//   // loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
// };

// createSearchInput();
// createImageList();

// const testSearchForm = document.querySelector('#search-form');
// const testImageList = document.querySelector('.js-gallery');

// console.log(testSearchForm);

// testSearchForm.addEventListener('submit', testHandleSubmit);

// function testHandleSubmit(event) {
//   event.preventDefault();

//   const form = event.currentTarget;
//   const input = form.elements.query;

//   clearListItems();
//   imagesService.resetPage();
//   imagesService.searchQuery = input.value;

//   axiosImages();

//   input.value = '';
// }

// function axiosImages() {
//   imagesService
//     .axiosImages()
//     .then(data => {
//       insertListItems(data.hits);
//     })
//     .catch(console.error);
// }

// function loadMoreButtonHadlerCLick() {
//   axiosImages();
// }

// function insertListItems(item) {
//   if (!testImageList.children.length) {
//     createBtnLoadMore();

//     const loadMoreBtn = document.querySelector(
//       'button[data-action="load-more"]',
//     );

//     loadMoreBtn.addEventListener('click', loadMoreButtonHadlerCLick);
//   }

//   const markup = photoCardItemsTemplate(item);
//   testImageList.insertAdjacentHTML('beforeend', markup);
// }

// function createSearchInput() {
//   refs.searchImagesApp.insertAdjacentHTML('beforeend', searchFormTemplate());
// }

// function createImageList() {
//   refs.searchImagesApp.insertAdjacentHTML('beforeend', galleryListTemplate());
// }

// function createBtnLoadMore() {
//   refs.searchImagesApp.insertAdjacentHTML(
//     'beforeend',
//     loadMoreButtonTemplate(),
//   );
// }

// function clearListItems() {
//   testImageList.innerHTML = '';
// }
