const mongoose = require('mongoose')
const Schema = mongoose.Schema


const servico = new Schema({
    salaoId: {
        //Aqui eu digo da onde esta erdando a classe.
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    titulo:{
        type:String, 
        required: true
    },
    preco:{
        type:Number, 
        required: true
    },
    comissao:{
        type:Number, // % de comissão sobre o preço
        required: true
    },
    duracao:{
        type:Number, //Duração em minutos
        required: true
    },
    descricao:{
        type:String,  //PERIDO PARA NOTIFICAR O CLIENTE PRA ELE VOLTAR FAZER DE NOVO
        required: true
    },
    status: {
        type: String,
        require: true,
        enum: ['A', 'I', 'E' ], // o E irra sumir para usuário 
        default:'A'
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
})



module.exports = mongoose.model('Servico', servico)