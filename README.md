# CSE 341 Project 2 — Movies & Reviews API

A RESTful API for managing movies and their reviews, built with Express and MongoDB. Created for the CSE 341 (BYU) course, Project 2.

## Features

- Full CRUD for **movies** and **reviews**
- Request validation with `express-validator` (required fields, types, ranges, valid URLs/ObjectIds)
- Reviews are linked to movies via `movieId`, validated against existing movie documents
- Auto-generated, interactive API documentation via Swagger UI
- Centralized error handling and consistent JSON error responses

## Tech stack

- [Node.js](https://nodejs.org/) / [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (native driver, no ODM)
- [express-validator](https://express-validator.github.io/) for input validation
- [swagger-autogen](https://github.com/davibaltar/swagger-autogen) + [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) for API docs

## Getting started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone <repo-url>
cd cse-341-project2
npm install
```

### Configuration

Create a `.env` file in the project root:

```
MONGODB_URL=<your MongoDB connection string>
```

Optional — set a fixed Swagger host (useful for deployed environments; defaults to `localhost:3000` with HTTP+HTTPS schemes if unset):

```
SWAGGER_HOST=<your-deployed-host>
```

### Running the server

```bash
npm start
```

The server starts on `PORT` (default `3000`) once the MongoDB connection succeeds.

### Regenerating API docs

Swagger docs are pre-generated into `swagger.json` and served statically, so they must be regenerated after changing any route or controller:

```bash
node swagger.js
```

## API documentation

Once running, interactive Swagger docs are available at:

```
http://localhost:3000/api-docs
```

## Endpoints

### Movies

| Method | Endpoint       | Description       |
| ------ | -------------- | ------------------ |
| GET    | `/movies`      | Get all movies     |
| GET    | `/movies/:id`  | Get a single movie |
| POST   | `/movies`      | Create a movie     |
| PUT    | `/movies/:id`  | Update a movie     |
| DELETE | `/movies/:id`  | Delete a movie      |

**Movie fields:** `title`, `director`, `releaseYear`, `genre`, `runtimeMinutes`, `rating`, `synopsis`, `posterUrl`

### Reviews

| Method | Endpoint        | Description         |
| ------ | --------------- | -------------------- |
| GET    | `/reviews`      | Get all reviews       |
| GET    | `/reviews/:id`  | Get a single review   |
| POST   | `/reviews`      | Create a review       |
| PUT    | `/reviews/:id`  | Update a review       |
| DELETE | `/reviews/:id`  | Delete a review        |

**Review fields:** `movieId` (must reference an existing movie), `reviewerName`, `rating` (1–5), `comment`

Example requests for every endpoint are available in [`routes.rest`](./routes.rest) (usable with the VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension).

## Project structure

```
controllers/   Request handlers — talk to MongoDB, shape responses
middleware/     express-validator rule chains and shared validation middleware
routes/         Express routers, one per resource, plus the root router
data/           MongoDB connection singleton
swagger.js      Swagger doc generator script
swagger.json    Generated Swagger spec, served at /api-docs
server.js       App entry point
```

## Author

Andrew Awadike
