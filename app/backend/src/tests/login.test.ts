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

describe('Testes de integração de Login', function () {
  it('Será validado que é possível fazer login com sucesso', async function () {
    const res = await chai
      .request(app)
      .post('/login')
      .send({
        email: admin.validAdmin.email,
        password: admin.validAdmin.password,
      });
    console.log(res.body.token);
    
    expect(res.status).to.be.equal(200);
    const resValidate = await chai
      .request(app)
      .get('/login/validate')
      .set({ "Authorization": `${res.body.token}` })
      

    expect(resValidate.status).to.be.equal(200);
  });

  it('Será validado que não possível fazer login sem um token', async function () {
    const res = await chai
      .request(app)
      .get('/login/validate')

    expect(res.status).to.be.equal(401);
  });
});
  