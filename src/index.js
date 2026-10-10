const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "..", "data", "socios.json");

let socios;

try {
  socios = JSON.parse(fs.readFileSync(ruta, "utf-8"));
  if (!Array.isArray(socios)) {
    throw new Error("el archivo debe contener un arreglo de socios");
  }
} catch (error) {
  console.error("No se pudo leer socios.json:", error.message);
  process.exit(1);
}


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
