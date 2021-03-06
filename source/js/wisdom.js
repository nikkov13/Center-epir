"use strict";

$(document).ready(function() {
  let $quotes = $(`.wisdom>.wisdom__quote`),
      quoteNumber = $quotes.length - 1;

  const nextQuote = function() {
    let prev = $quotes.eq(quoteNumber);
    if (!prev.hasClass(`visually-hidden`)) {
      prev.removeClass(`wisdom__quote--active`).addClass(`wisdom__quote--hide`);
      setTimeout(() => {prev.addClass(`visually-hidden`).removeClass(`wisdom__quote--hide`)}, 1500);
    }
    if (quoteNumber === $quotes.length - 1) {
      quoteNumber = 0;
    } else {
      quoteNumber++;
    }
    let current = $quotes.eq(quoteNumber);
    setTimeout(() => {
      current.removeClass(`visually-hidden`).addClass(`wisdom__quote--active`)
    }, 1500);
  }

  nextQuote();
  setInterval(nextQuote, 10000);
});