/**
 * Takes a user ID and a div and places a carousel of images in it.
 * @param userid
 * @constructor
 */

displayCarousel = function(userdata, carousel, slideholder) {

  //set up the carousel
  carousel.carousel({
    interval: false
  });



  var slides = userdata.child("slides");
  slides.on("child_added", function(urlSnap) {
    var imgURL = urlSnap.val();
    slideholder.append("<div class='item'><img src='" + imgURL + "' style='width: 300px; height: 250px;'></div>");
    carousel.carousel("next");
  });

  var currentSlide = userdata.child("position/slide");
  currentSlide.on("value", function(psnap) {
    var curP = psnap.val();
    if(curP != null) {
      carousel.carousel(curP);
    }
  });
}