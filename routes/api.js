'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get("/api/convert/", (req, res)=>{
    const input = req.query.input;
    const initNum =  convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    console.log(initNum);
    if(!initUnit && !initNum) return res.json("invalid number and unit");
    else if(!initUnit) return res.json("invalid unit");
    else if(!initNum) return res.json("invalid number");

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({initNum, initUnit, returnNum, returnUnit, string});

  })
  
};
