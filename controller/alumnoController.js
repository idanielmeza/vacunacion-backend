const Alumno = require('../models/alumno');
const bcryptjs = require('bcryptjs');
const {subirArchivo} = require('../helpers/uploadFiles')
const path = require('path');

const obtenerAlumnos = async (req,res)=>{

    try {
        const alumnos = await Alumno.find({enfermo: false}).limit(10);
        
        return res.json(alumnos)
        
    } catch (error) {
        return res.json({
            msg:'Hubo un error vuelve a intentarlo'
        })
    }

};

const obtenerEnfermos = async (req,res)=>{

    try {
        const alumnos = await Alumno.find({enfermo: true}).limit(10);
        
        return res.json(alumnos)
        
    } catch (error) {
        return res.json({
            msg:'Hubo un error vuelve a intentarlo'
        })
    }

};

const obtenerAlumno = async(req,res)=>{

    const {numControl} = req.params;

    try {
        
        const alumno = await Alumno.findOne({numControl})
        const certificado =  path.join(__dirname,'../uploads/',alumno.certificado);

        return res.json(alumno);

    } catch (error) {
        
        return res.json({
            msg:'Hubo un error'
        })
    }
};

const obtenerCertificado = async(req,res)=>{

    const {numControl} = req.params;

    try {
        
        const alumno = await Alumno.findOne({numControl})
        const certificado =  path.join(__dirname,'../uploads/',alumno.certificado);

        return res.sendFile(certificado);

    } catch (error) {
        
        return res.json({
            msg:'Hubo un error'
        })
    }
};

const agregarAlumno = async(req,res)=>{

    const alumno = new Alumno(req.body);

    //Encrypter password
    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(alumno.password, salt);

    alumno.enfermo = false;

    try {
        
        alumno.save();

        return res.json(alumno);

    } catch (error) {

        return res.json({
            msg: 'Hubo un error'
        })

    }

};

const alumnoEnfermo = async(req,res)=>{

    const {numControl} = req.params;

    try {
        
        const alumno = await Alumno.findOne({numControl});

        alumno.enfermo = true;

        alumno.fEnfermo = new Date();

        alumno.save();

        return res.json(alumno);

    } catch (error) {
        res.json({
            msg:'Hubo un error'
        })
    }

}

const alumnoSano = async(req,res)=>{

    const {numControl} = req.params;

    try {
        
        const alumno = await Alumno.findOne({numControl});

        alumno.enfermo = false;

        alumno.fEnfermo = null;

        alumno.save();

        return res.json(alumno);

    } catch (error) {
        res.json({
            msg:'Hubo un error'
        })
    }

}

const agregarDatos = async(req,res)=>{

    
    const {numControl} = req.params;
    const {fVacuna,tVacuna} =req.body;

    try {
        
        const alumno = await Alumno.findOne({numControl})
        const pathArchivo = await subirArchivo(req.files,alumno.numControl);
        alumno.fVacuna = new Date(fVacuna);
        alumno.tVacuna = tVacuna
        alumno.certificado = true;

        await alumno.save();

        return res.json(alumno);
        
    } catch (error) {
        console.log(error);
        return res.json({
            msg:'Hubo un error'
        })
    }
}

const grafica = async(req,res)=>{

    const opts = [
    {
        $group:{
            _id:'$tVacuna',
            count:{$sum: 1}
        }
    }
]

    const datos = await Alumno.aggregate(opts).exec()

    return res.json(datos);

}

const graficaEnfermos = async(req,res)=>{

    const opts = [
        {
            $match:{
                enfermo: true
            }
        },
        {
            $group:{
                _id:'$carrera',
                count:{$sum:1}
            }
        }
    ]

    const datos = await Alumno.aggregate(opts).exec()

    return res.json(datos);

}

module.exports ={
    obtenerAlumnos,
    obtenerAlumno,
    agregarAlumno,
    alumnoEnfermo,
    alumnoSano,
    agregarDatos,
    obtenerEnfermos,
    grafica,
    graficaEnfermos,
    obtenerCertificado
}