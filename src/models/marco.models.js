import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    medico: {
        type: String,
        required: true,
    },
    pago: {
        type: Boolean,
        required: true,
    },
    asaas: {
        type: String,
        required: true,
    },

})

const MarcoDB = mongoose.model('MarcoDB', UserSchema)

export default MarcoDB