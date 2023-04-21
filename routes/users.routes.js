const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { signAccessToken } = require('../helpers/jwt_helper')

//crear Usuario
router.post('/users',  (req, res) => {
    const user = userSchema(req.body);
    
    user
        .save()
        .then( async (data) => {
            const accessToken = await signAccessToken(data._id)
            res.send({accessToken})
            
        })
        .catch((error) => console.log(error)); //res.json({ message: error})

});
//validacion login
 router.post('/users/log', (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
        userSchema
        .find({email: { $eq : email}})
        .then(async function (data){
            
            let isEqual = await bycript.compare(password, data[0].password);
            
            if(isEqual){
                const accessToken = await signAccessToken(data[0]._id)
                
                res.send({accessToken})
                // res.status(202).send('Ha iniciado Sesion!!');
                
                // const payload = {
                //     id: data[0]._id,
                //     email: data[0].email
                // }

                // const options = {
                //     expiresIn: "24h",
                //     issuer: "cultiveCare"
                // }
                
                //  const token =  jwt.sign(payload, 'ZIRNamvEZY4BKewRhCwVJevV1KBTkJPw', options)

                //  console.log();
                // res.send({
                //     token,
                // });
                
            }
            
        })
        .catch((error) => res.status(401).send(`Tu Email o Contraseña son incorrectos ${error}`));
        // res.json({ message: error})); 

});

 router.post('/users/token', (req, res) => {
    
     const mycookie = req.body.Token

     if (mycookie) {
         try {
           // Decodifica el token y verifica su validez
           const decoded = jwt.verify(mycookie, 'ZIRNamvEZY4BKewRhCwVJevV1KBTkJPw');
           console.log(decoded);
           // Si el token es válido, el usuario está autenticado
           // y redirige a la página de la aplicación
           res.status(200).send({"place":"app"})
         } catch (error) {
           // Si el token no es válido, debes requerir que el usuario inicie sesión
           console.error('Error al verificar el token:', error);
           res.status(401).send({"place":"login"});
         }
       } else {
         // Si no hay una cookie de autenticación presente,
         // debes requerir que el usuario inicie sesión
         console.log('El usuario debe iniciar sesión no hay cookie');
         res.status(403).send({"place":"login"});
       }
     });

     router.get('/users/find', (req, res) => {
        userSchema.find()
        .then(data => res.json(data))
     })
//     router.post('/users/ref-token', (req, res) => {
//         expiredtoken = req.body.token

//     })

module.exports = router;
