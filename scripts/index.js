import i18nObj from './translate.js';
import valParams from './valParams.js';
import FormValidator from './FormValidator.js';

window.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.header__menu');
  const itemMenu = document.querySelectorAll('.header__item');
  const portfolioBtns = document.querySelectorAll('.portfolio__btn');
  const portfilioImages = document.querySelectorAll('.portfolio__photo');
  const langSwitcher = document.querySelectorAll('.header__item-lang');
  let lang = 'en';
  const btns = document.querySelectorAll('.btn');
  const hireBtn = document.querySelector('.hero__btn');
  const orderBtn = document.querySelectorAll('.card__btn');
  const formElementContact = document.querySelector('.form');
  const formBtn = formElementContact.querySelector('.form__btn');
  const emailInput = formElementContact.querySelector('.form__input_type_email');
  const phoneInput = formElementContact.querySelector('.form__input_type_phone');
  const textInput = formElementContact.querySelector('.form__input_type_text');

  const formValidator = new FormValidator (valParams, formElementContact);
  formValidator.enableValidation();

  /**меню мобильной версии*/
  function menuShow() {
    mobileMenuBtn.addEventListener('click', () => {
      menu.classList.toggle('header__menu_active');
      mobileMenuBtn.classList.toggle('mobile-menu-btn_active');
    });
  }
  function menuClose() {
    menu.classList.remove('header__menu_active');
    mobileMenuBtn.classList.remove('mobile-menu-btn_active');
  }
  itemMenu.forEach(item => {
    item.addEventListener('click', menuClose);
  });

  /**портфолио*/
  function changeImages(){
    portfolioBtns.forEach(item => {
      item.addEventListener('click', (event) => {
        portfolioBtns.forEach(i => i.classList.remove('portfolio__btn_active'));
        event.target.classList.add('portfolio__btn_active');

        const btnSeason = event.target.getAttribute('data-btn-season');
        portfilioImages.forEach((item, index) => item.src = `./images/${btnSeason}/${index + 1}.jpg`);
      });
    });
  }

  /**перевод страницы*/
  function getTranslate(lang) {
    let texts = document.querySelectorAll('[data-i18n]');
    texts.forEach(item => {
      let data = item.getAttribute('data-i18n');
      item.textContent = i18nObj[lang][data];
    });
  }
  function setLocalStorage() {
    localStorage.setItem('header__item-lang', lang);
  }
  function getLocalStorage() {
    if(localStorage.getItem('header__item-lang')) {
      const lang = localStorage.getItem('header__item-lang');
      getTranslate(lang);
    }
  }
  langSwitcher.forEach(item => {
    item.addEventListener('click', event => {
      langSwitcher.forEach(i => i.classList.remove('header__item-lang_active'));
      event.target.classList.add('header__item-lang_active');

      lang = event.target.getAttribute('data-lang');

      setLocalStorage();
      getTranslate(lang);
    });
  });

  /**отправить данные формы*/
  function handleSendForm(evt) {
    evt.preventDefault();
    emailInput.value = '';
    phoneInput.value = '';
    textInput.value = '';
  }

  /**анимация кнопок*/
  function animationBtn(parent){
    let pulse = document.createElement('span');
    pulse.classList.add('pulse');
    parent.append(pulse);

    pulse.addEventListener('animationend', (event) => event.target.remove());
  }
  btns.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      animationBtn(target);
    });
  })

  orderBtn.forEach(item => {
    item.addEventListener('click', () => {
      location.href = '#contacts';
    });
  })

  menuShow();
  changeImages();

  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  hireBtn.addEventListener('click', () => {
    location.href = '#contacts';
  })

  formBtn.addEventListener('click', handleSendForm);
});
