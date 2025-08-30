# Microfrontend Monorepo (Vite + Module Federation)

This repository is a **monorepo** that implements a **microfrontend** architecture using **Vite** and **@originjs/vite-plugin-federation**.

## Requirements

- **Node.js**: `22.16`
- **pnpm**: latest recommended

> Check your versions:
>
> ```bash
> node -v
> pnpm -v
> ```

## Tech Stack

- **Vite**
- **@originjs/vite-plugin-federation**  
  Docs: https://github.com/originjs/vite-plugin-federation

## Apps

- `apps/host` – Shell/host application that consumes remote microfrontends
- `apps/harry` – Remote microfrontend
- `apps/rick` – Remote microfrontend

## Install

From the repo root:

```bash
pnpm install