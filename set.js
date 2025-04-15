const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUV3Wmh5VzdMdExHKzllLzhUL2JBY1QxWTRXaGE0NDAzZFJNUHplVUUwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3czRnVwc0dGZnVPRVdRMmpTdTR0QnJDanNyODVDemFlbG1UYUFvYTBscz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RHVEYU04dFZUYXA3TFFnTVZwSVpWTk1CWWVQMzRlNWpCODdqeXl2c1VvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvSHpvQXRPY3ZGMmF4Z0ordFRGeGZsM05DalBDbHM5YUl0ZDZ5U3B2Y1NFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBV2hOSFc5ajhYVWRRSTJmZndhSzM5eTBwSFlxUFdaOGdwWTNaVll0RkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik52S1FBdVBhRUdGcGpBa0cxK3h4TlNxVHRYc1dyYnE1OFdDQ3o4YzlsRHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0w5U05iUGpIVWJxVXM1Ty9RSkVMU2dKa1pHMEw5ODV6TU1RQk1oN3ZWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmRSVDNVWEFQak1DQmd3dXhGWTVsMDJLSTliTEhQU0I5bEZvMXZVUTFuMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InA1YUFvcnNya0NUUmwwVVY0a1ZiTDZLeUwrUEMrTnM0UkJvamhKVmw2cjdLeGswVktwdEVtdVc5d2JRVmE4VWtTT1FvaFBUUlNFZjZLY09jU0J2QmhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiJvYlpRTDVZT1B6bG9CdTNBYjRoSlZ6M0IraE9mYzJtNHlQM1NIMElWVTFZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZQ3I1NUtqcFEtV3hINC03Qkx3OFRnIiwicGhvbmVJZCI6ImE5MzgwYzVmLTlkNzktNGI3ZS05YmJhLWQzOTMwZThlZmQ2NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhd1BRQXpmcEh1d0dFMS84N2wzWTRvRFV3TFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHppQTRZMEo2a1JkbWVEWGgrekJRS1hvSFdJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilk0WUdLOEUyIiwibWUiOnsiaWQiOiIyMzM1MzU2NzkzOTQ6ODFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tMeWh2UUhFUGo5K0w4R0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InlzTTVhbGFPRWpxbkxDYzA5Qk5OMllyZ2NzdXFNNHdGaDhqUEFGUVkrM0E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFscEd2OWhUazJaVVZjV29VN1A5VHMxMHhkRFVMbHBIZGYydUdQUFRyQWozN2EzVzcrbXpzSWhCS1dBTHZjTTFKczQ2a3U1T001eGdEazE2bGo3dEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSZUUvTFZyWmZsVlFGZk9LbytLYTFhdEZsWW1oQ3R6MnVxZWdaS2s1aEV4TnZ5VWZJS0JlR0IxNnNyWUI3Q1RQaDhiUmFXTHA4SDJENjgvOUw4Q3ZqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzUzNTY3OTM5NDo4MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjckRPV3BXamhJNnB5d25OUFFUVGRtSzRITExxak9NQllmSXp3QlVHUHR3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ0NzE1NTI2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254735342808",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
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
