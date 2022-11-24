import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { admin } from './mock/userMock';

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de integração de Leaderboard', function () {
  it('Será validado que é possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados', async function () {
    const res = await chai
      .request(app)
      .get('/leaderboard/home')

    expect(res.status).to.be.equal(200);
  });
});
  