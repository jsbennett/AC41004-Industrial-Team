'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const { expect } = require('chai')
let server = require('../bin/www');//Do not use in chai.request as it stops the tests working


chai.use(chaiHttp);
/*
describe('/GET', ()=>{
	it('returns homepage', (done) => {
		chai.request('http://localhost:3000')
		.get('/')
		.end((err, res) => {
			res.should.have.status(200);
			done();
		});
	});
});*/

describe('/GET farm details', function(){
	it('returns 1 if the farm summary GET call returns populated object', (done) => {
		chai.request('http://localhost:3000')
		.get('/summary/1')
		.end((err, res) => {
		try{
			res.should.have.status(200);
			res.body.should.be.a('Object');
			console.log(res.body);
			//res.body.should.have.property('1');
			//expect({ res: {} }).to.have.property('FarmID').that.deep.equals(1);
			//res.body.should.have.property('farms');
			done();
		}

		catch(e){
				done(e);
		}
			
		});
	});
});


describe('/GET field details', ()=>{
	it('returns 1 if the farm details GET call returns an object', (done) => {
		chai.request('http://localhost:3000')
		.get('/getFarm')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('Object');
			done();
		});
	});
});

describe('/GET location details', ()=>{
	it('returns 1 if the field details GET call returns an object', (done) => {
		chai.request('http://localhost:3000')
		.get('/getLocation')
		.end((err, res) => {
			res.body.should.be.a('Object');
			done();
		});
	});
});

describe('/GET weather details', ()=>{
	it('returns 1 if the weather details GET call returns an object', (done) => {
		chai.request('http://localhost:3000')
		.get('/getWeather')
		.end((err, res) => {
			res.body.should.be.a('Object');
			done();
		});
	});
});

describe('/GET crop details', ()=>{
	it('returns 1 if the crop details GET call returns an object', (done) => {
		chai.request('http://localhost:3000')
		.get('/getCrop')
		.end((err, res) => {
			res.body.should.be.a('Object');
			done();
		});
	});
});
*/