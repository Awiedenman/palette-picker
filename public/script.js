

class Palette {
  constructor() { 
    this.colors = [
      {color: null, locked: false},
      {color: null, locked: false},
      {color: null, locked: false},
      {color: null, locked: false},
      {color: null, locked: false}
    ]
  }  
  
  newColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
    // console.log($)
  } 
  
  populateColors() {
    this.colors.forEach(colorSwatch => {
      if (!colorSwatch.locked){
        colorSwatch.color = this.newColor()
      }
    })
  }
  
  colorLock() {
    this.colors[id].locked = !this.colors[id].locked;
  };
}

let palette = new Palette(); 
$(".palette-generate-button").on("click", createPalette);
$('.locked-btn').on('click', palette.toggleLock)

createPalette();

function createPalette() {
  palette.populateColors()
  assignRandomColors()
}

function assignRandomColors(e) {
    const paletteColors = palette.colors;
    for (let i = 0; i < 5; i++) {
      $(`.hex-${i}`).text(paletteColors[i].color);
      // console.log(paletteColor);
      $(`.palette-color-${i}`).css('backgroundColor', `${paletteColors[i].color}`);
    }
  }

function toggleLock(e) {

}