"use strict";

$(document).ready(function() {

  $(`.js-services__list .js-services__button`).on(`click`, function(evt) {
    evt.preventDefault();

    let $texts = $(`.js-services__list .js-services__text`),
        dataAttr = $(this).data(`service`),
        $text = $(`.js-services__list .js-services__text[data-service=${dataAttr}]`);

    if ($text.hasClass(`services-card__text--close`)) {
      $texts.each(function() {
        if (!$(this).hasClass(`services-card__text--close`)) {
          $(this).addClass(`services-card__text--close`);
        }
      });
      $text.removeClass(`services-card__text--close`).addClass(`services-card__text--open`);
    } else {
      $text.removeClass(`services-card__text--open`).addClass(`services-card__text--close`);
    }
  });
});