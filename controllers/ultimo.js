const lector= require("../models/Mediciones")

const findAllmediciones = async(req, res) => {
    const datos= await lector.find().sort({$natural:-1}).limit(1)
    res.send(datos)
}
module.exports = {
    findAllmediciones
}