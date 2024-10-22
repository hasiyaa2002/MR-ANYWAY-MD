const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUNCTmNnbVFUK2JadUk0dU5XS0ZyakJIbThmeE80blJoanJGbkJQbTMyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVNsZjZzdTFYNUd2SHgwTlYzWWhIeXhXVHR1VWE0czFkNERRLy9sL04zWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQ3F6WjhNS25Pc0NQVU1wMURrOTFTb2M4YkpKeFhHZm5TUW5OMXhOOUgwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrV3pTWXg3ZGFCYXpMUWlDc1prWkcrS2dBaTlSTEZIZnlVaytRSkF3Y3lNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9NMzBZQWl0WEh4NW45cCt3anZCajcvUml2T1VRbmdIdFJTcC9SdEVlR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNHaEx2VDh6cUQ3MVpCeURxcE5xQkRaWjlyRC9Ud1p4M2UvNXo3TnFJR2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUs4bTNLR1loVEFVd3hQVy9ENzFIZXBRenlVZjN1NHVvYWVtVGNSNjAxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFpVUlNvT1NGbCt2cXlQNnpQNkhuU1kzNXdGWWp6RWtRMUo4OSthUGpDVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktSdndjcXdNNEFJWitGV29iMmk3L0FHS3hwVWxXd2t5TWNIRGxwK255aVlKa05LaTMwTitmZ3I2Zk5LMEU1V0pPS3BOMXpaU3lQV2ZGMWtyWnpUa0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTksImFkdlNlY3JldEtleSI6IkhCYmNEVlR3NmdBWlZrVzIzQ1lua1gwRDNTb1AvUmwxVnAwcUZTdVFJUkk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjhsSnRfOHl5U1NTSWcyaFR5cXZIRHciLCJwaG9uZUlkIjoiMjJiOTRkMTktYjdkOC00MDllLTk2YTgtN2EyNzQ2YjU0Mjc0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJETFlTajBuTURQZmx2aTJTaE9SYXJhbSttbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRHNyTTA1dmtJUEpzU250elk2S2F5QzJUMWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWVM4R0JQSFAiLCJtZSI6eyJpZCI6Ijk0NzY2MDM0OTQzOjE3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNdXB6ZGtCRU9mYTNyZ0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ2cUFvdmhDY21DTmYwZVdZRi9sa0xBQmxpWWZLTXhLSHR3eWVpM0V5SkM4PSIsImFjY291bnRTaWduYXR1cmUiOiI3ZklQRmkvaTkxdWI0Ymd6c1E3RExLN2lleVpiTWxOdHlZNTMzMHJjOGVPamtrbk91MzhyMlZmWEtwM1NhcjNVWDlFajV6MzFaL0dBZHlzR3QrR0FBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSHBmMFgxZEpvQkRyMEh0ZjZxZ2k1N2hVcjlqdXVlNkhHNzBSME9WWnFOcE1UOUdEZDlQZWUyRldjcjYvNG5od0RkdExSQnFwbERXYzhCYjlLVUppQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc2NjAzNDk0MzoxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiNmdLTDRRbkpnalg5SGxtQmY1WkN3QVpZbUh5ak1TaDdjTW5vdHhNaVF2In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5NjA0OTgxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdEaiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "HASA",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "HASA",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ALFA_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
