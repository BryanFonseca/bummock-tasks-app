# App de tareas

## Requisitos para levantar

- Docker y docker-compose
- Node.js

## Para levantar

### Back

Desde el directorio `back` ejecutar: 

```
docker compose up
```

El backend se levantará en el puerto 5000

### Back

Desde el directorio `front` ejecutar: 
```
npm run dev
```

El backend se levantará en el puerto 3000

## Tecnologías usadas

### Front

- React
- React query
- CSS Modules

Como entorno de tooling se usó Vite.

### Back

- Node
- Express
- MySQL
- Sequelize
- Docker

## Proceso

Se diseñó una interfaz usando Figma, el diseño se encuentra en el siguiente enlace: https://www.figma.com/file/kkhBD1oipXbj0txCj26hWT/BUMMOCK-Tasks-App?type=design&node-id=0%3A1&mode=design&t=5lnuLU4Eebt5ynwM-1

Se implementó el markup en el componente App.js y posteriormente se separaron los componentes en distintos archivos.

Se aplicaron estilos para replicar el diseño usando CSS Modules. 

Se programó interacción en React (usando Event Handlers, Hooks, etc) y se administró estado local usando useReducer (rama `localState`)