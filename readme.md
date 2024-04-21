# Dataharbor Project

## Important Note on Environment Setup

Use **Node 20** for Dataharbor startup to ensure proper loading of environment variables and avoid errors or unexpected behavior

### Frontend

1. [React](https://react.dev/)
2. [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend

1. [Express](https://expressjs.com/)
2. [Sequelize](https://sequelize.org/)
3. [Postgres](https://www.postgresql.org/)

### How to run

1. Select correct node version: `nvm use 20`
2. Install pre-commit hooks: `npx simple-git-hooks`
3. Copy env files: `cp ./backend/.env.example ./backend/.env && cp ./frontend/.env.example && ./frontend/.env`
4. Install dependencies: `npm i`
5. Run database: `docker compose up -d`
6. Run migrations: `npm run db:migrate:up -w backend`
7. Run backend: `npm run dev -w backend` (`node -v` output should be >=20)
8. Run frontend: `npm run dev -w frontend` (`node -v` output should be >=20)
