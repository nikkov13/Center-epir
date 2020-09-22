ymaps.ready(init);

let myMap;

function init() {
  let myMap = new ymaps.Map("map", {
    center: [55.733295, 37.620941],
    controls: [],
    zoom: 15
  });
  
  $(".js-tab-slider__tab").on("click", () => {
    myMap.container.fitToViewport();
  });

  myPlacemark = new ymaps.Placemark([55.733295, 37.620941], {
    hintContent: "Центр ЭПИР"
  });

  myMap.geoObjects
    .add(myPlacemark);

  if (window.matchMedia("(max-width: 768px)").matches) {
    myMap.behaviors.disable("multiTouch");
    myMap.behaviors.disable("drag");
    myMap.behaviors.disable("scrollZoom");
  }
}