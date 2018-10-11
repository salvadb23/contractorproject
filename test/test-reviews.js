const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Champion = require('../models/champion')
const sampleChampion = {
  'Champion': 'Ashe',
  'Passive': 'H',
  'Ability1': 'd',
  'Ability2': 'd',
  'Ability3': 'd',
  'Ultimate': 'd',
}


chai.use(chaiHttp);

describe('Champions', ()  => {

  // TEST INDEX
  it('should index ALL champions on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
    it('should display new form on /champions/new GET', (done) => {
    chai.request(server)
      .get(`/champions/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });
  // TEST CREATE
  it('should create a SINGLE champion on /reviews POST', (done) => {
    chai.request(server)
        .post('/champions')
        .send(sampleChampion)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });
  // TEST SHOW
    it('should show a SINGLE review on /champions/<id> GET', (done) => {
    var champion = new Champion(sampleChampion);
    champion.save((err, data) => {
      chai.request(server)
        .get(`/champions/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });
  // TEST EDIT
  it('should edit a SINGLE champion on /champions/<id>/edit GET', (done) => {
  var champion = new Champion(sampleChampion);
  champion.save((err, data) => {
   chai.request(server)
     .get(`/champions/${data._id}/edit`)
     .end((err, res) => {
       res.should.have.status(200);
       res.should.be.html
       done();
     });
 });
});
  // TEST UPDATE
  it('should update a SINGLE champion on /reviews/<id> PUT', (done) => {
    var champion = new Champion(sampleChampion);
    champion.save((err, data)  => {
     chai.request(server)
      .put(`/champions/${data._id}?_method=PUT`)
      .send({'Champion': 'Updating the name'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
  // TEST DELETE
  it('should delete a SINGLE champion on /champions/<id> DELETE', (done) => {
    var champion = new Champion(sampleChampion);
    champion.save((err, data)  => {
     chai.request(server)
      .delete(`/champions/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });
});
