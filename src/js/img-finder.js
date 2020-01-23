import imagesService from './services/api-service.js';
import searchFormTemplate from '../templates/search-form.hbs';
import galleryListTemplate from '../templates/gallery-list.hbs';
import photoCardItemsTemplate from '../templates/photo-card-items.hbs';
import loadMoreButtonTemplate from '../templates/load-button.hbs';
import searchImagesAppTemplate from '../templates/search-image-app.hbs';

class imageApp {
  constructor() {
    this.body = null;
    this.searchForm = null;
    this.imageList = null;
    this.loadMoreBtn = null;
    this.app = null;
    this.inputValue = null;

    this.init();
    this.addEvent();
  }

  init() {
    this.getDom();

    // this.createDomElement(this.body, searchImagesAppTemplate());
    // this.createDomElement(this.body, searchImagesAppTemplate());
    this.createDomElement(this.app, searchFormTemplate());
    this.createDomElement(this.app, galleryListTemplate());

  }

  getDom() {
    // this.body = document.querySelector('body');
    this.app = document.querySelector('.js-app');
    this.searchForm = document.querySelector('#search-form');
    this.imageList = document.querySelector('.js-gallery');
    this.loadMoreBtn = document.querySelector(
      'button[data-action="load-more"]',
    );
    console.log(this.body);
    console.log(this.app);
    console.log(this.searchForm);
    console.log(this.imageList);
    console.log(this.loadMoreBtn);
  }

  createDomElement(insertElem, element) {
    insertElem.insertAdjacentHTML('beforeend', element);
  }

  // createDom() {
  //   this.body.insertAdjacentHTML('beforeend', searchImagesAppTemplate());
  //   this.app.insertAdjacentHTML('beforeend', searchFormTemplate());
  //   this.app.insertAdjacentHTML('beforeend', galleryListTemplate());
  // }

  addEvent() {
    this.searchForm.addEventListener('submit', this.handlerSubmit);
  }

  handlerSubmit(event) {
    event.preventDefault();

    this.input = event.currentTarget.elements.query;

    this.clearListItems();

    imagesService.resetPage();
    imagesService.searchQuery = this.input.value;

    this.axiosImages();

    this.input.value = '';
  }

  loadMoreButtonHadlerCLick() {
    this.axiosImages();
  }

  axiosImages() {
    imagesService
      .axiosImages()
      .then(data => {
        this.insertListItems(data.hits);
      })
      .catch(console.error);
  }

  insertListItems(item) {
    if (!this.imageList.children.length) {
      this.createDomElement(this.app, loadMoreButtonTemplate());

      this.loadMoreBtn.addEventListener(
        'click',
        this.loadMoreButtonHadlerCLick,
      );
    }

    this.createDomElement(this.imageList, photoCardItemsTemplate(item));
  }

  clearListItems() {
    this.imageList.innerHTML = '';
  }
}

new imageApp();

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
