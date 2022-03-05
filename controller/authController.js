const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const login= async(req,res)=>{

    const {numControl,password,tipo} = req.body;
    try {

        let usuario;


        if(tipo == 'alumno'){
            //Verificar si el email existe
            usuario = await Alumno.findOne({numControl});
            if(!usuario){
                return res.status(400).json({msg: 'Usuario/Contraseña Incorrecto - Correo'})
            }
        }else{
            usuario = usuario = await Maestro.findOne({numControl});
            if(!usuario){
                return res.status(400).json({msg: 'Usuario/Contraseña Incorrecto - Correo'})
            }
        }
        

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({mgs: 'Usuario/Contraseña Incorrecto Contraseña'})
        }

        //Generar JWT
        const token = await generarJWT(usuario._id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}

const renovarToken = async(req,res)=>{

    const {usuario} = req;

    const token = await generarJWT( usuario._id );

    res.json({
        usuario,
        token
    })

}

module.exports={
    login,
    renovarToken
}