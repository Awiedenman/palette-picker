
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
    this.colors.forEach(colorNum => {
      if (!colorNum.locked){
        colorNum.color = this.newColor()
      }
    })
    // console.log(this.colors)
  }
}



  // toggleLock() {
  //         }
  // }

  let palette = new Palette();
             
  createPalette();
  $(".palette-generate-button").on("click", createPalette);
   
  
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