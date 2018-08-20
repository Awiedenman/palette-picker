const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// specified by environment or 3000 by default
//configure express app and bodyparser
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Palette Picker');
});

//define endpoint for getting projects by project name
app.get('/api/v1/projects/:project_name', (request, response) => {
  //selects projects where the project name matches
  database('projects').where('project_name', request.params.project_name).select()
    .then(projects => {
      if (projects.length) {
        //when the project name exists, respond with status code and an array of results
        return response.status(200).json(projects);
      } else {
        //when no results exist, throw a 404 error
        return response.status(404).json({
          error: `Could not find projects with name ${request.params.project_name}`
        });
      }
    })
    //handles server error
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

//define endpoint for getting palettes by project id
app.get('/api/v1/palettes/:project_id', (request, response) => {
  // select palettes that have matching project_id values
  database('palettes').where('project_id', request.params.project_id).select()
    .then(palettes => {
      if (palettes.length) {
        //when results exist, respond with 200 status and the array of results
        response.status(200).json(palettes);
      } else {
        //when no results exist, respond with 404 error code and message
        response.status(404).json({
          error: `Could not find palettes with id of ${request.params.project_id}`
        });
      }
    })
    // handle server error
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

//define endpoint for getting all projects
app.get('/api/v1/projects/', (request, response) => {
  //select all projects from the endpoint
  database('projects').select()
    .then((projects) => {
      //responds with a response code and an array of objects
      response.status(200).json(projects);
    })
    // handles server error
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

//define endpoint for getting all palettes
app.get('/api/v1/palettes/', (request, response) => {
  //select all the palettes from DB
  database('palettes').select()
    .then((palettes) => {
      //respond with response code
      response.status(200).json(palettes);
    })
    //handles server error
    .catch((error) => {
      response.status(500).json({
        error
      });
    });
});

//define endpoint for posting to projects
app.post('/api/v1/projects/', (request, response) => {
  //assign request body to project
  const project = request.body;
  //define required parameters and check
  for (let requiredParameter of ['project_name']) {
    //respond with error if request params are missing
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: {project_name: <STRING>} You're missing a "${requiredParameter}" property.`
        });
    }
  }
  //add project to DB and generate id
  database('projects').insert(project, 'id')
    .then(project => {
      return response.status(201).json({
        id: project[0]
      });
    })
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

//define endpoint for posting to palettes
app.post('/api/v1/palettes/', (request, response) => {
  //assign request body to palettes
  const palette = request.body;
  //define required parameters and check
  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) {
    //respond with error if request params are missing
    if (!palette[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { project_name: <STRING>} You're missing a "${requiredParameter}" property.`
        });
    }
  }
  //create palettes in DB and create id
  database('palettes').insert(palette, 'palette_id')
    .then(palette => {
      response.status(201).json(palette[0]);
    })
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

//define endpoint for deleting palettes by id
app.delete('/api/v1/palettes/:palette_id', (request, response) => {
  // assign the dynamic id provided by the request path to a variable
  const {
    palette_id
  } = request.params;
  // delete item from palette table with matching id
  database('palettes').where('palette_id', palette_id).del()
    // confirm success of deletion with status code
    .then(response.sendStatus(202))
    // respond with error if there is no match
    .catch(error => response.status(404).json({
      error
    }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;