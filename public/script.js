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
// ==================

let palette = new Palette(); 

$(".palette-generate-button").on("click", createPalette);
$('.locked-btn').on('click', toggleLock)
$('.new-palette-form').on('submit', saveColorPalette);
$('.new-project-form').on('submit', saveNewProject);


createPalette();
projectRequest();

function createPalette() {
  palette.populateColors()
  assignRandomColors()
}

function assignRandomColors(e) {
    const paletteColors = palette.colors;
    for (let i = 0; i < 5; i++) {
      $(`.hex-${i}`).text(paletteColors[i].color);
      $(`.palette-color-${i}`).css('backgroundColor', `${paletteColors[i].color}`);
    }
  }

function toggleLock(e) {
  const id = e.target.id;
  palette.colorLock(id)
}

function hexCodes() {
  hexCodeColors = [];
  $('.box h3').each(function(index, box){
    hexCodeColors.push(box.innerText);
  })
  return hexCodeColors
}

function saveColorPalette(e) {
  e.preventDefault();
  const projectName = $(e.target).children('select').val();
  const newPaletteName = $(e.target).children('.new-palette-input').val();
  const colors = hexCodes()
  
  projectRequestByName(projectName).then((projectNameData) => {
    console.log(projectNameData)
    const id = projectNameData[0].id
    const data = {
      palette_name: newPaletteName,
      color_1: colors[0],
      color_2: colors[1], 
      color_3: colors[2], 
      color_4: colors[3], 
      color_5: colors[4],
      project_id: id
    }
    postPaletteToDb(data);
    $(e.target).children('.new-palette-input').val('');
    appendPalettes([data], projectName)
  })
}

function saveNewProject(e) {
  e.preventDefault();
  let newProject = $(e.target).find('.new-project-input').val();
  $('select').append(`<option value=${newProject}>${newProject}</option>`)
  $('.project-container').append(`<div class="saved-palette"><h2>${newProject}</h2></div>`)
  $('.new-project-input').val('');
  postProjectToDb(newProject);
}

function displayProjectsOnLoad(projectData) {
  console.log('projectData', projectData)
  const paletteSwatches = projectData.map(project => {
    paletteRequestId(project.id)
    .then(response => {
      if (paletteSwatches){
        appendPalettes(response, project.project_name)
      }
    })
  })
}

function appendPalettes(paletteSwatches, project_name) {
  console.log('paletteSwatches', paletteSwatches);
  paletteSwatches.forEach(swatch => {
    $('select').append(`<option value=${project_name}>${project_name}</option>`)
    $('.project-container').append(`
      <div class="saved-palette">
        <h2>${project_name}</h2>
          <div title=${swatch.palette_name}>
            <div class="saved-palette-color color1" style='background-color:${swatch.color_1}'></div>
            <div class="saved-palette-color color2" style='background-color:${swatch.color_2}'></div>
            <div class="saved-palette-color color3" style='background-color:${swatch.color_3}'></div>
            <div class="saved-palette-color color4" style='background-color:${swatch.color_4}'></div>
            <div class="saved-palette-color color5" style='background-color:${swatch.color_5}'></div>
          </div>
      </div>
    `)
  })
}
      
function paletteRequestId(projectId) {
  const url = `http://localhost:3000/api/v1/palettes/${projectId}`
  // console.log('projectId', projectId);
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))
}
  
function projectRequest() {
  const url = 'http://localhost:3000/api/v1/projects/'
  return fetch(url)
    .then(response => response.json())
    .then(projectData => displayProjectsOnLoad(projectData))
}

// function paletteRequest() {
//   const url = 'http://localhost:3000/api/v1/palettes/'
//   return fetch(url)
//     .then(response => response.json())
//     .then(paletteData => displayProjectsOnLoad(null, paletteData))
// }

function projectRequestByName(projectName) {
  const url = `http://localhost:3000/api/v1/projects/${projectName}`
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))     
}

// function projectRequestId(id) {
//   const url = `http://localhost:3000/api/v1/projects/${id}`
//   return fetch(url)
//     .then(response => response.json())
//     .then(projectIdData => displayProjects(projectIdData))
// }

function postProjectToDb(newProject) {
  console.log('name', newProject);
  const url = 'http://localhost:3000/api/v1/projects/';
  fetch(url, {
      method: 'POST',
      body: JSON.stringify({project_name: newProject}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .catch(function (error) {
      console.log(error.messege)
    });
};

function postPaletteToDb(data) {
  const url = 'http://localhost:3000/api/v1/palettes/';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  console.log(response)
  .catch(function(error) {
    console.log(error.messege)
  });
}


