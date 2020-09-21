const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isDirect) {
    this.isDirect = isDirect === undefined ? true : isDirect;
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
  }

  encrypt(message, key) {
    message = message.toLowerCase();
    key = key.toLowerCase();
    const keyMessage = this.keyMessage(message, key);
    let wordEncrypted = '';
    let i = 0;
    let sum = 0;
    while (i <= keyMessage.length - 1) {
      sum = this.alphabet.indexOf(message[i]) + this.alphabet.indexOf(keyMessage[i]);
      if (sum >= 26) sum = Math.abs(sum - 26);
      wordEncrypted = (sum >= 0) ? wordEncrypted + this.alphabet[sum] : wordEncrypted + message[i];
      i++;
    }
    return this.isDirect ? wordEncrypted.toUpperCase() : [...wordEncrypted.toUpperCase()].reverse().join('');

  }
  decrypt(message, key) {
    message = message.toLowerCase();
    key = key.toLowerCase();
    const keyMessage = this.keyMessage(message, key);
    let wordDecrypted = '';
    let i = 0;
    let sum = 0;
    while (i <= keyMessage.length - 1) {
      if (this.alphabet.indexOf(message[i]) >= this.alphabet.indexOf(keyMessage[i])) {
        sum = (this.alphabet.indexOf(keyMessage[i]) !== -1) ?
          this.alphabet.indexOf(message[i]) - this.alphabet.indexOf(keyMessage[i]) :
          -1;
      } else {
        sum = this.alphabet.indexOf(message[i]) + 26 - this.alphabet.indexOf(keyMessage[i])
      }
      wordDecrypted = (sum >= 0) ? wordDecrypted + this.alphabet[sum] : wordDecrypted + message[i];
      i++;
    }
    return this.isDirect ? wordDecrypted.toUpperCase() : [...wordDecrypted.toUpperCase()].reverse().join('');
  }

  keyMessage(message, key) {
    let keyLetterIndexPosition = 0;
    return [...message].reduce((res, item) => {
      if (keyLetterIndexPosition > key.length - 1) keyLetterIndexPosition = 0;
      if (/[a-z]/.test(item)) {
        keyLetterIndexPosition++;
        return res + key[keyLetterIndexPosition - 1];
      } else {
        return res + item;
      }
    }, '');
  }
}

module.exports = VigenereCipheringMachine;