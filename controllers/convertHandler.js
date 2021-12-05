function ConvertHandler() {

  this.table = {
    "gal" : ["L", "gallons"],
    "L" : ["gal", "liters"],
    "mi" : ["km", "miles"],
    "km" : ["mi", "kilometers"],
    "lbs" : ["kg", "pounds"],
    "kg" : ["lbs", "kilograms"],
  }
  
  this.getNum = function(input) {
    if ( input.split("/").length > 2 ) return undefined;
    let result;
    for (let i = 0; i<input.length; i++){
      if (/\d/.test(input[i])){
        result = input.slice(0, i+1);
      }
    }
    if(/[/]/.test(result)) result =  Number(result.split("/")[0]) / Number(result.split("/")[1])
    if(typeof result === "undefined") return 1;

    return Number(result);
  };
  
  this.getUnit = function(input) {
    let result = "";
    for (let i = 0; i<input.length; i++){
      if (/\d/.test(input[i])){
        result = input.slice(i+1);
      }
    }
    if (!result) result = input;
    if (result.toUpperCase() !== "L") result = result.toLowerCase();
    else if (result === "l") result = result.toUpperCase();
    if (this.table.hasOwnProperty(result)) return result;
    else return undefined;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = this.table[initUnit][0];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = this.table[unit][1];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit){
      case "gal":
        result = initNum*galToL;
        break;
      case "L":
        result = initNum/galToL;
        break;
      case "lbs":
        result = initNum*lbsToKg;
        break;
      case "kg":
        result = initNum/lbsToKg;
        break;
      case "mi":
        result = initNum*miToKm;
        break;
      case "km":
        result = initNum/miToKm;
        break;
    }
    return Math.round(result*100000)/ 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
