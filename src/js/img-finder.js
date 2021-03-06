import imagesService from './services/api-service.js';
import photoCardItemsTemplate from '../templates/photo-card-items.hbs';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';
import spinner from './spinner.js';

class searchImageApp {
  constructor() {
    this.body = document.querySelector('body');
    this.proxyElement = document.createElement('div');
    this.searchForm = null;
    this.imageList = null;
    this.loadMoreBtn = null;
    this.inputValue = null;
    this.spinner = null;
    this.items = null;

    this.init();
  }

  /**
   * Method to initialize
   */
  init() {
    this.body.prepend(this.createDomElements());

    this.setDomElements();

    this.searchForm.addEventListener('submit', this.handlerSubmit.bind(this));
    this.loadMoreBtn.addEventListener(
      'click',
      this.loadMoreButtonHadlerCLick.bind(this),
    );
  }

  /**
   * Method for sets all reference
   */
  setDomElements() {
    this.searchForm = document.querySelector('.js-search-form');
    this.imageList = document.querySelector('.js-card-list');
    this.loadMoreBtn = document.querySelector(
      'button[data-action="load-more"]',
    );
    this.spinner = document.querySelector('.spinner');
  }

  /**
   * Method for create DOM element and return it
   */
  createElem(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(...className);

    return element;
  }

  /**
   * Method for creates all elements and return them.
   * appRoot contains all the elements
   */
  createDomElements() {
    const appRoot = this.createElem('div', ['app', 'js-app']);

    const form = this.createElem('form', ['search-form', 'js-search-form']);

    const inputMarkup = this.createElem('input', ['search-form__input']);

    inputMarkup.type = 'text';
    inputMarkup.name = 'query';
    inputMarkup.autocomplete = 'off';
    inputMarkup.placeholder = 'Search images...';

    form.append(inputMarkup);

    const list = this.createElem('ul', ['card-list', 'js-card-list']);

    const button = this.createElem('button', ['btn', 'is-hidden']);
    button.dataset.action = 'load-more';
    button.textContent = 'load more';

    const spin = this.createSpinnerElement();

    appRoot.append(form, list, button, spin);

    return appRoot;
  }

  /**
   * Method create Spinner and return it
   */
  createSpinnerElement() {
    const spinnerElement = this.createElem('div', [
      'spinner',
      'js-spinner',
      'is-hidden',
    ]);

    const firstSpinnerELement = this.createElem('div', ['loader', 'first']);
    const secondSpinnerELement = this.createElem('div', ['loader', 'second']);
    const thirdSpinnerELement = this.createElem('div', ['loader', 'third']);

    spinnerElement.append(
      firstSpinnerELement,
      secondSpinnerELement,
      thirdSpinnerELement,
    );

    return spinnerElement;
  }

  /**
   * Method for handler form submit
   */
  handlerSubmit(event) {
    event.preventDefault();

    this.input = event.currentTarget.elements.query;

    if (this.input.value === '') {
      PNotify.error({
        text:
          'No results were found for your request. Please enter valid data!',
        ...this.pnotifySettings(),
        width: '260px',
        minHeight: '120px',
      });

      return;
    }

    this.clearImageListItems();
    imagesService.resetPage();

    imagesService.searchQuery = this.input.value;

    this.getListCardImages();

    this.input.value = '';
  }

  /**
   * Method for settings Pnotify plugin
   */
  pnotifySettings() {
    return {
      styling: 'material',
      icons: 'material',
      icon: true,
      width: '155px',
      addClass: 'pad-top',
      delay: 2000,
    };
  }

  /**
   * Method for getting a list card images using the imagesService
   */
  getListCardImages() {
    spinner.show(this.spinner);

    imagesService
      .axiosImages()
      .then(data => {
        if (data.hits.length) {
          spinner.hide(this.spinner);

          this.addedListItems(data.hits);

          PNotify.success({
            text: 'Successful request!',
            ...this.pnotifySettings(),
          });

          window.scrollTo({
            top: this.loadMoreBtn.offsetTop,
            behavior: 'smooth',
          });
        } else {
          spinner.hide(this.spinner);

          PNotify.error({
            text:
              'No results were found for your request. Please enter valid data!',
            ...this.pnotifySettings(),
            width: '260px',
            minHeight: '120px',
          });
        }
      })
      .catch(console.error);
  }

  /**
   * Method for created card items and returned them
   */
  createPhotoCardItems(items) {
    return items.map(item => photoCardItemsTemplate(item));
  }

  /**
   * Method for added to list card image
   */
  addedListItems(item) {
    if (
      !this.imageList.children.length &&
      this.loadMoreBtn.classList.contains('is-hidden')
    ) {
      this.loadMoreBtn.classList.remove('is-hidden');
    }

    this.proxyElement.innerHTML = this.createPhotoCardItems(item);

    this.items = this.proxyElement.querySelectorAll('.card-list__item');

    this.imageList.append(...this.items);
  }

  /**
   * Method for handler button click
   */
  loadMoreButtonHadlerCLick() {
    this.getListCardImages();
  }

  /**
   * Method for clearing list with cards
   */
  clearImageListItems() {
    this.imageList.innerHTML = '';
  }
}

new searchImageApp();
