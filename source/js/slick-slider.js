"use strict";

$(document).ready(function() {
  $(`.js-slick`).slick({
    dots: true,
    infinite: true,
    slidesToScroll: 3,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
          centerMode: true,
        }
      }
    ]
  });
});