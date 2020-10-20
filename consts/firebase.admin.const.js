const admin = require("firebase-admin");

if( ! process.firebaseAdmin )
process.firebaseAdmin = admin;
else
console.log('Existing admin connection');

module.exports = admin;