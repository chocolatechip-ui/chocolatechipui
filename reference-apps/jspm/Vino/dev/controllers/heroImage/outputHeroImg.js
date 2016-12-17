export function outputHeroImg() {
  
  /**
   * Define method to randomize hero images:
   */
  const randomizeImage = function() {
    return Math.floor(Math.random()*69) + 1;
  };
  let randomImg = randomizeImage();
  /**
   * Set random image on page:
   */
  let imagePath = "./images/barrels/img-";
  if (window.innerWidth > 767) imagePath = "./images/barrels-ipad/img-";
  $('.hero').css('background-image', 'url(' + imagePath + randomImg + '.jpg)');
}