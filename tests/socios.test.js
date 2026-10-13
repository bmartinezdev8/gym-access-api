const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { createSociosManager, normalizeRut, isValidIsoDate, getTodayISO } = require("../src/socios");

describe("Validaciones de socios", () => {
  it("normaliza un RUT con puntos y espacios", () => {
    assert.equal(normalizeRut("12.345.678-9"), "12345678-9");
    assert.equal(normalizeRut(" 12 345 678 - 9 "), "12345678-9");
  });

  it("rechaza un RUT con formato incorrecto", () => {
    assert.equal(normalizeRut("12345"), null);
    assert.equal(normalizeRut("aabbccdd"), null);
  });

  it("acepta fechas ISO válidas", () => {
    assert.equal(isValidIsoDate("2027-12-31"), true);
    assert.equal(isValidIsoDate("2027-02-30"), false);
    assert.equal(isValidIsoDate("2027/12/31"), false);
  });

  it("la fecha actual se genera en formato ISO", () => {
    assert.match(getTodayISO(), /^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("Gestión de socios", () => {
  it("agrega un socio nuevo y guarda correctamente", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "socios-"));
    const archivo = path.join(dir, "socios.json");
    fs.writeFileSync(archivo, JSON.stringify([{ id: 1, rut: "11111111-1", nombre: "Juan", vencimiento: "2026-12-31" }], null, 2));

    const manager = createSociosManager(archivo);
    manager.cargarSocios();
    const ok = manager.agregarSocio("12345678-5", " Ana ", "2027-01-31");

    assert.equal(ok, true);
    assert.equal(manager.getSocios().length, 2);
    assert.equal(manager.getSocios()[1].rut, "12345678-5");
    assert.equal(manager.getSocios()[1].nombre, "Ana");
  });

  it("no permite duplicar un RUT", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "socios-dup-"));
    const archivo = path.join(dir, "socios.json");
    fs.writeFileSync(archivo, JSON.stringify([{ id: 1, rut: "11111111-1", nombre: "Juan", vencimiento: "2026-12-31" }], null, 2));

    const manager = createSociosManager(archivo);
    manager.cargarSocios();
    const ok = manager.agregarSocio("11111111-1", "Luis", "2027-01-31");

    assert.equal(ok, false);
    assert.equal(manager.getSocios().length, 1);
  });
});

