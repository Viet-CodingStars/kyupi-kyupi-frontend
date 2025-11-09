include .env.local

export

PORT ?= 5174

.PHONY: dev
dev:
	PORT=$(PORT) pnpm dev

.PHONY: build
build:
	pnpm build

.PHONY: start
start:
	PORT=$(PORT) pnpm start