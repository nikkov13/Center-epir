"use strict";

$(document).ready(function() {

  const hideSlide = function(slide) {
    if (slide.hasClass(`direction--active`)) {
      slide.removeClass(`direction--active`);
    }
    if (!slide.hasClass(`visually-hidden`)) {
      slide.addClass(`visually-hidden`);
    }
  }

  const showSlide = function(slide) {
    if (!slide.hasClass(`direction--active`)) {
      slide.addClass(`direction--active`);
    }
    if (slide.hasClass(`visually-hidden`)) {
      slide.removeClass(`visually-hidden`);
    }
  }

  const deactivateTab = function(tab) {
    if (tab.hasClass(`projects__tab--active`)) {
      tab.removeClass(`projects__tab--active`);
    }
  }

  const activateTab = function(tab) {
    if (!tab.hasClass(`projects__tab--active`)) {
      tab.addClass(`projects__tab--active`);
    }
  }

  let $window = $(window),
      $tabs = $(`.js-tab-slider__controls .js-tab-slider__tab`),
      $sliderList = $(`.js-tab-slider__list`),
      $slides = $(`.js-tab-slider__list .js-tab-slider__slide`);

  if ($window.width() > 768) {
    $sliderList.removeClass(`visually-hidden`);
    $tabs.eq(0).addClass(`projects__tab--active`);
    $slides.eq(0).addClass(`direction--active`);
  }

  $window.resize(function() {
    if ($window.width() > 768) {

      let $replacedSlides = $(`.js-tab-slider__controls .js-tab-slider__slide`);

      $replacedSlides.each(function() {
        hideSlide($(this));
        let dataAttr = $(this).data(`direction`);
        $(this).appendTo($(`.js-tab-slider__list .js-tab-slider__slide-container[data-direction="${dataAttr}"]`));
      });

      $tabs.each(function() {
        deactivateTab($(this));
      });

      $sliderList.removeClass(`visually-hidden`);
      $tabs.eq(0).addClass(`projects__tab--active`);
      $slides.eq(0).addClass(`direction--active`).removeClass(`visually-hidden`);
    } else {
      $slides.each(function() {
        hideSlide($(this));
      });

      $tabs.each(function() {
        deactivateTab($(this));
      });

      $sliderList.addClass(`visually-hidden`);
    }
  });

  $(`.js-tab-slider__controls`).on(`click`, `.js-tab-slider__tab`, function(evt) {
    evt.preventDefault();
    let dataAttr = $(this).data(`direction`),
        $thisSlide = $(`.js-tab-slider .js-tab-slider__slide[data-direction="${dataAttr}"]`),
        $thisSlideAfter = $(`.js-tab-slider__controls .js-tab-slider__slide[data-direction="${dataAttr}"]`),
        $thisSlideContainer = $(`.js-tab-slider__slide-container[data-direction="${dataAttr}"]`);
    
    if ($window.width() > 768) {
      //desktop & tablets

      $tabs.each(function() {
        deactivateTab($(this));
      });
      activateTab($(this));

      $slides.each(function() {
        hideSlide($(this));
      });
      showSlide($thisSlide);
    } else {
      //mobile
      
      activateTab($(this));

      if (!$(`.js-tab-slider .js-tab-slider__slide[data-direction="${dataAttr}"]`).hasClass(`direction--active`)) {

        // При открытии новой вкладки закрываем все уже открытые
        //
        // $slides.each(function() {
        //   if (!$(this).hasClass(`visually-hidden`)) {
        //     $(this).addClass(`visually-hidden`);
        //   }
        //   $(this).removeClass(`direction--active`);
        // });

        showSlide($thisSlide);
        $(this).after($thisSlide);
      } else {
        $thisSlideContainer.append($(`.js-tab-slider__controls .js-tab-slider__slide[data-direction="${dataAttr}"]`));
        hideSlide($thisSlide);
        deactivateTab($(this));
      }
    }
  });
});