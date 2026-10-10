# gym-access-api

Sistema simple de control de acceso para un gimnasio.

Verifica la fecha de vencimiento del plan de cada socio para decidir si puede entrar.

## Cómo correrlo

1. Instala [Node.js](https://nodejs.org)
2. Clona el repo
3. Ejecuta `node src/index.js`

## Estructura

- `src/index.js`: lógica principal
- `data/socios.json`: lista de socios

## Próximos pasos

- Guardar los socios en PostgreSQL
- Convertirlo en una API con Express