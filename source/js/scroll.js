"use strict";

$(document).ready(function() {
  let $window = $(window);

  $(document).on(`scroll`, function() {

    //Изменение фона хедера при скролле
    let position = $(this).scrollTop(),
        promoHeight = $(`.promo`).height(),
        $contacts = $(`.page-header__contacts`),
        $nav = $(`.main-nav`);
    if ($window.width() > 768) {
      if (position > promoHeight) {
        $nav.addClass(`main-nav--ocher`);
        $contacts.addClass(`page-header__contacts--hidden`);
      } else {
        $nav.removeClass(`main-nav--ocher`);
        $contacts.removeClass(`page-header__contacts--hidden`);
      }
    }

    //парслакс для блока promo
    if ($window.width() > 768) {
      parallaxScroll($(`.promo__wrapper`));
    }
  });

  function parallaxScroll(el) {
    let scrolled = $window.scrollTop();
    el.css(`top`, (0 + (scrolled * 0.5)) + `px`);
  }
});
