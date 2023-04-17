const mongoose = require('mongoose')
const Schema = mongoose.Schema


const agendamento = new Schema({
    salaoId: {
        //Aqui eu digo da onde esta erdando a classe.
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    clienteId:{
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    servicoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    },
    colaboradorId:{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    },
    data: {
        type: Date, 
        require: true
    },
    comissao: {
        type: Number, 
        require: true
    },
    valor: {
        type: Number, 
        require: true
    },
    TransactionId: {
        type: String, 
        require: true
    },

    dataCadastro: {
        type: Date,
        default: Date.now,
    }

})



module.exports = mongoose.model('Agendamento', agendamento)