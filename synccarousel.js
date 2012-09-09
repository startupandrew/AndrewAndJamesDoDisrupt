/**
 * Takes a user ID and a div and places a carousel of images in it.
 * @param userid
 * @constructor
 */

var allSlides = [];

displayCarousel = function(userdata, carousel, slideholder) {

  //set up the carousel
  carousel.carousel({
    interval: false
  });

  var slides = userdata.child("slides");
  slides.on("child_added", function(urlSnap) {
    var imgURL = urlSnap.val();
    var newSlide = new DrawableSlide(userdata, imgURL, allSlides.length);
    slideholder.append(newSlide.slide);
    allSlides.push(newSlide);
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

DrawableSlide = function(userdata, url, slideNum) {
  var newSlide = $("<div class='item' style='width: 100%; height: 100%;'></div>");
  var cont = $("<div style='position: relative; height: " + $(document).height() + "px; width: 100%;'></div>")
  cont.append("<img src='" + url + "' style='position: absolute; left: 0; top: 0; width: 100%; height: 100%;'>");
  var canv = $("<canvas style='position: absolute; left: 0; top: 0; width: 100%; height: 100%;' width=720 height=540></canvas>");
  cont.append(canv);

  var c=canv.get(0);
  var ctx=c.getContext("2d");
  ctx.strokeStyle="#FF0000";
  ctx.lineWidth = 5;

  userdata.child("drawings").child(slideNum).on("child_added", function(snap) {
    var line = snap.val();

    ctx.moveTo(line.o.x,line.o.y);
    ctx.lineTo(line.n.x,line.n.y);
    ctx.stroke();
  });

  newSlide.append(cont);
  this.slide = newSlide;
}

