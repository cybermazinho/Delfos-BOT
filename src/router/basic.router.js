import express from 'express'
import basicController from '../controller/basic.controller.js';

const basicRouter = express.Router()

basicRouter.post('/form-create', basicController.formCreate);
basicRouter.get('/form-luis', basicController.luisList);
basicRouter.get('/form-marco', basicController.marcoList);
basicRouter.post('/webhook-zap', basicController.webhookZap);
  
export default basicRouter