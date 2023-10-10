// models/celebrationModel.js
//const lw = require('lowdb');
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb';
//const jf = require( 'lowdb/node');
import { JSONFile } from 'lowdb/node';

import moment from 'moment-timezone';

import fs from 'fs';

//console.log(jf.JSONFile)
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
// console.log(file)

// fs.readFile(file.toString(), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });




const adapter = new JSONFile(file);

//console.log(adapter);

const defaultData = { users: [] };
const db = new Low(adapter, defaultData);
//console.log(db)



// Initialize the "celebrations" database
//db.defaults({ users: [] }).write();

async function getUsersByDate() {
    //console.log('getUsersByDate', date)
    //const today = moment.utc("2023-10-08 09:00:00"); //for testing
    const today_local = moment().format("MM-DD");
    const today = moment.utc(); //for real case
    //console.log(today);

    await db.read();

    if (!db.data.users) return;

    let filter = db.data.users.filter((e) => {
        let localtimeUser = today.tz(e.timezone).format("MM-DD");
        let celebration_date = moment.utc(e.celebration_date).format("MM-DD");
        //let last_date_sent = moment.utc(e.last_date_sent).format("MM-DD");
        let last_date_sent = moment(e.last_date_sent).format("MM-DD");

        if (localtimeUser == celebration_date && last_date_sent != today_local){
            return e;
        }

        // if (celebration_date == today_local && localtimeUser == today_local && last_date_sent != today_local){
        //     //cek timezone
        //     //console.log("Happy Bday " + e.name);
        //     return e;
        // }

        //console.log('filter-moment', moment.utc(e.celebration_date).format("MM-DD"))
        //return moment.utc(e.celebration_date).format("MM-DD") == date
    });
    //console.log('filter', filter);
    return filter;
    
    //await db.write();
//   return db.get('users').filter({     
//     //moment.utc(celebration_date).format("MM-DD") : date
//     cekDate(celebration_date) : date
// }).value();
  console.log('getUsersByDate', data);
}

// Additional functions for anniversary management (future feature)
// Modify as needed

export default {
  getUsersByDate,
};
