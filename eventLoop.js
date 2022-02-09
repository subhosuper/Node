const crypto = require('crypto');
const start = Date.now();

crypto.pbkdf2("password", "salt", 1001, 1024, "sha512", (err, derKey)=>{
    console.log(Date.now() - start, "Password encrypted: " + derKey.toString());
});
