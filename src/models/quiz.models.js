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
    telefone: {
        type: String,
        required: true,
    },
    medico: {
        type: String,
        required: true,
    },
    pontos: {
        type: String,
        required: true,
    },
    tempo: {
        type: String,
        required: true,
    }

})

const Quiz = mongoose.model('QuizInfo', UserSchema)

export default Quiz