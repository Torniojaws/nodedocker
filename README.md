# Node docker

A barebones dockerized Node+Express REST API.

## Install

`docker build -t my/nodedocker:v1 .`

## Run (after install)

1. `docker run my/nodedocker -p 3000:3000 -d`
1. `curl localhost:3000`

## Tests

`npm test`

## Endpoints

For demonstration purposes, use `123` in place of `:id` below.

| Method | Endpoint | Payload | Example response |
|---|---|---|---|
| GET | /hello | - | { "success": true, "data": "Hello" } |
| GET | /hello/:id | - | { "success": true, "data": "Hello, My Name" } |
| POST | /hello | { "name": "My Name" } | { "success": true, "data": "Hello, My Name" } |
| PUT | /hello/:id | { "name": "My name" } | { "success": true, "data": "I am now up to date, My Name" } |
| DELETE | /hello/:id | - | { "success": true, "data": "Bye bye, My Name>" } |