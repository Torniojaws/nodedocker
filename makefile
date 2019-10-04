#!/bin/bash

# TAG is the latest Git commit hash

.PHONY: build
build:
	export TAG=$$(git rev-parse HEAD) && docker-compose build --force-rm

.PHONY: run
run:
	export TAG=$$(git rev-parse HEAD) && docker-compose up -d server
	
.PHONY: test
test:
	export TAG=$$(git rev-parse HEAD) && docker-compose up -d unittests
	npm test