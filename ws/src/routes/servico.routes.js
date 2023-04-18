const express = require('express')
const router = express.Router()
const Busboy = require('busboy')
const aws = require('../service/aws')
const Salao = require('../models/salao')
const Servico = require('../models/servico')

router.post('/', async(req, res ) => {
    let busboy = new Busboy({headers: req.header})
       //realizoy upload funcione 
       busboy.on('finish', async () =>{
        try{
            const {salaoId} = req.body
            let errors = []
            let arquivos = []
            
            
            
            if (req.files && Object.keys(req.files) >0){
                for (let key of Object.keys(req.files)){
                    const file = req.files[key]
                    //blabla asdad,pg
                    const nameParts = file.name.slit('.')
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
         } catch(err){
             res.json({ error: true, message: err.message })
         }
       })
    
})




module.exports = router
