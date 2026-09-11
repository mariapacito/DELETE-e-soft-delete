const fs = require('fs').promises
const path = require('path')

async function readJSON(file) {
  const data = await fs.readFile(path.join(__dirname, '..', 'data', file), 'utf-8')
  return JSON.parse(data)
}

async function writeJSON(file, data) {
  await fs.writeFile(path.join(__dirname, '..', 'data', file), JSON.stringify(data, null, 2))
}

module.exports = { readJSON, writeJSON }
