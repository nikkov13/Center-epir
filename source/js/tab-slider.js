"use strict";

$(document).ready(function() {
  $(`.js-tab-slider__controls`).on(`click`, `.js-tab-slider__tab`, function(evt) {
    evt.preventDefault();
    let dataAttr = $(this).data(`direction`),
        slide = $(`.js-tab-slider__slide[data-direction="${dataAttr}"]`);
    $(`.js-tab-slider__slide`).removeClass(`projects__item--active`).addClass(`visually-hidden`);
    slide.removeClass(`visually-hidden`).addClass(`projects__item--active`);
    $(`.js-tab-slider__tab`).removeClass(`projects__tab--active`);
    $(this).addClass(`projects__tab--active`);
  })
})