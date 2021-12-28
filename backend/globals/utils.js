var moment = require('moment'); // require

const getTimeStamp = () => {
  let date = moment().format(`'YYYY-MM-DD hh:mm:ss'`);
  return date
}

module.exports = { getTimeStamp };