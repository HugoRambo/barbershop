const mongoose = require('mongoose')
const Schema = mongoose.Schema


const cliente = new Schema({
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
    documento: {
        tipo: {
            type: String,
            enum: ['individual', 'corporation'], //registrar o cnpj e cpf do usuário
            required: true
        },
        numero: {
            type: String,
            required: true
        }
    },
    endereco: {
            cidade: String,
            uf: String,
            cep: String,
            cpf: String,
            numero: String,
            pais: String,

    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
})



module.exports = mongoose.model('Cliente', cliente)