"use strict";

$(document).ready(function() {
  let $window = $(window),
      $carousel = $(`.js-carousel`),
      carouselWidth = $carousel.width(),
      $carouselList = $(`.js-carousel__list`),
      $carouselItems = $(`.js-carousel__item`),
      carouselListWidth = $carouselItems.length * 260 + ($carouselItems.length - 1) * 30,
      startX = 0,
      carouselX;

  $window.resize(function() {
    carouselWidth = $carousel.width();
    if ($window.width() > 768) {
      $carouselList.css(`left`, 0);
    } else 
    if (parseInt($carouselList.css(`left`)) < carouselWidth - carouselListWidth) {
      $carouselList.css(`left`, carouselWidth - carouselListWidth);
    }
  });

  $carousel.on(`touchstart`, function(evt) {
    let touchObj = evt.changedTouches[0];
    startX = parseInt(touchObj.clientX);
    carouselX = parseInt($carouselList.css(`left`));
  });

  $carousel.on(`touchmove`, function(evt) {
    if ($window.width() <= 768) {
      let touchObj = evt.changedTouches[0],
          dist = (touchObj.clientX) - startX,
          shift = carouselX + dist;
      if (0 <= -shift && -shift <= carouselListWidth - carouselWidth) {
        $carouselList.css(`left`, shift);
      }
    }
  });
});