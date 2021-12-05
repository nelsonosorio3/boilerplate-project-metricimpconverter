const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test("Test GET /api/convert with 10L", done=>{
    chai
      .request(server)
      .get("/api/convert/?input=10L")
      .end((err, res)=>{
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });
  test("Test GET /api/convert invalid input 32g", done=>{
    chai
      .request(server)
      .get("/api/convert/?input=32g")
      .end((err, res)=>{
        assert.equal(res.body, "invalid unit");
        done();
      });
  });
  test("Test GET /api/convert invalid number 3/7.2/4kg", done=>{
    chai
      .request(server)
      .get("/api/convert/?input=3/7.2/4kg")
      .end((err, res)=>{
        assert.equal(res.body, "invalid number");
        done();
      });
  });
  test("Test GET /api/convert invalid number 3/7.2/4kilomegagram", done=>{
    chai
      .request(server)
      .get("/api/convert/?input=3/7.2/4kilomegagram")
      .end((err, res)=>{
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });
  test("Test GET /api/convert valid output no numbers kg", done=>{
    chai
      .request(server)
      .get("/api/convert/?input=km")
      .end((err, res)=>{
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "km");
        assert.equal(res.body.returnNum, 0.62137);
        assert.equal(res.body.returnUnit, "mi");
        assert.equal(res.body.string, "1 kilometers converts to 0.62137 miles");
        done();
      });
  });
});
