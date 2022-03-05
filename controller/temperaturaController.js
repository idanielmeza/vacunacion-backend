const Temperatura = require('../models/temperatura');
const Alumno = require('../models/alumno');

const obtenerTemperaturas = async(req,res)=>{

    const {numControl} = req.params;

    try {

        const alumno = await Alumno.findOne({numControl});

        if(!alumno){
            return res.json({
                msg:'Alumno no encontrado'
            })
        }
        
        const temperaturas = await Temperatura.find({alumno: alumno._id}).sort({fecha:'desc'}).limit(5);

        return res.json({
            temperaturas,
            alumno
        });

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            msg:'Hubo un error'
        })
    }

}

const agregarTemperatura = async(req,res)=>{

    const {numControl} = req.body;
    try {
        
        const alumno = await Alumno.findOne({numControl});

        const datos ={
            alumno: alumno._id,
            temperatura: req.body.temperatura,
            fecha: new Date()
        }

        const temperatura = new Temperatura(datos);

        await temperatura.save();

        if(req.body.temperatura > 37.2){
            alumno.enfermo = true;
            alumno.fEnfermo = new Date();
            alumno.save();

            return res.json({
                msg:'Alumno enfermo, regresarlo a casa'
            })
        }

        return res.json({
            msg:'Agregado Correctamente'
        })

    } catch (error) {
        return res.json({
            msg:"Hubo un error"
        })
    }

}

module.exports ={
    obtenerTemperaturas,
    agregarTemperatura
}