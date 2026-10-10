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

function limpiarRut(rut) {
    return String(rut).replace(/[.\-\s]/g,"").toUpperCase(); //limpia el rute elimando puntos guiones y espacios en blanco, tambien pasa a mayusculas las letras como la K
}

function formatoRutValido(rutLimpio) {
  // 7 u 8 digitos y un digito verificador (0-9 o K)
  return /^\d{7,8}[0-9K]$/.test(rutLimpio);
}

function normalizarRut(rut) {
  const limpio = limpiarRut(rut);
  if (!formatoRutValido(limpio)) return null;
  return limpio.slice(0, -1) + "-" + limpio.slice(-1);
}

function listarSocios (){
    for (const socio of socios) {
        console.log (`Nombre: ${socio.nombre}`);
        console.log (`Fecha de vencimiento: ${socio.vencimiento}`);
    }
}
    function agregarSocio (rut, nombre, vencimiento){
        const rutNormal = normalizarRut(rut);
        if (!rutNormal) {
            console.error("Rut invalido");
            return;
        }
        if (!nombre || !/^\d{4}-\d{2}-\d{2}$/.test(vencimiento)) {      //verificar formato nombre y vencimiento
            console.error("Datos invalidos, ingrese un nombre y fecha de vencimiento valido (aaaa-mm-dd)");
        return;
        }
        if (socios.some((s) => s.rut === rutNormal)) {                  // verificar si el rut ya es existente
            console.error ("Rut ya existente");
            return;
        }
    const id = socios.length ? Math.max(...socios.map((s) => s.id)) + 1 : 1;   //asignar id verificando cual es el numero mas alto para sumarle uno
    socios.push({ id, rut: rutNormal, nombre, vencimiento });         //agregar nuevo objeto al arreglo de la memoria
    fs.writeFileSync(ruta, JSON.stringify (socios, null, 2));
}



function puedeEntrar(socio){
    if(socio.vencimiento >=fechaHoy()) {
        return `${socio.nombre}: acceso permitido`;
    }
    return `${socio.nombre}: plan vencido`;
}

function mostrarAccesos() {
  for (const socio of socios) {
    console.log(puedeEntrar(socio));
  }
}

// ejecucion
mostrarAccesos(); 
//agregarSocio("44444444-4", "Pepe", "31-01-2027");
// listarSocios();
