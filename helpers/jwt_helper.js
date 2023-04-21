const { response } = require('express')
const jwt = require('jsonwebtoken')
//refresh secret token C3KGY1j6Zae2g4plKiZZZkOTjQhYXVSZ
//access secret Token ZIRNamvEZY4BKewRhCwVJevV1KBTkJPw 
module.exports = {
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) =>{
            const payload = {
                
            }

            const options = {
                expiresIn: '24h',
                issuer: "cultivecare.website",
                audience: `${userID}`
            }
            jwt.sign(payload, 'ZIRNamvEZY4BKewRhCwVJevV1KBTkJPw', options, (err, token) => {
                if (err){err}
                resolve(token)
            })
        })
    }
}