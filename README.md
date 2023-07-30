# Book Library with Node.js and MongoDB

## Required

- Nodejs
- MongoDB

## Run development mode

- `npm run start:dev`

## Run production mode

- `npm run start:prod`

## Run testing mode

- `npm run test`

## Features

- Book CRUD
- Input validation with joi
- Sanitization with helmet and express session to prevent security attacks like XSS
- Environmental variable validators
- Proper folder structure routes -> controller -> services -> repository
- Logging with wintson
- Proper validations from server side and exceptions with proper http status codes
- Filters with pagination and search
- Testing done with mocha and chai
- Can run by three modes(development, production and testing)

# Getting Started

- Clone the repository and install dependencies.

- Configure MongoDB and environmental variables(for development mode use ``.env.development`, for production mode use `.env`, for testing mode use `.env.test`). Use `.env.sample` for references.

- Run the application and access it at `http://localhost:{port}`.
