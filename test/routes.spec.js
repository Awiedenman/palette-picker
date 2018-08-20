process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('api routes', () => {

  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  })

  describe('GET api/v1/projects', () => {
    it('should return all projects', done => {
      chai.request(server)
        .get('/api/v1/projects')
        .end(function (err, response) {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.have.property('project_name');
          response.body[0].should.have.property('id');

          done();
        });
    })
  })
      describe('GET api/v1/palettes/:id', () => {
        it('should return a single palette', done => {
          chai.request(server)
            .get('/api/v1/palettes/1')
            .end(function (err, response) {
              response.should.have.status(200);
              response.should.be.json;
              response.body[0].should.have.property('palette_id');
              response.body[0].palette_id.should.equal(1);
              response.body[0].should.have.property('palette_name');
              response.body[0].palette_name.should.equal('garbage man');
              response.body.should.be.a('array');
    
              done();
            });
        })


    it.skip('should return an error if id doesn\'t exist', done => {
      chai.request(server)
        .get('/api/v1/palletes/2')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find palettes with id of 8');
          done();
        })
    })
  })
  
  describe.only('GET api/v1/projects/:project_name', () => {
  it('should return a single project', done => {
    chai.request(server)
      .get('/api/v1/projects/dirt')
      .end(function (err, response) {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('project_name');
        
        done();
      });
    })
    
    it('should return an error if project_name doesn\'t exist', done => {
      chai.request(server)
      .get('/api/v1/palletes/dracula')
      .end((error, response) => {
        response.should.have.status(404);
        // response.error.text.should.equal('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /api/v1/palletes/dracula</pre>\n</body>\n</html>\n')
        // response.should.be.json;
        // response.body.should.have.property('error');
        // response.body.error.should.equal('Could not find projects with name of dracula');
        done();
      })
    })
  })
  
  describe('DELETE api/v1/palettes/:palette_id', () => {
    it('should delete a single palette', done => {
      chai.request(server)
      .delete('/api/v1/palettes/1')
      .end(function (err, response) {
        response.should.have.status(202);
        // response.should.be.json;
        // response.body[0].should.have.property('palette_id');
        // response.body[0].should.have.property('project_name');
        done();
      });
    })
  })
  
  describe('POST /api/v1/projects/', () => {
    it('should post a single project', done => {
      chai.request(server)
      .post('/api/v1/projects/')
      .send({
        project_name: 'dirt'
      })
      .then(res => {
        console.log(res.body);
        res.should.have.status(201)
        // res.should.equal({id: 2})
        done()
      })
    })
  })
  
  describe('POST /api/v1/palettes/', () => {
    it('should post a single palette', done => {
      chai.request(server)
      .post('/api/v1/palettes/')
      .send({
        palette_name: 'garbage man',
        color_1: '#000000',
        color_2: '111111',
        color_3: '#333333',
        color_4: '#444444',
        color_5: '#555555',
        project_id: 1
      })
      .end(function (err, response) {
        response.should.have.status(201);
        response.should.be.json;
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('palette_name');
        
        done();
      });
    })
  })
})