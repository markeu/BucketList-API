// Import the dependencies for testing

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import jwt from 'jsonwebtoken';

const secret = 'jhfhfhfjhjfjf';
const token = jwt.sign({ email: 'koporate@gmail.com', password: 'mickey'},
	secret,
	{expiresIn: '24h'
	}
);

const Token = 'Bearer' + token;
chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

const validUser = {
	first_name: 'Mark',
	last_name: 'Opusunju',
	email: 'mar@gmail.com',
	password: 'mickey'
};

const favUser = {
	first_name: 'Mark',
	last_name: 'Quincy',
	email: 'mark@gmail.com',	
	password: 'ominvores'
  };

const nullUser = {};

describe('Test for App landing page', () => {
	it('should return 200 success status', (done) => {
		chai.request(app)
			.get('/')
			.end((_err, res) => {
				expect(res).to.have.status(200);
				res.body.should.be.a('object');
				expect(res.body.message).to.equal('Welcome to BucketList API');
				done();
			});
	});
});
// TEST FOR USER

describe('User auth test', () => {

	before('Before block', (done) => {
		chai
		  .request(app)
		  .post('/api/v1/auth/signup')
		  .send(validUser)
		  .end(( res ) => {
			  console.log(res);
				done();
		  });
	  });

	it('It should add user to the database', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(favUser)
			.end((_err, res) => {
				expect(res).to.have.status(201);
				done();
			});
	});

	it('It should not add user to the database', (done) => {
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(nullUser)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	
	it('It should return 400 for an undefined first name', (done) => {
		const _user = {
			last_name: 'kimutai',
			email: 'KossyUche@gmail.com',
			password: 'Augustine'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an undefined last name', (done) => {
		const _user = {
			first_name: 'uche',
			email: 'AmakaUche@gmail.com',
			password: 'Adaku'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
	it('It should return 400 for an undefined email', (done) => {
		const _user = {
			first_name: 'uche',
			last_name: 'mark',
			password: 'Hillarious'
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('It should return 400 for an undefined password', (done) => {
		const _user = {
			first_name: 'uche',
			last_name: 'mark',
			email: 'uchemark@gmail.com',
		  };
		
		chai.request(app)
			.post('/api/v1/auth/signup')
			.send(_user)
			.end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Should login a user with valid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/login')
			  .send({ email: 'mar@gmail.com', password: 'mickey' })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(201);
				done();
			  });
		  });
		  it('Should login a user with invalid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/login')
			  .send({ email: 'mr@gmail.com', password: 'mickey' })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(404);
				done();
			  });
		  });

		  it('Should login a user with invalid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/login')
			  .send({  password: 'mickey' })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(400);
				done();
			  });
		  });

		  it('Should login a user with invalid inputs', (done) => {
			chai.request(app)
			  .post('/api/v1/auth/login')
			  .send({  email: '', password: 'mickey'  })
			  .end((err, res) => {
				if (err) {
				  console.log(err);
				}
				expect(res).to.have.status(400);
				done();
			  });
		  });
	  });
	  
	

