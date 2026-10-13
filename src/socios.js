const { cargarSocios, mostrarAccesos } = require("./socios");

try {
  cargarSocios();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

if (require.main === module) {
  // Ejecuciones de ejemplo:
  // agregarSocio("44.444.444-4", "Pepe", "2028-02-29");
  mostrarAccesos();
}

