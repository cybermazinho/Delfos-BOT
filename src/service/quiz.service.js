import axios from "axios";
import Quiz from "../models/quiz.models.js";
import _var from "../../var.js";

const quizSave = async (nome, sobrenome, telefone, medico, pontos, tempo) => {

    axios.post(_var.urlSendMessage, {
        "phone": telefone,
        "message": `Olá ${nome}, Você fez ${pontos} pontos no teste! Ótimo trabalho! Se estiver interessado em mais serviços, confira: [Inserir link aqui].`
    })

    if(medico === "Dr. luis"){
        axios.post(_var.urlSendMessage, {
            "phone": _var.numeroLuis,
            "message": `Olá Dr. luis, O paciente ${nome} obteve ${pontos} pontos em ${tempo} no teste. O número de telefone dele/dela é ${telefone} caso precise entrar em contato.`
        })
    }else{
        axios.post(_var.urlSendMessage, {
            "phone": _var.numeromarco,
            "message": `Olá Dr. Marcos, O paciente ${nome} obteve ${pontos} pontos em ${tempo} no teste. O número de telefone dele/dela é ${telefone} caso precise entrar em contato.`
        })
    }

    Quiz.create({nome, sobrenome, telefone, medico, pontos, tempo})
}

const quizList = async () => await Quiz.find()

export default {
    quizSave,
    quizList
}

