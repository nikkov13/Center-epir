"use strict";

$(document).ready(function() {
  $(".main-nav").on("click", ".main-nav__link", function(evt) {
    evt.preventDefault();
    let id = $(this).attr("href"),
        top = $(id).offset().top - 150;
    $(".page, html").animate({scrollTop: top}, 800);
  });
});