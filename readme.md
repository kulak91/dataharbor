# Dataharbor Project

## Important Note on Environment Setup

**It is critical to use Node 20 when starting Dataharbor.** Failing to do so will result in the environment variables not being loaded properly, which can lead to unexpected behavior or errors. Ensure that you configure your setup accordingly.

### Frontend

1. [React](https://react.dev/)
2. [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend

#### How to run

1. Select correct node version: **nvm use 20**
2. Copy env files: `cp ./backend/.env.example ./backend/.env && cp ./frontend/.env.example && ./frontend/.env`
3. Install dependencies: `npm i`
4. Run database: `docker compose up -d`
5. Run backend: `npm run dev -w backend`
6. Run frontend: `npm run dev -w frontend`

#### Stack

1. [Express](https://expressjs.com/)
2. [Sequelize](https://sequelize.org/)
3. [Postgres](https://www.postgresql.org/)
