const crypto = require("crypto")
// This is just a helper, this is run locally and the result is kept in the server environment variables

// A password for encryption
const SECRET_KEY = "your-key"  // <- change-me

// creates a POWERFULL KEY TO SIGN THE TOKEN and Passwords BASED ON SECRET KEY
const sha = crypto.createHmac("sha256", SECRET_KEY).digest('base64')
console.log(sha)

