const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/config')
const { sequelize } = require('./models')
const app = express()
const port = config.port

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db.sqlite'
// })

require('./routes')(app)

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
  )
})
