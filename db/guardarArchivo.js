const fs = require('fs');

const arch = './db/data.json';

const guardarDB = (data) => {
  fs.writeFileSync(arch, JSON.stringify(data));
}

const leerDB = () => {
  if (!fs.existsSync(arch)) {
    return null;
  }
  const info = fs.readFileSync(arch,{encoding: 'utf-8'});
  const data = JSON.parse(info);
  return data;
}

module.exports = {
  guardarDB,
  leerDB
}