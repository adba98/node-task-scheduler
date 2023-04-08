const fs = require('fs');

const filePath = './db/data.json';

const saveToDB = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

const readFromDB = () => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(content);
  return data;
};

module.exports = {
  saveToDB,
  readFromDB,
};
