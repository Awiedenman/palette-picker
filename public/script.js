var generateBtn = document.querySelector(".palette-generate-button")
generateBtn.addEventListener("click", randomColor);

randomColor();

function randomColor(e) {
  // e.preventDefault();
  console.log('click')
  for (let i = 0; i < 6; i++) {
    var color = document.querySelector(`.palette-color${i}`);
    console.log(color);
    var hex = document.querySelector(`.hex-${i}`);
  }
}