const crypto = require('crypto');

const key1 = crypto.randomBytes(32).toString('hex')
const key2 = crypto.randomBytes(32).toString('hex')

console.log(`ACCESS_TOKEN_SECRET=${key1}`);
console.log(`REFRESH_TOKEN_SECRET=${key2}`);