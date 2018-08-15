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

// app.locals.palettes = [
//   { project: {
//       project_name: 'RoadKill',
//       palette:{
//         palette_name: 'Austin loves colors',
//         colors: ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff']
//       }
//     } 
//   }
// ]

app.get('/api/v1/projects/', (request, response) => {
  const palettes = app.locals.palettes

  response.json({palettes})
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  app.locals.palettes.push(project);

  response.status(201).json(project)
  
  // const keys = [
  //   "project_name",
  //   "palette_name",
  //   "colors"
  // ]
  
  // if (!palette) {
  //   return response.status(422).send({
  //     error: 'No palette provided'
  //   });
  // } else {
  //   database('palettes').insert(palette, [...keys, 'id'])
  //   .then(palette=> response.status(201).json(palette[0]))
  //   .catch(error=> response.status(500).json({error}))
  // }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});