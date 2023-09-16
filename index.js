import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import connectDatabase from './src/database/db.js';
import basicRouter from './src/router/basic.router.js';
import AsaasRouter from './src/router/asaas.router.js';
import quizRouter from './src/router/quiz.router.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDatabase()

app.use('/duda', basicRouter)
app.use('/asaas', AsaasRouter)
app.use('/quiz', quizRouter)

app.listen(process.env.PORT || 3001, () => {
  console.log(`Api: ✔️`);
});




