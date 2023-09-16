import express from 'express'
import webhook from '../controller/asaas.controller.js';

const AsaasRouter = express.Router()

AsaasRouter.post('/webhook', webhook);
  
export default AsaasRouter