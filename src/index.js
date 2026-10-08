function fechaHoy(){
    return new Date().toLocaleDateString("en-CA");
}

function puedeEntrar(socio){
    if(socio.vencimiento >=fechaHoy()) {
        return `${socio.nombre}: acceso permitido`
    }
    return `${socio.nombre}:plan vencido`
}
const socios = [
  { nombre: "Juan", vencimiento: "2026-05-15" }, 
  { nombre: "Ana", vencimiento: "2026-12-31" },
  { nombre: "Luis", vencimiento: fechaHoy() }, 
];
for (const socio of socios) {
    console.log (puedeEntrar(socio));
}
