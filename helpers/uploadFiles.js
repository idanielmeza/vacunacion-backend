const path = require('path');
const subirArchivo = (files, numControl)=>{

    return new Promise((resolve, reject)=>{

        const {archivo} = files;

        const nombre = numControl + '.pdf';
        const uploadPath =path.join( __dirname, '../uploads/' ,nombre );

        archivo.mv(uploadPath, (err)=> {
            if (err) {
                reject(err);
            }
            resolve(nombre);
        });

    })

    

}

module.exports = {
    subirArchivo
}