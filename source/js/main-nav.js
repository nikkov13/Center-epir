"use strict";

$(document).ready(function() {

  const closeMenu = function(toggle, menu) {
    toggle.removeClass(`main-nav__toggle--open`);
    if (!toggle.hasClass(`main-nav__toggle--close`)) {
      toggle.addClass(`main-nav__toggle--close`);
    }

    menu.removeClass(`main-nav__list--open`);
    if (!menu.hasClass(`main-nav__list--close`)) {
      menu.addClass(`main-nav__list--close`);
    }
    if (!menu.hasClass(`visually-hidden`)) {
      menu.addClass(`visually-hidden`);
    }
  }

  const openMenu = function(toggle, menu) {
    toggle.removeClass(`main-nav__toggle--close`);
    if (!toggle.hasClass(`main-nav__toggle--open`)) {
      toggle.addClass(`main-nav__toggle--open`);
    }

    menu.removeClass(`main-nav__list--close`).removeClass(`visually-hidden`);
    if (!menu.hasClass(`main-nav__list--open`)) {
      menu.addClass(`main-nav__list--open`);
    }
  }

  let $window = $(window),
      windowWidth = $window.width(),
      $toggle = $(`.main-nav__toggle`),
      $menu = $(`.main-nav__list`);

  if ($window.width() > 768) {
    $menu.removeClass(`visually-hidden`).removeClass(`main-nav__list--close`);
  }

  $window.resize(function() {
    if ($window.width() != windowWidth) {
      if ($window.width() <= 768) {
        closeMenu($toggle, $menu);
      } else {
        $toggle.removeClass(`main-nav__toggle--close`).removeClass(`main-nav__toggle--open`);
        $menu.removeClass(`visually-hidden`).removeClass(`main-nav__list--open`).removeClass(`main-nav__list--close`);
      }
      windowWidth = $window.width();
    }
  });
  
  //Плавные переходы по якорям
  $(`.main-nav`).on(`click`, `.main-nav__link`, function(evt) {
    evt.preventDefault();

    let id = $(this).attr(`href`),
        top = $(id).offset().top - 150;

    if ($window.width() < 1150) {
      top += 75;
    }

    $(`.page, html`).animate({scrollTop: top}, 800);

    if (!$(this).hasClass(`main-nav__link-logo`) && $window.width() <= 768) {
      closeMenu($toggle, $menu);
    }
  });

  $toggle.on(`click`, function(evt) {
    evt.preventDefault();
    
    if ($(this).hasClass(`main-nav__toggle--close`)) {
      openMenu($(this), $menu);
    } else {
      closeMenu($(this), $menu);
    }
  });
});