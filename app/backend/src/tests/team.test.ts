import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { admin } from './mock/userMock';

import App from '../app';

import { Response } from 'superagent';
import { allTeams, teamById } from './mock/teamMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de integração de Team', function () {
  it('Será validado que é possível listar todos os times', async function () {
    const res = await chai
      .request(app)
      .get('/teams')

    expect(res.status).to.be.equal(200);
    expect(res.body).to.equal(allTeams);
  });

  it('Será validado que é possível listar dados de um time específico', async function () {
    const res = await chai
      .request(app)
      .get('/teams/5')

    expect(res.status).to.be.equal(200);
    expect(res.body).to.equal(teamById);
  });
});
  