# App de tareas

## Requisitos para levantar

- Docker y docker-compose
- Node.js versión 20.10 o superior

## Para levantar

### Back

Desde el directorio `back` ejecutar: 

```bash
docker compose up
```

El backend se levantará en el puerto 5000

### Front

Desde el directorio `front` ejecutar: 

```bash
# Para instalar dependencias
npm install
```

```bash
# Para levantar
npm run dev
```

El frontend se levantará en el puerto 3000

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

## Endpoints Backend

Se diseñó un REST API con los siguientes endpoints:

`POST /api/task`: Crea tasks

Request Body de ejemplo:

```json
{
  "content": "Example task",
  "date": "29/12/2023"
}
```

`GET /api/tasks`: Retorna una lista de tasks. Soporta el query string `date` que acepta fechas en formato DD/MM/YYYY. Por ejemplo: `GET /api/tasks?date=28/12/2023`

`DELETE /api/task/{id}`: Elimina un task

`PATCH /api/task/{id}`: Modifica parcialmente un task. Se soporta actualizar el campo `isCompleted` (revisar `sequelize.js`)

Request Body de ejemplo:

```json
{
  "isCompleted": true
}
```

## Proceso

Se diseñó una interfaz usando Figma, el diseño se encuentra en el siguiente enlace: https://www.figma.com/file/kkhBD1oipXbj0txCj26hWT/BUMMOCK-Tasks-App?type=design&node-id=0%3A1&mode=design&t=5lnuLU4Eebt5ynwM-1

Se implementó el markup en el componente App.js y posteriormente se separaron los componentes en distintos archivos.

Se aplicaron estilos para replicar el diseño usando CSS Modules y se agregaron transiciones y animaciones.

Se programó interacción en React (usando Event Handlers, Hooks, etc) y se administró estado local usando useReducer (revisar rama `managingLocalStateWithUseReducer`).

Posteriormente, se implementó backend y se consumieron sus endpoints desde React. Se migró administración de estado local a React Query, ya que prácticamente todo el estado de la app era server state, que se administra en el back.

## Despliegue

Se desplegó versión local (rama `managingLocalStateWithUseReducer`) en Netlify.

**Cabe destacar que esta versión NO está del todo terminada, no persiste data en el navegador y el componente `DateSelector` aún no había sido implementado.**

Enlace despliegue: https://bummock-tasks-app.netlify.app/
