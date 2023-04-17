const mongoose = require('mongoose')
const Schema = mongoose.Schema


const horario = new Schema({
    salaoId: {
        //Aqui eu digo da onde esta erdando a classe.
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    especialidades:[{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    }],
    colaboradores:[{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    }
    ],
    dias: {
        type: [Number], //quando uso o [] significa que so pode ser um array do numero 
        required: true
    },
    inicio: {
        type: Date, 
        required: true
    },
    fim: {
        type: Date,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }

})



module.exports = mongoose.model('Horario', horario)