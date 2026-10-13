const fs = require("fs");
const path = require("path");

function createSociosManager(filePath = path.join(__dirname, "..", "data", "socios.json")) {
  let socios = [];

  function cargarSocios() {
    try {
      const archivo = fs.readFileSync(filePath, "utf-8");
      const datos = JSON.parse(archivo);

      if (!Array.isArray(datos)) {
        throw new Error("el archivo debe contener un arreglo de socios");
      }

      socios = datos;
      return socios;
    } catch (error) {
      const detalle = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo leer socios.json: ${detalle}`);
    }
  }

  function guardarSocios() {
    fs.writeFileSync(filePath, JSON.stringify(socios, null, 2));
  }

  function listarSocios() {
    for (const socio of socios) {
      console.log(`Nombre: ${socio.nombre}`);
      console.log(`Fecha de vencimiento: ${socio.vencimiento}`);
    }
  }

  function agregarSocio(rut, nombre, vencimiento) {
    const rutNormal = normalizeRut(rut);

    if (!rutNormal) {
      console.error("Rut invalido");
      return false;
    }

    if (!validarNombre(nombre)) {
      console.error("Nombre invalido");
      return false;
    }

    if (!isValidIsoDate(vencimiento)) {
      console.error("Fecha inexistente");
      return false;
    }

    if (socios.some((s) => s.rut === rutNormal)) {
      console.error("Rut ya existente");
      return false;
    }

    const id = socios.length ? Math.max(...socios.map((s) => s.id)) + 1 : 1;
    socios.push({ id, rut: rutNormal, nombre: nombre.trim(), vencimiento });
    guardarSocios();
    return true;
  }

  function puedeEntrar(socio) {
    const vencimiento = socio?.vencimiento;
    if (vencimiento && isValidIsoDate(vencimiento) && vencimiento >= getTodayISO()) {
      return `${socio.nombre}: acceso permitido`;
    }
    return `${socio.nombre}: plan vencido`;
  }

  function mostrarAccesos() {
    for (const socio of socios) {
      console.log(puedeEntrar(socio));
    }
  }

  return {
    cargarSocios,
    guardarSocios,
    listarSocios,
    agregarSocio,
    puedeEntrar,
    mostrarAccesos,
    getSocios: () => socios,
    getRuta: () => filePath,
  };
}

function limpiarRut(rut) {
  return String(rut ?? "").replace(/[.\-\s]/g, "").toUpperCase();
}

function formatoRutValido(rutLimpio) {
  return /^\d{7,8}[0-9K]$/.test(rutLimpio);
}

function normalizeRut(rut) {
  const limpio = limpiarRut(rut);
  if (!formatoRutValido(limpio)) {
    return null;
  }
  return limpio.slice(0, -1) + "-" + limpio.slice(-1);
}

function validarNombre(nombre) {
  return typeof nombre === "string" && nombre.trim() !== "";
}

function isValidIsoDate(texto) {
  if (typeof texto !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    return false;
  }

  const [anio, mes, dia] = texto.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);

  return (
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  );
}

function getTodayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const fechaLocal = new Date(d.getTime() - offset * 60000);
  return fechaLocal.toISOString().slice(0, 10);
}

const ruta = path.join(__dirname, "..", "data", "socios.json");
const manager = createSociosManager(ruta);

module.exports = {
  createSociosManager,
  limpiarRut,
  formatoRutValido,
  normalizeRut,
  validarNombre,
  isValidIsoDate,
  getTodayISO,
  ...manager,
};

