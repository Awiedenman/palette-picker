const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Palette Picker');
});

app.get('/api/v1/projects/:project_name', (request, response) => {
  database('projects').where('project_name', request.params.project_name).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({
          error: `Could not find projects with name ${request.params.project_name}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        error
      })
    })
})

app.get('/api/v1/palettes/:project_id', (request, response) => {
  database('palettes').where('project_id', request.params.project_id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({
          error: `Could not find palettes with id of ${request.params.project_id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        error
      })
    })
})

app.get('/api/v1/projects/', (request, response) => {
  database('projects').select()
  .then((projects) => {
    response.status(200).json(projects);
  })
  .catch((error)=> {
    response.status(500).json({error})
  })
})

app.get('/api/v1/palettes/', (request, response) => {
  database('palettes').select()
  .then((palettes) => {
    response.status(200).json(palettes);
  })
  .catch((error) => {
    response.status(500).json({error})
  })
})

app.post('/api/v1/projects/', (request, response) => {
  const project = request.body;
  
  for (let requiredParameter of ['project_name']){
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({error: `Expected format: {project_name: <STRING>} You're missing a "${requiredParameter}" property.`});
    }
  }

database('projects').insert(project, 'id')
  .then(project => {
    response.status(201).json({ id: project[0]})
  })
  .catch(error => {
    response.status(500).json({error});
  })
});

  app.post('/api/v1/palettes/', (request, response) => {
  const palette = request.body;
  
  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) {
    if (!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { project_name: <STRING>} You're missing a "${requiredParameter}" property.`})
    }
  }
  
    database('palettes').insert(palette, 'palette_id')
      .then(palette=> {
    response.status(201).json(palette[0])})
    .catch(error=> {
      response.status(500).json({error});
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});