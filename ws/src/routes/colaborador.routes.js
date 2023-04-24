const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const pagarme = require('../services/pagarme')
const Colaborador = require('../models/colaborador')
const SalaoColaborador = require('../models/relationship/salaoColaborador')
router.post('/', async (req, res) => {
  try {
    // Verificar se tudo está correto antes de cadastrar no banco.
    const db = mongoose.connection 
    const session = await db.startSession()
    
    
    try {
      const { colaborador, salaoId } = req.body
      let newColaborador = null
      // Verificar se o colaborador existe.
      const existentColaborador = await Colaborador.findOne({
        $or: [
          { email: colaborador.email },
          { telefone: colaborador.telefone },
        ],
      })

      // Se o colaborador não existir, criar conta bancária e receptor.
      if (!existentColaborador) {
        const { contaBancaria } = colaborador
        const pagarmeBankAccount = await pagarme('bank_accounts',{
          agencia: contaBancaria.agencia,
          bank_code: contaBancaria.banco
          //passar api recebida lá, enviar do calaborador para aqui. 
        })
        if(pagarmeBankAccount.error ){
          throw pagarmeBankAccount
        }
        // Criar recebedor.
        const pagarmeReceiver = await pagarme('/recipients'{
          transfer_interval: "day",
          transfer_enabled: true,
          bank_account_id: pagarmeBankAccount.id,
        })
        if(pagarmeRecipient.error){
          throw pagarmeRecipient
        }
        // Criar colaborador no banco.
        newColaborador = new Colaborador({
          ...colaborador,
          recipientId: pagarmeRecipient.id
        })
        await newColaborador.save({ session })
      }
      
      
      res.json({ error: false })
      const colaboradorId = existentColaborador ? existentColaborador._id : newColaborador._id

      //verifica se já existe o relacionamento
      const existentRelalitionship = await SalaoColaborador.findOne({
        salaoId, 
        colaboradorId
      })
      // SE NÃO ESTA VINCULADO
      if(!existentRelalitionship){
        await new SalaoColaborador({
          salaoId,
          colaboradorId,
          status: colaborador.vinculo,
        })
      }
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      res.json({ error: true, message: err.message })
    }
  } catch (err) {
    res.json({ error: true, message: err.message })
  }
})

module.exports = router
