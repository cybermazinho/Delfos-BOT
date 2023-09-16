import basicService from "../service/basic.service.js"

const formCreate = async (req, res) => {

    const {name, sobrenome, CPF,  Email, Phone, descricao, medico} = req.body
    
    try{
        basicService.paymentWait(name, sobrenome, CPF, Email, Phone, descricao, medico)
        res.status(201).json("✔️").end()
    }catch{
        res.status(400).json("❌").end()
    }

}

const luisList = async (req, res) =>{
    try{
        const list = await basicService.listLuisDB()
        res.status(200).json(list).end()
    }catch{
        res.status(400).json("❌").end()
    }
}

const marcoList = async (req, res) =>{
    try{
        const list = await basicService.listMarcoDB()
        res.status(200).json(list).end()
    }catch{
        res.status(400).json("❌").end()
    }
}

const webhookZap = async (req, res) => {
    try{
        basicService.webhook(req.body)
        res.status(200).json("✔️").end()
    }catch{
        res.status(400).json("❌").end()
    }
}

export default {
    formCreate,
    luisList,
    marcoList,
    webhookZap
}