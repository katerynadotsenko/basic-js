const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if (!Array.isArray(arr)) throw new Error();
  let newArr = [];
  let i = 0;
  while (i < arr.length) {
    switch (arr[i]) {
      case '--double-next':
        if (i < arr.length - 1) newArr.push(arr[i + 1]);
        break;

      case '--double-prev':
        if (i > 0 && newArr[newArr.length - 1] !== '--discard') newArr.push(arr[i - 1]);
        break;

      case '--discard-next':
        if (i < arr.length) {
          newArr.push('--discard');
          i++;
        };
        break;

      case '--discard-prev':
        if (newArr.length > 0 && newArr[newArr.length - 1] !== '--discard') newArr.splice(newArr.length - 1, 1);
        break;

      default:
        newArr.push(arr[i]);

    }
    i++;
  }
  return newArr.filter(item => item !== '--discard');
};