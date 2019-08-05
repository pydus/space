const express = require('express')
const path = require('path')
const app = express()
const publicPath = '../../public'
const port = 3000

app.use(express.static(path.join(__dirname, publicPath)))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.listen(port)
