const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (Array.isArray(members) === false) return false;
  const secretName = members.reduce((res, member) => {
    return (typeof member === 'string') ? [...res, member.trim()[0].toUpperCase()] : res;
  }, []);
  return secretName.sort().join('');
};