const express = require('express')
const axios = require('axios')
const cors = require('cors')

const { login } = require('./apis/login.js')
const { addNAcceptClone } = require('./apis/add_n_accept.js')

const PORT = 8081
const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
  login(req, res)
})

app.post('/add-accounts', (req, res) => {
  addNAcceptClone(req, res)
})

app.listen(PORT, () => {
  console.log(
    `---------------------------  Server running  -------------------------------------------------------`
  )
})
