// models/celebrationModel.js

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSONFile } from 'lowdb/node';
import moment from 'moment-timezone';
import { Low } from 'lowdb';

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file);
const defaultData = { users: [] };
const db = new Low(adapter, defaultData);

async function getUsersByDate() {
    const today_local = moment().format("MM-DD");
    const today = moment.utc();

    await db.read();

    if (!db.data.users) return;

    let filter = db.data.users.filter((e) => {
        let localtimeUser = today.tz(e.timezone).format("MM-DD");
        let celebration_date = moment.utc(e.celebration_date).format("MM-DD");        
        let last_date_sent = moment(e.last_date_sent).format("MM-DD");

        if (localtimeUser == celebration_date && last_date_sent != today_local){
            return e;
        }
    });    
    return filter;  
}

export default {
  getUsersByDate
};
