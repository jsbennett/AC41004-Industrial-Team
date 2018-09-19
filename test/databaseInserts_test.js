'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const { expect } = require('chai')
let server = require('../bin/www');//Do not use in chai.request as it stops the tests working


chai.use(chaiHttp);

/* GET field */
describe('/GET add farmData', function(){
	it('returns 1 if the getFarmData API route returns '\got here'\ ', (done) => {
		chai.request('http://localhost:3000')
		.get('/addFarmData')
		.end((err, res) => {
		try{
			res.should.have.status(200);
			res.body.should.be.a('Object');
			console.log(res.body);
			//res.body.should.have.property('field');
			//expect({ res: {} }).to.have.property('FieldID').that.deep.equals(1);
			//res.body.should.have.property('field');
			done();
		}

		catch(e){
				done(e);
		}
			
		});
	});
});