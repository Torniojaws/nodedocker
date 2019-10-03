# Node docker

A barebones dockerized Node+Express REST API that also uses a MySQL 8.0 docker image. 
Doesn't really do anything important, but is a nice demo project for implementing something based on it.

## Install

1. Copy the `.env-example` to `.env` and update the values to match your desired setup
1. Install docker and docker-compose, if not yet installed
1. Run `make build`, which will install the dockerized project

## Run

1. Do the install first, if not yet installed
1. `make run`
1. `curl localhost:3000/hello`

## Tests

- `make test`
  - Runs against the `unittests` container. See: [docker-compose.yml](docker-compose.yml) for specifics.

## Endpoints

For demonstration purposes, the IDs `1` and `2` are inserted by default. 
Use them in place of `:id` below.

| Method | Endpoint | Payload | Expected status | Example response |
|---|---|---|---|---|
| GET | /hello | - | 200 | { "success": true, "data": [{ "id": 1, "message": "Hello, My Name" }, { "id": 2, "message": "Yohoo, this Name" }] } |
| GET | /hello/:id | - | 200 | { "success": true, "data": [{ "id": 1, "message": "Hello, My Name" }] } |
| POST | /hello | { "name": "My Name" } | 201 | { "success": true, "data": { "id": 3, "message": "My Name" } }  |
| PUT | /hello/:id | { "name": "My name" } | 200 | { "success": true, "data": [{ "id": 1, "message": "My name" }] } |
| DELETE | /hello/:id | - | 204 | { } |