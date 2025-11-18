# きゅぴきゅぴ Frontend

## Getting Started

1. Make sure you run backend docker successfully.

2. Install pnpm if you haven't

```bash
npm install -g pnpm
```

Reference: https://pnpm.io/installation

3. Launch

```bash
cp .env.local.example .env.local
make dev
```

3. Tada 🚀

Open [http://localhost:5174](http://localhost:5174) with your browser to see the result.

## Gitflow

```mermaid
flowchart LR

subgraph Designer [Linh - Designer]
D[design]
end

subgraph Developer [Tuấn - Developer]
F[feature/*]
DEV[develop]
MAIN[main]
end

D --> DEV
F --> DEV
DEV --> MAIN
```

```mermaid
sequenceDiagram
participant Linh as Linh (Designer)
participant Design as design branch
participant Dev as Tuấn (Dev)
participant Develop as develop branch
participant Feature as feature/*
participant Main as main

Linh->>Design: Update UI assets, push branch
Dev->>Design: Pull design updates
Dev->>Develop: Merge design -> develop
Dev->>Feature: Create feature/* branch
Feature->>Develop: Merge feature/* to develop
Develop->>Main: Release to main
```
