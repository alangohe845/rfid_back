const mediciones= require("../models/Mediciones")

const findAllmediciones = async(req, res) => {
    const datos= await mediciones.find()
    res.send(datos)
}
module.exports = {
    findAllmediciones
}