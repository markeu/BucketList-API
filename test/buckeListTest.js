import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import pool from '../db/db';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(id) from bucketLists', (err, result) => {
const id = result.rows[0].max + 1;

const validName = {
	name: 'Fredick Giggs',
  };

  
const User = {
	first_name: 'Mark',
	last_name: 'Lugard',
	email: 'uchr@gmail.com',
	password: 'mickey'
};

describe('BucketLists test', () => {

    let token;

    before((done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(User)
            .end(( err, res ) => {
				        token = res.body.data.token;
                done();
            });
   
    });
      
    it('Should add valid BucketLists to the database', (done) => {
      chai.request(app)
        .post('/api/v1/bucketLists')
        .set('token', token)
        .send(validName)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
    });

    // Test for get property
	it('Should Get all the bucketList', (done) => {
	  chai.request(app)
      .get('/api/v1/bucketLists')
      .set('token', token)
			.end((err, res) => {
      res.should.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.be.an('array');
      expect(res.body).to.have.a.property('data');							
		    done();
			});
	});

	it('Should not Get a null bucketLists', (done) => {
		chai.request(app)
      .get('/api/v1/bucketLists/100')
      .set('token', token)
		  .end((err, res) => {
				res.should.have.status(404);
				done();
		  });
	  });	
      it('Should not edit bucketlist when supplied inexistent property id', (done) => {
        chai.request(app)
          .put('/api/v1/bucketLists/100')
          .set('token', token)
          .send({name: 'Livinus'})
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
        });	

  it('Should update BucketLists', (done) => {
    
      chai.request(app)
      .put(`/api/v1/bucketLists/${id}`)
      .set('token', token)
      .send({name: 'Livinus'})
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).to.be.an('object');
				expect(res.body).to.have.a.property('data');
        done();
        });
		  });	

    it('Should not be able to delete BucketLists', (done) => {
      chai.request(app)
        .delete('/api/v1/bucketLists/201')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
      });
   });	
});