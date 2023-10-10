// models/userModel.js

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

const adapter = new JSONFile(file);
const defaultData = { users: [] };
const db = new Low(adapter, defaultData);

async function listUser() {
    await db.read();

    if (!db.data["users"]) {
        db.data = { "users": [] };
    }
    return db.data.users;
}

async function addUser(user) {
    await db.read();

    let msgFailed = 'some data is not valid, please fill all mandatory field';
    let msgSuccess = 'User added successfully';

    if (!db.data["users"]) {
        db.data = { "users": [] };
    }

    let isAllSave = true;
    user.forEach(item => {
        let id = new Date().getTime() + Math.random();

        let dataIsNotValid =
            item.first_name == "" ||
            item.last_name == "" ||
            item.email == "" ||
            item.celebration_date == "" ||
            item.celebration_type == "" ||
            item.timezone == "";

        if (dataIsNotValid) {
            isAllSave = false;
            console.log('addUser - ' + msgFailed);            
        } else {
            let data = {
                "id": id.toString(),
                "first_name": item.first_name,
                "last_name": item.last_name,
                "email": item.email,
                "celebration_date": item.celebration_date,
                "celebration_type": item.celebration_type,
                "last_date_sent": "",
                "timezone": item.timezone
            };

            db.data.users.push(data);
        }
    });

    await db.write();

    if (isAllSave)
        return msgSuccess;
    else
        return msgFailed;
}

async function updateUser(user) {
    if (!db.data["users"])
        return

    await db.read();

    let users = db.data.users;

    if (!users) return "update failed, no data found";

    let idxArr = [];
    users.forEach((aa, idx) => {
        user.forEach((bb) => {
            if (aa.id == bb.id) {
                users[idx].first_name = bb.first_name || users[idx].first_name;
                users[idx].last_name = bb.last_name || users[idx].last_name;
                users[idx].email = bb.email || users[idx].email;
                users[idx].celebration_date = bb.celebration_date || users[idx].celebration_date;
                users[idx].celebration_type = bb.celebration_type || users[idx].celebration_type;
                users[idx].timezone = bb.timezone || users[idx].timezone;
                users[idx].last_date_sent = bb.last_date_sent;
            }
        })
    });

    db.data.users = users;

    await db.write();

    return 'user updated';
}

async function deleteUser(user) {
    await db.read();

    let users = db.data.users;

    if (!users) return "delete failed, no data found";

    const filteredArray = db.data.users.filter((item) => {
        if (item.id.toString() !== user.id.toString()) {
            return item;
        }
    });
    db.data.users = filteredArray;

    await db.write();

    return 'user ' + user.id.toString() + ' deleted';
}

export default {
    listUser,
    addUser,
    deleteUser,
    updateUser
};
