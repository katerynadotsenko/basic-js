const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    return arr.reduce((total, element) => {
      let total2 = 1;
      if (Array.isArray(element)) {
        total2 += this.calculateDepth(element);
      }
      return total2 > total ? total2 : total
    }, 1);
  };
};