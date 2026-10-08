const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "..", "data", "socios.json");
const socios = JSON.parse(fs.readFileSync(ruta, "utf-8"));

function fechaHoy(){
    return new Date().toLocaleDateString("en-CA");
}

function puedeEntrar(socio){
    if(socio.vencimiento >=fechaHoy()) {
        return `${socio.nombre}: acceso permitido`
    }
    return `${socio.nombre}: plan vencido`
}

for (const socio of socios) {
    console.log (puedeEntrar(socio));
}
