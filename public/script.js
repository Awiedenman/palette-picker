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
projectRequest();
// paletteRequest();

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

function hexCodes() {
  hexCodeColors = [];
  $('.box h3').each(function(index, box){
    hexCodeColors.push(box.innerText);
  })
  return hexCodeColors
}

function saveColorPalette(e) {
  e.preventDefault();
  const newPaletteName = $(e.target).children('.new-palette-input').val();
  const colors = hexCodes()
  const data = {
    palette_name: newPaletteName,
    color_1: colors[0],
    color_2: colors[1], 
    color_3: colors[2], 
    color_4: colors[3], 
    color_5: colors[4],
    project_id: 1
  }
  postPaletteToDb(data);
  console.log('data', data);
  
  // $('project-container').append(`<div>${newPalette}</div>`)
}

function saveNewProject(e) {
  e.preventDefault();
  let newProject = $(e.target).find('.new-project-input').val();
  $('select').append(`<option value="project1">${newProject}</option>`)
  $('.project-container').append(`<div><h2>${newProject}</h2></div>`)
  $('.new-project-input').val('');
  postProjectToDb(newProject);
  
}

function displayProjects(projectData, paletteData) {
  console.log(projectData);
  const displayProjects = projectData.map(project => {
    console.log('project', project);
    const fetchPalletes = paletteRequestId(project.id)
    console.log(fetchPalletes)
    // $('.project-container').append(`<div><h2>${project.project_name}</h2></div>`);
  })
}

// !function displayPalettesOnPageLoad(projectData, paletteData) {
//   !console.log(paletteData);
//   !const displayPalettes = paletteData.filter(palette => {
//     // $('.project-container').append(`<div><h2>${project.project_name}</h2></div>`);

//  ! })

function projectRequest() {
  const url = `http://localhost:3000/api/v1/projects/`
  return fetch(url)
    .then(response => response.json())
    .then(projectData => paletteRequestId(projectData))
}

// function projectRequestId(id) {
//   const url = `http://localhost:3000/api/v1/projects/${id}`
//   return fetch(url)
//     .then(response => response.json())
//     .then(projectIdData => displayProjects(projectIdData))
// }

function paletteRequestId(projectData) {
  console.log(projectData);
  const projectIds = projectData.map(project => {
    console.log(project.id);
    const url = `http://localhost:3000/api/v1/palettes/${project.id}`
    return fetch(url)
      .then(response => response.json())
      .then(paletteData => console.log('paletteData', paletteData)) 
  })
}

function postProjectToDb(newProject) {
  console.log('name', newProject);
  
  const url = 'http://localhost:3000/api/v1/projects/';
  return fetch(url, {
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
  .catch(function(error) {
    console.log(error.messege)
  });
}

function requestIdFromProject() {

}

