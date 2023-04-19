const express = require('express')
const router = express.Router()
const Busboy = require('busboy')
const aws = require('../services/aws')
const Arquivo = require('../models/arquivo')
const Servico = require('../models/servico')

// Rota recebe formdate 'enviar arquivos de forma nativa'
router.post('/', async(req, res ) => {
    let busboy = new Busboy({headers: req.headers})
       //realizoy upload funcione 
       busboy.on('finish', async () =>{
        try{
            const {salaoId, servico} = req.body
            let errors = []
            let arquivos = []
            
            
            
            if (req.files && Object.keys(req.files).length >0){
                for (let key of Object.keys(req.files)){
                    const file = req.files[key]
                    //blabla asdad,pg
                    const nameParts = file.name.splite('.')
                    const fileName = `${new Date().getTime()}.${
                        nameParts[nameParts.length -1]
                    }`
                    const path = `servicos/${salaoId}/${fileName}`
                    const response = await aws.uploadToS3(file, path)
                    if (response.error){
                        errors.push({error: true, message: response.message})
                    }else {
                        arquivos.push(path)
                    }
                }
            }
            if (errors.length >0){
                res.json(errors[0])
                return false
            }
            //Criar serviço
            let jsonServico = JSON.parse(servico)
            const servicoCadastrado = await Servico(jsonServico).save()
            //CRIAR ARQUIVO
            arquivos = arquivos.map(arquivo => ({
                referenciaId: servicoCadastrado._id,
                model: 'Servico',
                caminho: arquivo,
            }))
            await Arquivo.insertMany(arquivos)
            res.json({servico: servicoCadastrado, arquivo})
         } catch(err){
             res.json({ error: true, message: err.message })
         }
       })
    req.pipe(busboy)
})

router.put('/:id', async(req, res ) => {
    let busboy = new Busboy({headers: req.headers})
       //realizoy upload funcione 
       busboy.on('finish', async () =>{
        try{
            const {salaoId, servico} = req.body
            let errors = []
            let arquivos = []
            
            
            
            if (req.files && Object.keys(req.files).length >0){
                for (let key of Object.keys(req.files)){
                    const file = req.files[key]
                    //blabla asdad,pg
                    const nameParts = file.name.splite('.')
                    const fileName = `${new Date().getTime()}.${
                        nameParts[nameParts.length -1]
                    }`
                    const path = `servicos/${salaoId}/${fileName}`
                    const response = await aws.uploadToS3(file, path)
                    if (response.error){
                        errors.push({error: true, message: response.message})
                    }else {
                        arquivos.push(path)
                    }
                }
            }
            if (errors.length >0){
                res.json(errors[0])
                return false
            }
            //Criar serviço
            const jsonServico = JSON.parse(servico)
            await Servico.findByIdAndUpdate(req.params.id, jsonServico)
            
            //CRIAR ARQUIVO
            arquivos = arquivos.map(arquivo => ({
                referenciaId: req.params.id,
                model: 'Servico',
                caminho: arquivo,
            }))
            await Arquivo.insertMany(arquivos)
            res.json({error: false})
         } catch(err){
             res.json({ error: true, message: err.message })
         }
       })
    req.pipe(busboy)
})

router.get('/salao/salaoId', async (req, res) =>{
    try{
        let servicosSalao = []
        const servicos = await Servico.find({
            salaoId: req.params.salaoId,
            status: {$ne: 'E'},
        })
        // for of espera o await
        for(let servico of servicos){
            const arquivos = await Arquivo.find({
                model: 'Servico',
                referenciaId: servico._id
            })
            servicosSalao.push({...servico._doc, arquivos})
        }
        res.json({
            servicos: servicosSalao,
        })
    }
    catch(err){
        res.json({error: true, message: err.message})
    }
})


router.post('/delete-arquivo', async (req, res)=>{
    try{
       const {id} = req.body
       //Exclui o arquivo
       await aws.deleteFileS3(id)
       await Arquivo.findByIdAndDelete({
        caminho: id,
       })
       res.json({ error:false  })
    }catch(err){
        res.json({error: true, message: err.message})
    }
})

router.delete('/id', async(req, res) =>{
    try{
        const {id} = req.params
        await Servico.findByIdAndUpdate(id, {status: 'E'})
        //Exclui o arquivo
        await aws.deleteFileS3(id)
        await Arquivo.findByIdAndDelete({
         caminho: id,
        })
        res.json({ error:false  })
     }catch(err){
         res.json({error: true, message: err.message})
     }
})


module.exports = router
