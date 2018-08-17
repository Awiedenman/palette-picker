
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          project_name: 'dirt'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([{
            palette_name: 'garbage man',
            color_1: '#000000',
            color_2: '111111',
            color_3: '#333333',
            color_4: '#444444',
            color_5: '#555555',
            project_id: project[0]
          }])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};