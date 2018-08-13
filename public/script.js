// window.onload = randomColor();
var generatePaletteBtn = document.querySelector(".palette-generate-button")
  // console.log('button', generatePaletteBtn)
  generatePaletteBtn.addEventListener("click", randomColor);

randomColor();

function newColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
} 

function randomColor(e) {
  // e.preventDefault();
  console.log('click')
  for (let i = 0; i < 5; i++) {
    var paletteColor = newColor();
    document.querySelector(`.hex-${i}`).innerText = paletteColor;
    // console.log('color', `.palette-color${i}`);
    document.querySelector(`.palette-color-${i}`).style.background = paletteColor;
    // console.log();
    // console.log(color);
    // hex.innerText(randomColor);
  }
}