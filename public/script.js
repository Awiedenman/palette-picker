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
  } 
  
  populateColors() {
    this.colors.forEach(colorSwatch => {
      if (!colorSwatch.locked){
        colorSwatch.color = this.newColor()
      }
    })
  }
  
  colorLock(id) {
    this.colors[id].locked = !this.colors[id].locked;
    // $(`.palette-color-${id}`).style('background-image', 'url("./images/lock.svg")')
    // $(`.palette-color-${id}`).click(function () {
    //   $(`.palette-color-${id}`).css({
    //     'background-image': url("./images/lock.svg"),
    //   });
    // })
  }
}



let palette = new Palette(); 

$(".palette-generate-button").on("click", createPalette);
$('.locked-btn').on('click', toggleLock)
$('.new-palette-form').on('submit', saveColorPalette);
$('.new-project-form').on('submit', saveNewProject);


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
  const id = e.target.id;
  palette.colorLock(id)
}

function saveColorPalette(e) {
  e.preventDefault();
  const newPalette = $(e.target).children('.new-palette-input').val();
  $('project-container').append(`<div>${newPalette}</div>`)
}

function saveNewProject(e) {
  e.preventDefault();
  let newProject = $(e.target).find('.new-project-input').val();
  $('select').append(`<option value="project1">${newProject}</option>`)
  $('.project-container').append(`<div><h2>${newProject}</h2></div>`)
  $('.new-project-input').val('');
}