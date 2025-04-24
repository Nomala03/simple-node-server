const fs = require('node:fs')
const { open, readFile } = require('node:fs')

const FILE_NAME = "database.json"

const createCollections = () => {
    readFile(FILE_NAME, 'utf8', (err, data) => {
        console.log(data);
    })
}

exports.createFile = () => {
    open(FILE_NAME, 'wx', (err,fd) => {
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