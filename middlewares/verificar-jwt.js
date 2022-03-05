const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const validarJWT = async(req,res,next)=>{

    const token = req.header('user-token');

    if(!token){
        return res.redirect('auth/login')
    }

    try {
        const {uid} = jwt.verify(token, 'tokenstecbyledezmadev');
        
        let usuario;

        usuario = await Alumno.findById(uid);
        
        if(!usuario){
            await Maestro.findById(uid);
        }

        if(!usuario){
            return res.status(401).json({msg: 'Token no valido - Usuario no existe'})
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error)
        return res.redirect('auth/login')
    }

}

module.exports ={
    validarJWT
}