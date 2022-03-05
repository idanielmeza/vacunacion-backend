const Maestro = require('../models/maestro');
const bcryptjs = require('bcryptjs');

const agregarMaestro = async(req,res)=>{
    
    const maestro = new Maestro(req.body);
    const salt = bcryptjs.genSaltSync();
    maestro.password = bcryptjs.hashSync(maestro.password, salt);

    try {

        maestro.save();
        return res.status(200).json(maestro);

    } catch (error) {
        return res.json({
            msg: 'Hubo un error'
        })
    }

}

module.exports ={
    agregarMaestro
}