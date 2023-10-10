// services/emailService.js

import request from 'request';
import moment from 'moment-timezone';
import userModel from '../models/userModel.js';

async function send(users) {
    const urlEmail = "https://email-service.digitalenvision.com.au/send-email";

    users.forEach((user) => {   
        let msgBody = `Happy ${user.celebration_type}, ${user.first_name + ' ' + user.last_name}! 🎉`
        const options = {
            method: 'POST',
            url: urlEmail,
            body: {
                email: user.email,
                message: msgBody
            },
            json: true
        };    
        
        request(options, (err, res, body) => {      
            console.log('trying to send email to ' + user.email);
            if (err) {
                console.log(err);
                return false;
            }
            if (res.statusCode == 200 && body.status == "sent") {                
                console.log(new Date() + ' - ' + msgBody);
                user.last_date_sent = moment().format(); 
                let listUser = [];  
                listUser.push(user);
                userModel.updateUser(listUser);
                return true;
            } else {
                console.log('failed');
                return false;
            }
        });
    })
}

export default {
    send,
};
