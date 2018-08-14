// class Colors {
//   constructor() { 
//     colors: {
//       color1,
//       color2,
//       color3
//     }
//   }
  
$(".palette-generate-button").on("click", randomColors);

randomColors();

function newColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
} 

function toggleLock() {
}

function randomColors(e) {
  for (let i = 0; i < 5; i++) {
    var paletteColor = newColor();
    $(`.hex-${i}`).text(paletteColor);
    // console.log(paletteColor);
    $(`.palette-color-${i}`).css('backgroundColor', `${paletteColor}`);
  }
}