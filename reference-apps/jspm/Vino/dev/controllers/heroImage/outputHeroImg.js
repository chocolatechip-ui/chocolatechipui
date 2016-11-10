export function outputHeroImg() {
  
  /**
   * Define method to randomize hero images:
   */
  var randomizeImage = function() {
    return Math.floor(Math.random()*69) + 1;
  };
  var randomImg = randomizeImage();
  /**
   * Set random image on page:
   */
  var imagePath = "./images/barrels/img-";
  if (window.innerWidth > 767) imagePath = "./images/barrels-ipad/img-";
  $('.hero').css('background-image', 'url(' + imagePath + randomImg + '.jpg)');
}