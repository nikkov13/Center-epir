"use strict";

$(document).ready(function() {
  let $window = $(window),
      $toggle = $(`.main-nav__toggle`),
      $menu = $(`.main-nav__list`);

  if ($window.width() > 768) {
    $menu.removeClass(`visually-hidden`).removeClass(`main-nav__list--close`);
  }

  $window.resize(function() {
    if ($window.width() <= 768) {
      if (!$menu.hasClass(`main-nav__list--close`)) {
        $menu.addClass(`main-nav__list--close`);
      }
      if (!$menu.hasClass(`visually-hidden`)) {
        $menu.addClass(`visually-hidden`);
      }
    } else {
      $menu.removeClass(`visually-hidden`).removeClass(`main-nav__list--open`).removeClass(`main-nav__list--close`);
    }
  });

  $toggle.on(`click`, function(evt) {
    evt.preventDefault();
    if ($menu.hasClass(`main-nav__list--close`)) {
      $menu.removeClass(`main-nav__list--close`).addClass(`main-nav__list--open`).removeClass(`visually-hidden`);
    } else {
      $menu.removeClass(`main-nav__list--open`).addClass(`main-nav__list--close`).addClass(`visually-hidden`);
    }
  })
});