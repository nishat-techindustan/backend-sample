const fs = require('fs/promises')
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')

dotenv.config({
    path: '.env'
})

const server = express()

async function readFileFromData() {
    const fileSystem = await fs.readFile(path.join(`${__dirname}`, 'src', 'data', 'text.txt'), 'utf-8')
    console.log(fileSystem, 'fileSystem')
}

readFileFromData()

server.use(express.json())

const port = process.env.PORT || 4000

server.use('/api', function (req, res, next) {
    res.download(path.join(`${__dirname}`, 'src', 'data', 'text.txt'), function (err, result) {
        if (result) {
            fs.unlinkSync(path.join(`${__dirname}`, 'src', 'data', 'text.txt'))
            res.status(200).json({
                message: 'success!!'
            })
        }
        if (err) {
            res.status(400).json({
                message: 'file couldnot be downloaded!!'
            })
        }
    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})