import axios from "axios";
import _var from "../../var.js";
import LuisDB from "../models/luis.models.js";
import MarcoDB from "../models/marco.models.js";

const paymentWait = (nome, sobrenome, cpf, email, telefone, descricao, medico) => {
    
    if(medico === "Dr. Luis"){

        axios.post(_var.urlSendMessage, {
            "phone": telefone,
            "message": `Olá ${nome}, como vai? Ficamos muito felizes com o seu cadastro no formulário da Clínica Delfos! Agora, para prosseguirmos com o agendamento, vamos dar os toques finais no pagamento. 😊👍`
        }).then( () =>{
            _var.buttonMessage(telefone)
        })
    
        axios.post(_var.urlClientAsaasLuis, 
        {
            "name": nome,
            "cpfCnpj": cpf,
            "mobilePhone": telefone
        },
        {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'access_token': _var.tokenLuis
            }
        }).then(res =>{
            LuisDB.create({nome, sobrenome, cpf, email, telefone, descricao, medico, pago: false, asaas: res.data.id})
        })

    }else{

        axios.post(_var.urlSendMessage, {
            "phone": telefone,
            "message": `Olá ${nome}, como vai? Ficamos muito felizes com o seu cadastro no formulário da Clínica Delfos! Agora, para prosseguirmos com o agendamento, vamos dar os toques finais no pagamento. 😊👍`
        }).then( () =>{
            _var.buttonMessage(telefone)
        })
    
        axios.post(_var.urlClientAsaasMarco, 
        {
            "name": nome,
            "cpfCnpj": cpf,
            "mobilePhone": telefone
        },
        {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'access_token': _var.tokenMarco
            }
        }).then(res =>{
            MarcoDB.create({nome, sobrenome, cpf, email, telefone, descricao, medico, pago: false, asaas: res.data.id})
        })

    }

}

const webhook = async (res) =>{
    if(res.phone !== 13){
        const ddd = res.phone.substring(2, 4)
        const number = res.phone.substring(4, res.phone)
        const fixNumber = `${ddd}9${number}`

        const luisList = await LuisDB.find()
        const clientLuis = luisList.find(item => item.telefone === fixNumber && item.pago !== true)
        const marcoList = await MarcoDB.find()
        const clientMarco = marcoList.find(item => item.fixNumber === fixNumber && item.pago !== true)

        if(clientLuis.length !== 0){
            const idLuis = clientLuis.asaas
            _var.payment(idLuis, fixNumber, _var.urlClientAsaasLuis, _var.tokenLuis, 5, res.listResponseMessage.message)
        }else{
            const idMarco = clientMarco.asaas
            _var.payment(idMarco, fixNumber, _var.urlClientAsaasMarco, _var.tokenMarco, 5, res.listResponseMessage.message)
        }
    }
}

const listLuisDB = async () => await LuisDB.find()
const listMarcoDB = async () => await MarcoDB.find()

export default {
    paymentWait,
    listLuisDB,
    listMarcoDB,
    webhook
}

