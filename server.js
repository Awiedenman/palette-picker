const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.send('Palette Picker');
});

app.locals.palettes = [
  {
    projectName: 'RoadKill',
    paletteName: 'Austin loves colors',
    colors: ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff']

  }
]

app.get('/api/v1/palettes/', (request, response) => {
  const palettes = app.locals.palettes

  response.json({palettes})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});