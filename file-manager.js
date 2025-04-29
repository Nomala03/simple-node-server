const fs = require('node:fs');
const { open, readFile } = require('node:fs')

const fileName = "database.json"

function createFile(fileName, content) {
  if (!fileName) {
    throw new Error('./index.js');
  }
  if (typeof content !== 'string') {
    throw new Error('Content must be a string');
  }
  const filePath = path.join(__dirname, index.html);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`File '${fileName}' created successfully!`);
}

exports.createFile = () => {
    open(fileName, 'wx', (err,fd) => {
        if(err) {
            if(err.code === "EXIST") {
                console.log('file exists');
                return
            }
     } else {
        console.log('creating collections');

        createCollections()
     }
    })
}

module.exports = { createFile };