const mongoose = require('mongoose')
const Schema = mongoose.Schema


const colaborador = new Schema({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"]

    }, 
    telefone: {
        type: String,
        required: [true, "Nome é obrigatório"]

    }, 
    email: {
        type: String,
        required: [true, "Nome é obrigatório"]

    }, 
    senha: {
        type: String,
        required: [true, "Nome é obrigatório"]

    },
    foto: {
        type: String,
        required: [true, "Nome é obrigatório"]

    },
    dataNascimento: {
        type: String,
        require: true
    },
    sexo: {
        type: String,
        enum: ['M', 'F'],
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: ['A', 'I' ],
        default:'A'
    },
    contaBancaria: {
        titular: {
            type: String,
            required: true
        },
        cpfCnpj: {
            type: String,
            required: true
        },
        banco: {
            type: String,
            required: true
        },
        titular: {
            type: String,
            required: true
        },
        tipo:{
            type: String,
            required: true
        },
        agencia: {
            type: String, 
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        dv: {
            type: String, 
            required: true
        }
    },
    recipientId: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
})



module.exports = mongoose.model('Colaborador', salao)