class Palette {
  constructor() {
    this.colors = [{
      color: null,
      locked: false
    },
    {
      color: null,
      locked: false
    },
    {
      color: null,
      locked: false
    },
    {
      color: null,
      locked: false
    },
    {
      color: null,
      locked: false
    }
    ];
  }

  newColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  populateColors() {
    this.colors.forEach(colorSwatch => {
      if (!colorSwatch.locked) {
        colorSwatch.color = this.newColor();
      }
    });
  }

  colorLock(id) {
    this.colors[id].locked = !this.colors[id].locked;
  }
}

let palette = new Palette();

$('.palette-generate-button').on('click', createPalette);
$('.unlocked-btn').on('click', toggleLock);
$('.new-palette-form').on('submit', saveColorPalette);
$('.new-project-form').on('submit', saveNewProject);
$('.project-container').on('click', '.delete-btn', deletePalette);

createPalette();
projectRequest();

function createPalette() {
  palette.populateColors();
  assignRandomColors();
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
  palette.colorLock(id);
  $(e.target).closest('div').toggleClass('locked unlocked-btn');
}

function hexCodes() {
  let hexCodeColors = [];
  $('.box h3').each(function (index, box) {
    hexCodeColors.push(box.innerText);
  });
  return hexCodeColors;
}

function saveColorPalette(e) {
  e.preventDefault();
  const projectName = $(e.target).children('select').val();
  const newPaletteName = $(e.target).children('.new-palette-input').val();
  const colors = hexCodes();

  projectRequestByName(projectName).then((projectNameData) => {
    const id = projectNameData[0].id;
    const data = {
      palette_name: newPaletteName,
      color_1: colors[0],
      color_2: colors[1],
      color_3: colors[2],
      color_4: colors[3],
      color_5: colors[4],
      project_id: id
    };
    postPaletteToDb(data);
    $(e.target).children('.new-palette-input').val('');
    appendPalettes([data], projectName);
  });
}

function saveNewProject(e) {
  e.preventDefault();
  let newProject = $(e.target).find('.new-project-input').val();
  $('select').append(`<option value=${newProject}>${newProject}</option>`);
  $('.project-container').append(`<div class="saved-palette"><h2>Project Name:${newProject}</h2></div>`);
  $('.new-project-input').val('');
  postProjectToDb(newProject);
}

function displayProjectsOnLoad(projectData) {
  projectData.map(project => {
    paletteRequestId(project.id)
      .then(response => {
        $('.project-container').append(`<div class="saved-project"><h2>Project Name: ${project.project_name}</h2></div>`);
        $('select').append(`<option value=${project.project_name}>${project.project_name}</option>`);
        appendPalettes(response);
      });
  });
}

function deletePalette(e) {
  const id = $(this).closest('.palette-container').attr('id');
  deletePalettesById(id);
  $(this).closest('.palette-container').remove();
}

function appendPalettes(paletteSwatches) {
  //  if (paletteSwatches.length){
  paletteSwatches.forEach(swatch => {
    $('.project-container').append(`
      <div class="palette-container" id="${swatch.palette_id}">
        <div class="saved-palette" title=${swatch.palette_name}>
        <h3>Palette Name: ${swatch.palette_name}</h3> 
          <div class="saved-palette-color color1" style='background-color:${swatch.color_1}'>${swatch.color_1}</div>
          <div class="saved-palette-color color2" style='background-color:${swatch.color_2}'>${swatch.color_2}</div>
          <div class="saved-palette-color color3" style='background-color:${swatch.color_3}'>${swatch.color_3}</div>
          <div class="saved-palette-color color4" style='background-color:${swatch.color_4}'>${swatch.color_4}</div>
          <div class="saved-palette-color color5" style='background-color:${swatch.color_5}'>${swatch.color_5}</div>
          <div class="delete-btn trash-icon"></div>
        </div>
      </div>
    `);
  });
}
// }

function paletteRequestId(projectId) {
  const url = `/api/v1/palettes/${projectId}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function projectRequest() {
  const url = '/api/v1/projects/';
  return fetch(url)
    .then(response => response.json())
    .then(projectData => displayProjectsOnLoad(projectData));
}

// function paletteRequest() {
//   const url = '/api/v1/palettes/'
//   return fetch(url)
//     .then(response => response.json())
//     .then(paletteData => displayProjectsOnLoad(null, paletteData))
// }

function projectRequestByName(projectName) {
  const url = `/api/v1/projects/${projectName}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error =>
      console.log(error.message));
}

function deletePalettesById(id) {
  const url = `/api/v1/palettes/${id}`;
  fetch(url, {
    method: 'DELETE'
  });
}

function postProjectToDb(newProject) {
  console.log('name', newProject);
  const url = '/api/v1/projects/';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      project_name: newProject
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(function (error) {
      console.log(error.messege);
    });
}

function postPaletteToDb(data) {
  const url = '/api/v1/palettes/';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(function (error) {
      console.log(error.messege);
    });
}