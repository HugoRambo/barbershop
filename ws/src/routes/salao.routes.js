const express = require('express')
const router = express.Router()
const Salao = require('../models/salao')
const Servico = require('../models/servico')

router.post('/', async(req, res ) => {
    try{
        //Recebo esse salao
        const salao = await new Salao(req.body).save()
        //Devolvo esse salao
        res.json({salao})
    } catch(err){
        res.json({ error: true, message: err.message })
    }
})

router.get('/servicos/:salaoId', async(req, res) => {
    try{
        const {salaoId} = req.params
        const servicos = await Servico.find({
            salaoId,
            status: 'A'
        }).select('_id titulo')
        /*Label: Serviço'  value: 2154111*/
        res.json({
            servicos: servicos.map(s => ({label: s.titulo, value: s._id}))
        })
    }catch (err){
        res.json({error: true, message: err.message})
    }
})


module.exports = router
