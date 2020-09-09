const CustomError = require("../extensions/custom-error");

module.exports = function countCats(backyard) {
  return backyard.reduce((total, item) => {
    return total + item.reduce((total2, item2) => {
      return item2 === '^^' ? total2 += 1 : total2;
    }, 0);
  }, 0);
};