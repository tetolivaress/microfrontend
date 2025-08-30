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
  Documentation: https://github.com/originjs/vite-plugin-federation

## Project Structure

This is a monorepo working with microfrontends that contains:

- `apps/host` – Shell/host application that consumes remote microfrontends
- `apps/harry` – Remote microfrontend
- `apps/rick` – Remote microfrontend

## Installation

From the repo root:

```bash
pnpm install
```

## Running the Project

### Quick Start (All Projects)

To run all three projects simultaneously:

```bash
pnpm dev:host
```

**Important**: When executing this command, you need to wait for all three servers to be running before the application is fully functional.

### Production Mode Setup

For the host project to work properly, you need to run the microfrontends (`harry` and `rick`) in **production mode** first and independently:

1. **Build and run Harry microfrontend:**
   ```bash
   cd apps/harry
   pnpm build
   pnpm preview
   ```

2. **Build and run Rick microfrontend:**
   ```bash
   cd apps/rick
   pnpm build
   pnpm preview
   ```

3. **Then run the host project:**
   ```bash
   cd apps/host
   pnpm dev
   ```

### Running Individual Projects

To run each project independently in **development mode**:

```bash
# For Harry microfrontend
cd apps/harry
pnpm dev

# For Rick microfrontend  
cd apps/rick
pnpm dev

# For Host application
cd apps/host
pnpm dev
```

**Note**: In development mode, microfrontends cannot be consumed by the host project. To make them available to the host, you must run them in production mode using `pnpm build` followed by `pnpm preview`.

## Development Workflow

1. **Development**: Use `pnpm dev` in individual app directories for isolated development
2. **Integration Testing**: Use `pnpm build` + `pnpm preview` for microfrontends, then run the host
3. **Full Development**: Use `pnpm dev:host` to run everything together (wait for all servers to start)

## Testing

This project uses **Vitest** for testing with React Testing Library for component testing.

### Running All Tests

To run tests across all applications in the monorepo:

```bash
# From the repo root
pnpm test
```

### Running Tests for Individual Apps

To run tests for a specific application:

```bash
# For Host application
cd apps/host
pnpm test

# For Harry microfrontend
cd apps/harry
pnpm test

# For Rick microfrontend
cd apps/rick
pnpm test
```

### Test Configuration

- **Test Runner**: Vitest
- **Testing Library**: React Testing Library

## Architecture

This microfrontend setup uses Vite's Module Federation plugin to enable:
- Independent development and deployment of each microfrontend
- Runtime composition of applications