const mongoose = require('mongoose')
const Schema = mongoose.Schema


const salaoCliente = new Schema({
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
    status: {
        type: String,
        require: true,
        enum: ['A', 'I' ],
        default:'A'
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }

})



module.export = mongoose.model('SalaoCliente', salaoCliente)