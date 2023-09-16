import quizService from "../service/quiz.service.js"

const quizInfo = async (req, res) =>{

    const {nome, sobrenome, telefone, medico, pontos, tempo} = req.body
    
    try{
        quizService.quizSave(nome, sobrenome, telefone, medico, pontos, tempo)
        res.status(201).json("✔️").end()
    }catch{
        res.status(400).json("❌").end()
    }

}

const quizAll = async (req, res) =>{
    
    try{
        const list = await quizService.quizList()
        res.status(200).json(list).end()
    }catch{
        res.status(400).json("❌").end()
    }
}

export default {
    quizInfo,
    quizAll
}