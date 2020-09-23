"use strict";

$(document).ready(function() {
  
  //Плавные переходы по якорям
  $(`.main-nav`).on(`click`, `.main-nav__link`, function(evt) {
    evt.preventDefault();
    let id = $(this).attr(`href`),
        top = $(id).offset().top - 150;
    $(`.page, html`).animate({scrollTop: top}, 800);
  });

  $(document).on(`scroll`, function() {

    //Изменение фона хедера при скролле
    let position = $(this).scrollTop(),
        height = $(`.promo`).height(),
        $nav = $(`.main-nav`),
        $contacts = $(`.page-header__contacts`);
    if (position > height) {
      $nav.addClass(`main-nav--ocher`);
      $contacts.addClass(`page-header__contacts--hidden`);
    } else {
      $nav.removeClass(`main-nav--ocher`);
      $contacts.removeClass(`page-header__contacts--hidden`);
    }

    //парслакс для блока promo
    parallaxScroll($(`.promo__wrapper`));
  })
});

function parallaxScroll(el) {
  let scrolled = $(window).scrollTop();
  el.css(`top`, (0 + (scrolled * 0.5)) + `px`);
}