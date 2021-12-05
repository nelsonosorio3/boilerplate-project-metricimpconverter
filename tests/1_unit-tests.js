const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  // tests getNum
  test('should correctly read a whole number input', ()=>{
    assert.isNotNull(convertHandler.getNum("3km"), "the output should not be null");
    assert.isDefined(convertHandler.getNum("3km"), "the output should be define");
    assert.isNumber(convertHandler.getNum("3km"), "the output should be a number");
    assert.equal(convertHandler.getNum("3km"), 3, "the output should be 3");
    assert.equal(convertHandler.getNum("999999mi"), 999999, "the output should be 999999");
  });
  test("should correctly read a decimal number input", ()=>{
    assert.isNotNull(convertHandler.getNum("1.632km"), "the output should not be null");
    assert.isDefined(convertHandler.getNum("2.252mi"), "the output should be define");
    assert.isNumber(convertHandler.getNum("1.2522lbs"), "the output should be a number");
    assert.equal(convertHandler.getNum("23.23532kg"), 23.23532, "the output should be 23.24532");
    assert.equal(convertHandler.getNum("0.24224lbs"), 0.24224, "the output should be 0.24224");
  });
  test("should correctly read a fractional input", ()=>{
    assert.isNumber(convertHandler.getNum("5/2gal"), "the output should be a number");
    assert.equal(convertHandler.getNum("9/2km"), 4.5, "the output should be 4.5");
    assert.equal(convertHandler.getNum("3/10L"), 0.3, "the output should be 0.3");
  });
  test("should correctly read a fractional input with a decimal", ()=>{
    assert.isNumber(convertHandler.getNum("2.3/54.2kg"), "the output should be a number");
    assert.equal(convertHandler.getNum("22.6/11.3gal"), 2, "the output should be 2");
    assert.equal(convertHandler.getNum("14/3.5kg"), 4, "the output should be 4");
    assert.equal(convertHandler.getNum("21.21/3mi"), 7.07, "the output should be 7.07");
  });
  test("should correctly return an error on more than one fraction", ()=>{
    assert.isUndefined(convertHandler.getNum("2/4/5km"), "no a valid number");
  });
  test("should correctly default to a numerical input of 1 when no numerical input is provided", ()=>{
    assert.isNumber(convertHandler.getNum("km"), "the output should be a number");
    assert.equal(convertHandler.getNum("gal"), 1, "the output should default to 1");
  });
  
  //test getUnit
  test("should correctly read each valid input unit", ()=>{
    assert.isString(convertHandler.getUnit("56kg"), "the output should be a string");
    assert.equal(convertHandler.getUnit("10L"), "L", "the output should be L");
  });
  test("should correctly return an error for an invalid input unit", ()=>{
    assert.isUndefined(convertHandler.getUnit("2"), "no a valid unit");
  });
  
  //test getReturnUnit
  test("should correctly return the correct return unit for each valid input unit", ()=>{
    assert.equal(convertHandler.getReturnUnit("L"), "gal", "the output should be gal");
    assert.equal(convertHandler.getReturnUnit("gal"), "L", "the output should be L");
    assert.equal(convertHandler.getReturnUnit("km"), "mi", "the output should be mi");
    assert.equal(convertHandler.getReturnUnit("mi"), "km", "the output should be km");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "the output should be lb");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "the output should be kg");
  });

  //test spellOutUnit
  test("should correctly return the spelled-out string unit for each valid input unit", ()=>{
    assert.equal(convertHandler.spellOutUnit("L"), "liters", "the output should be liters");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons", "the output should be gallons");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers", "the output should be kilometers");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles", "the output should be miles");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms", "the output should be kg");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds", "the output should be pounds");
  });

  //test convert 
  test("should correctly convert gal to L", ()=>{
    assert.equal(convertHandler.convert(2, "gal"), 7.57082, "the output should be 7.57082");
  });
  test("should correctly convert L to gal", ()=>{
    assert.equal(convertHandler.convert(5, "L"), 1.32086, "the output should be 1.32086");
  });
  test("should correctly convert mi to km", ()=>{
    assert.equal(convertHandler.convert(10, "mi"), 16.09340, "the output should be 16.09340");
  });
  test("should correctly convert km to mi", ()=>{
    assert.equal(convertHandler.convert(7, "km"), 4.34961, "the output should be 4.34961");
  });
  test("should correctly convert lbs to kg", ()=>{
    assert.equal(convertHandler.convert(120, "lbs"), 54.43104, "the output should be 54.43104");
  });
  test("should correctly convert kg to lbs", ()=>{
    assert.equal(convertHandler.convert(60, "kg"), 132.27747, "the output should be 132.27747");
  });

});
