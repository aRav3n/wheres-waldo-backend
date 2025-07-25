# Photo Finder App Backend

## Table of Contents

- [Description](#description)
- [Usage and Screenshots](#usage-and-screenshots)
- [Technologies Used](#technologies-used)
- [Dependencies and Credits](#dependencies-and-credits)
- [Project Structure](#project-structure)

## Description

RESTful API created as as a part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Usage and Screenshots

<img src="./public/screenshot.png" alt="screenshot" style="height: 50vh; width: auto;">

Here's a brief description of how to use the app.

- [Link to live preview](https://98256945.wheres-waldo-frontend-top.pages.dev/)
- [Link to frontend repo](https://github.com/aRav3n/wheres_waldo_frontend_TOP)

### Features

- Uses CORS to verify that the request is coming from a valid address

## Technologies Used

### Backend          
- <a href="https://nodejs.org"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" style="height: 2rem; width: auto;"> Node.js</a>
- <a href="https://expressjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" style="height: 2rem; width: auto;"> Express</a>
- <a href="https://www.postgresql.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" style="height: 2rem; width: auto;"/> PostgreSQL</a>
- <a href="https://www.prisma.io/"><img src="https://skillicons.dev/icons?i=prisma" style="height: 2rem; width: auto;"/> Prisma ORM</a>
- <a href="https://www.typescriptlang.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" style="height: 2rem; width: auto;"/> TypeScript</a>
- <a href="https://jestjs.io/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" style="height: 2rem; width: auto;"/> Jest</a>

### Development Tools

- <a href="https://code.visualstudio.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" style="height: 24px; width: auto;"/> VS Code</a>
- <a href="https://www.npmjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" style="height: 24px; width: auto;"/> NPM</a>
- <a href="https://git-scm.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" style="height: 24px; width: auto;"/> Git</a>

### Hosting

- <a href="https://github.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" style="height: 24px; width: auto;"/> Github</a>
- <a href="https://neon.com/"><img src="https://neon.com/brand/neon-logomark-light-color.svg" style="height: 24px; width: auto;"/> Neon</a>
- <a href="https://render.com/"><img src="https://render.com/icon.svg" style="height: 24px; width: auto;"/> Render</a>

## Dependencies and Credits

### Package Dependencies

- [@prisma/extension-accelerate](https://www.npmjs.com/package/@prisma/extension-accelerate)
- [@prisma/client](https://www.npmjs.com/package/@prisma/client)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [pg](https://www.npmjs.com/package/pg)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [supertest](https://www.npmjs.com/package/supertest)
- [tsx](https://www.npmjs.com/package/tsx)

### Other Credits

- [Devicion](https://devicon.dev/)
- [Skillicons](https://skillicons.dev/)


## Project Structure

```bash

├──controllers/            # Controller files
├──db/                     # Compiled queries.js file
├──prisma/                 # Prisma models and migrations
├──public/                 # Locally hosted image files
├──routes/                 # Router files
├──src/                    # Base queries.ts file
└──test/                   # Test files

```
