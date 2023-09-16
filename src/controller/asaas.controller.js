import validatePayment from "../service/asaas.service.js"

const webhook = async (req, res) =>{
    
    try{
        const {event, payment} = req.body
        validatePayment(event, payment.customer)
        res.status(200).json("✔️").end()
    }catch{
        res.status(400).json("❌").end()
    }

}

export default webhook