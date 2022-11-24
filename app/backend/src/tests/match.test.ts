import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import { allMatches } from './mock/matchMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9LCJpYXQiOjE2NjkyNTE1ODQsImV4cCI6MTY3MTg0MzU4NH0.w9GjuEueq0sUdlInNWtlsn0xWWYM50P8XGAeV34kYug';

describe('Testes de integração de Match', function () {
  it('Será validado que é possível listar todas as partidas', async function () {
    const res = await chai
      .request(app)
      .get('/matches')

    expect(res.status).to.be.equal(200);
  });
  it('Será validado que é possível listar dados de uma partida finalizada', async function () {
    const res = await chai
      .request(app)
      .get('/matches?inProgress=false')

    expect(res.status).to.be.equal(200);
  });
  it('Será validado que é possível listar dados de uma partida em andamento', async function () {
    const res = await chai
      .request(app)
      .get('/matches?inProgress=true')

    expect(res.status).to.be.equal(200);
  });
  it('Será validado que é possível criar uma partida', async function () {
    const res = await chai
      .request(app)
      .post('/matches')
      .set({ "Authorization": token })
      .send({
        "homeTeam": 16,
        "awayTeam": 8, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    expect(res.status).to.be.equal(201);
  });
  it('Será validado que é possível finalizar uma partida', async function () {
    const res = await chai
      .request(app)
      .patch('/matches/1/finish')

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({ message: 'Finished' });
  });
  it('Será validado que não é possível inserir uma partida com times iguais', async function () {
    const res = await chai
      .request(app)
      .post('/matches')
      .set({ "Authorization": token })
      .send({
        "homeTeam": 16,
        "awayTeam": 16, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    expect(res.status).to.be.equal(422);
  });
  it('Será validado que não é possível inserir uma partida com um time que não existe na tabela teams', async function () {
    const res = await chai
      .request(app)
      .post('/matches')
      .set({ "Authorization": token })
      .send({
        "homeTeam": 666,
        "awayTeam": 666, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    expect(res.status).to.be.equal(404);
  });
  it('Será validado que não é possível inserir uma partida sem um token válido', async function () {
    const res = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 15,
        "awayTeam": 14, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    expect(res.status).to.be.equal(401);
  });
});
  