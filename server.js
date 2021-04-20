const express = require('express')
const dotenv = require('dotenv')

dotenv.config({
    path: '.env'
})

const server = express()

server.use(express.json())

const port = process.env.PORT || 4000

server.use('/api', function (req, res, next) {
    res.status(200).json({
        message: 'success!!'
    })
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})