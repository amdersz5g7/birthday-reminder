// services/cronService.js

import celebrationModel from '../models/celebrationModel.js';
import emailService from './emailService.js';
import cron from 'node-cron';

async function initialize() {
  cron.schedule('0 9 * * *', async () => {
    console.log(new Date() + ' - cron.schedule'); 
    await celebrationModel.getUsersByDate()
      .then(async (users) => {
        if (users.length == 0) return;

        emailService.send(users);
      })
  })
}

export default {
  initialize,
}