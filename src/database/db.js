import mongoose from 'mongoose'
import _var from '../../var.js'

const connectDatabase = ()=>{
    mongoose.connect(_var.mongoConnect, 
    {
     useNewUrlParser: true, 
     useUnifiedTopology: true
    }   
    ).then(() => console.log('MongoDB: ✔️')).catch((error)=> console.log(error))
}

export default connectDatabase

