/**
 * Takes a user ID and a div and places a carousel of images in it.
 * @param userid
 * @constructor
 */

displayCarousel = function(userdata, theDiv) {
  $("imageshere").hide();
  $(".carousel").show();
  var self = this;
  var slides = userdata.child("slides");
  slides.on("child_added", function(urlSnap) {
    var imgURL = urlSnap.val();
    $("#ccc").append("<div class='item'><img src='" + imgURL + "' style='width: 300px; height: 250px;'></div>");
    $("#myCarousel").carousel("next");
  })
}