import i18nObj from './translate.js';

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

  menuShow();
  changeImages();
  
  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  hireBtn.addEventListener('click', () => {
    location.href = '#contacts';
  })
});

