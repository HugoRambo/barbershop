const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const busboy = require('connect-busboy')
const busboyBodyParser = require('busboy-body-parser')
require('./database')

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())
app.use(busboy())
app.use(busboyBodyParser())
app.use(cors())


app.set('port', 8000)

//rotas
app.use('/salao',require('./src/routes/salao.routes'))
app.use('/servico',require('./src/routes/servico.routes'))
app.use('/horario', require('./src/routes/horario.routes'))
app.use('/colaborador', require('./src/routes/colaborador.routes'))
app.listen(app.get('port'), ()=> {
    console.log(`Ws escutando na porta ${app.get('port')}`)
})