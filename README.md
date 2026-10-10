# gym-access-api

-Sistema simple de control de acceso para un gimnasio.
-Verifica la fecha de vencimiento del plan de cada socio para decidir si puede entrar.

> Proyecto de practica. Datos ficticios

## Que hace
- Lee la lista de socios desde `data/socios.json`
- Indica si cada socio puede entrar o si el plan esta vencido
- Registra socios con `id` automatico
- Normaliza al rut a un solo formato (sin puntos y con guion) evitando rut repetidos
- Valida el nombre y fecha de vencimiento previo a guardar
- Muestra mensaje claro si `socios.json` no existe o esta mal escrito

## Requisitos

- [Node.js](https://nodejs.org) (versión LTS)

No hay dependencias que instalar.

## Cómo correrlo

1. Instala [Node.js](https://nodejs.org)
2. Clona el repo
3. Ejecuta `node src/index.js`

Al final de `src/index.js` está la sección de ejecución. Ahí activas o comentas las llamadas a `mostrarAccesos()`, `listarSocios()` y `agregarSocio(...)`.

## Estructura

- `src/index.js`: lógica principal
- `data/socios.json`: lista de socios

## Formato de los datos

```json
{
  "id": 1,
  "rut": "11111111-1",
  "nombre": "Juan",
  "vencimiento": "2026-12-31"
}
```

- `rut`: sin puntos y con guion; la `K` va en mayúscula.
- `vencimiento`: formato `aaaa-mm-dd`.

## Próximos pasos

- Evitar nombres formados solo por espacios.
- Verificar que la fecha de vencimiento exista de verdad.
- Guardar los socios en PostgreSQL.
- Convertirlo en una API con Express.
- Generar un código QR por socio para el control de acceso.