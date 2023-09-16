import LuisDB from "../models/luis.models.js"
import MarcoDB from "../models/marco.models.js"
import _var from "../../var.js"
import axios from "axios"

const validatePayment = async (payment, customer) => {

    if(payment === "PAYMENT_CONFIRMED"){
        const clientLuis = await LuisDB.find({asaas: customer})
   
        if( clientLuis.length !== 0){
            const { _id, nome, descricao, medico } = clientLuis[0]
            await LuisDB.findByIdAndUpdate(_id, {pago:true})

            const message = [
                `Olá Dr.${medico}, tudo bem? 👋 Gostaria de informar que temos um agendamento, que está aguardando sua conclusão. O paciente em questão é ${nome} e está ansioso(a) pela sua resposta. Caso precise entrar em contato, utilize o número de telefone a seguir: +55${telefone}. Agradecemos desde já pela sua atenção! 😊👍`,
                "Algumas observações deixadas pelo paciente abaixo👇",
                descricao,
              ];
            
                
            axios.post(_var.urlSendMessage, {
                "phone": telefone,
                "message": `Olá ${nome}, tudo bem? Gostaria de confirmar o agendamento. Em breve, um de nossos representantes entrará em contato com você para fornecer mais detalhes e tirar quaisquer dúvidas que você possa ter. Agradecemos muito a sua preferência e esperamos vê-lo em breve! 😊👍`
            })
                
            await _var.sendMessageMedic(message, medico);
        }else{
            const clientMarco = await MarcoDB.find({asaas: customer})

            const { _id, nome, descricao, medico } = clientMarco[0]
            await MarcoDB.findByIdAndUpdate(_id, {pago:true})

            const message = [
                `Olá Dr.${medico}, tudo bem? 👋 Gostaria de informar que temos um agendamento, que está aguardando sua conclusão. O paciente em questão é ${nome} e está ansioso(a) pela sua resposta. Caso precise entrar em contato, utilize o número de telefone a seguir: +55${telefone}. Agradecemos desde já pela sua atenção! 😊👍`,
                "Algumas observações deixadas pelo paciente abaixo👇",
                descricao,
              ];
            
                
            axios.post(_var.urlSendMessage, {
                "phone": telefone,
                "message": `Olá ${nome}, tudo bem? Gostaria de confirmar o agendamento. Em breve, um de nossos representantes entrará em contato com você para fornecer mais detalhes e tirar quaisquer dúvidas que você possa ter. Agradecemos muito a sua preferência e esperamos vê-lo em breve! 😊👍`
            })
                
            await _var.sendMessageMedic(message, medico);
        }
    }

}

export default validatePayment
