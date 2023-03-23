import i18nObj from './translate.js';

window.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.header__menu');
  const itemMenu = document.querySelectorAll('.header__item');
  const langSwitcher = document.querySelectorAll('.header__item-lang');
  let lang = 'en';

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

  /**перевести страницу*/
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









  menuShow();
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  itemMenu.forEach(item => {
    item.addEventListener('click', menuClose);
  });

});

