'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../bin/www');//Do not use in chai.request as it stops the tests working


chai.use(chaiHttp);

describe('/GET', ()=>{
	it('returns homepage', (done) => {
		chai.request('http://localhost:3000')
		.get('/')
		.end((err, res) => {
			res.should.have.status(200);
			done();
		});
	});
});

