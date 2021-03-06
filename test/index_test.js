'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const { expect } = require('chai')
let server = require('../bin/www');//Do not use in chai.request as it stops the tests working
chai.use(chaiHttp);


/*
This test will pass if the getFarmAnalysis API route returns an object containing the "farmID" field. 
*/
describe('/GET farm analysis', ()=>{
	it('returns 1 if the farm analysis GET call returns an object containing a farmID', (done) => {
		chai.request('http://localhost:3000')
		.get('/api/getFarmAnalysis/1')
		.end((err, res) => {
			try{
			res.should.have.status(200);
			res.body.should.be.a('Object');
			console.log(res.body);
			res.body.should.have.property('farmID');
			done();
		}
		catch(e){
			done(e);
		}
		});
	});
});

/*
This test will pass if the getMarkers API route returns an object. 
*/
describe('/GET markers', ()=>{
	it('returns 1 if GET markers returns an object', (done) => {
		chai.request('http://localhost:3000')
		.get('/api/getMarkers')
		.end((err, res) => {
			try{
				res.should.have.status(200);
				res.body.should.be.a('Object');
				console.log(res.body);
				done();
			}
		catch(e){
				done(e);
			}
		});
	});
});

/*
This test will pass if the getFarmSummary API route returns an object containing the "farmID" field. 
*/
describe('/GET farm summary', ()=>{
	it('returns 1 if the farm summary GET call returns an object containing a farmID', (done) => {
		chai.request('http://localhost:3000')
		.get('/api/getFarmSummary/1')
		.end((err, res) => {
			try{
			res.should.have.status(200);
			res.body.should.be.a('Object');
			console.log(res.body);
			res.body.should.have.property('farmID');
			done();
		}

		catch(e){
				done(e);
		}
		});
	});
});

/*
This test will pass if the getPlantData API route returns an object containing the "farmID" field. 
*/
describe('/GET plant data', ()=>{
	it('returns 1 if the farm GET call returns an object containing a farmID', (done) => {
		chai.request('http://localhost:3000')
		.get('/api/getPlantData/1')
		.end((err, res) => {
			try{
			res.should.have.status(200);
			res.body.should.be.a('Object');
			console.log(res.body);
			res.body.should.have.property('farmID');
			done();
		}

		catch(e){
				done(e);
		}
		});
	});
});

/*
This test will pass if the getDailyWeather API route returns an object containing the "farmID" field. 
*/
describe('/GET daily weather', ()=>{
	it('returns 1 if the farm GET call returns an object containing a farmID', (done) => {
		chai.request('http://localhost:3000')
		.get('/api/getDailyWeather/1')
		.end((err, res) => {
			try{
			res.should.have.status(200);
			res.body.should.be.a('Object');
			console.log(res.body);
			res.body.should.have.property('farmID');
			done();
		}
		catch(e){
			done(e);
		}
		});
	});
});