// routes/users.js

import userModel from '../models/userModel.js';
import express from 'express';

const router = express.Router();

/*
Add a new user
post body: json array
example:
[{    
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@email.com",
    "celebration_date": "1998-10-09",
    "celebration_type": "Anniversary",  
    "timezone": "America/Los_Angeles"
  },
  {    
    "first_name": "James",
    "last_name": "Watt",
    "email": "james@email.com",
    "celebration_date": "2014-10-10",
    "celebration_type": "Birthday",    
    "timezone": "Australia/Sydney"
}]
*/
router.post('/', async (req, res) => {
    const user = req.body;
    let message = await userModel.addUser(user);
    res.json({ message });
});

/*
delete user
/user/1696750350176.116
*/
router.delete('/(:id)', async (req, res) => {
    let id = req.params.id;

    if (!id) {
        res.json({ message: 'please provide id user' });
    } else {
        const user = {};
        user.id = id;
        let message = await userModel.deleteUser(user);
        res.json({ message });
    }
});

/*
update user
post bosy: json array
example:
[{
    "id": "1696750350176.116",    
    "first_name": "John",
    "last_name": "Rock"
  },
  {
    "id": "1696750350176.7385",
    "first_name": "James",  
    "timezone": "Asia/Tokyo"
}]
*/
router.put('/', async (req, res) => {
    const user = req.body;
    let message = await userModel.updateUser(user);
    res.json({ message });
});

/*
http://localhost:3000/user
sample output
[
  {
    "id": "1696750350176.116",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@email.com",
    "celebration_date": "1998-10-09",
    "celebration_type": "Anniversary",
    "last_date_sent": "2023-10-10T03:16:30+07:00",
    "timezone": "America/Los_Angeles"
  },
  {
    "id": "1696750350176.7385",
    "first_name": "James",
    "last_name": "Watt",
    "email": "budi@email.com",
    "celebration_date": "2014-10-10",
    "celebration_type": "Birthday",
    "last_date_sent": "2023-10-10T03:16:24+07:00",
    "timezone": "Australia/Sydney"
  }  
]
*/
router.get('/', async (req, res) => {
    let data = await userModel.listUser();
    res.json(data);
});

export default router;
