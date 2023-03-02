const express = require('express');
const app = express();
const PORT = 8000;

const http = require('http').Server(app)
const cors = require('cors')

// Middlewares
app.use(cors())

app.get('/api', (req, res) => {
  res.json({
    message: 'first message'
  })
})

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
})

