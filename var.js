import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

//Rota de envio de mensagem para Z-API
const urlSendMessage = `https://api.z-api.io/instances/${process.env.INSTANCES}/token/${process.env.TOKEN}/send-messages`
//Rota para escolhe de metodo de pagamento
const urlSendButton = `https://api.z-api.io/instances/${process.env.INSTANCES}/token/${process.env.TOKEN}/send-option-list`

//Conexão com o mongoDB
const mongoConnect = `mongodb+srv://cybermazinho:${process.env.PASSWORD}@cybermazinho.1a3vn.mongodb.net/?retryWrites=true&w=majority`

//Token da api do asaas Luiz
const tokenLuis = process.env.TOKENASAASLUIS
//Token da api do asaas Marcos
const tokenMarco = process.env.TOKENASAASMARCO

//Link de criação de clientes no asaas Luis
const urlClientAsaasLuis = "https://sandbox.asaas.com/api/v3/customers"
//Link de criação de clientes no asaas Marcos
const urlClientAsaasMarco = "https://sandbox.asaas.com/api/v3/customers"
//Criação de pagamento Luis
const urlPaymentAsaasLuis = "https://sandbox.asaas.com/api/v3/payments"
//Criação de pagamento Marcos
const urlPaymentAsaasMarco = "https://sandbox.asaas.com/api/v3/payments"

//Numero dos medicos
const numeroLuis = "68999759374" 
const numeromarco = "68999759374"

//Funcionalidade que obriga a mensagem do zap zap a ser ordenada para os medicos
const sendMessageMedic = async (message, medico) => {
    for (let i = 0; i < message.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          if (medico === "Dr. luis") {
            axios.post(urlSendMessage, {
              "phone": numeroLuis,
              "message": message[i]
            })
          } else {
            axios.post(urlSendMessage, {
              "phone": numeromarco,
              "message": message[i]
            })
          }
          resolve();
        }, 5000);
      });
    }
}

//Funcionalidade de metodo de pagamento
const payment = (id, number, link, token, valor, type) =>{
  if(type === "Pix"){
    axios.post(link, 
        {
            "customer": id,
            "billingType": "PIX",
            "value": valor,
            "dueDate": "2023-10-21"
        },
        {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'access_token': token
            }
        }).then(res =>{
            axios.post(urlSendMessage, {
                "phone": number,
                "message": `Foi gerado um link de pagamento acesse aqui: ${res.data.invoiceUrl}`
            })
        })
  }else{
      axios.post(link, 
          {
              "customer": id,
              "billingType": "CREDIT_CARD",
              "value": valor,
              "dueDate": "2023-10-21"
          },
          {
              headers: {
                  'accept': 'application/json',
                  'content-type': 'application/json',
                  'access_token': token
              }
          }).then(res =>{
              axios.post(urlSendMessage, {
                  "phone": number,
                  "message": `Foi gerado um link de pagamento acesse aqui: ${res.data.invoiceUrl}`
              })
          })
  }
}

export default {
    urlSendMessage,
    urlSendButton,
    mongoConnect,
    numeroLuis,
    numeromarco,
    tokenLuis,
    tokenMarco,
    urlClientAsaasLuis,
    urlClientAsaasMarco,
    urlPaymentAsaasLuis,
    urlPaymentAsaasMarco,
    sendMessageMedic,
    payment
}