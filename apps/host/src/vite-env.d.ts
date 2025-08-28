/// <reference types="vite/client" />

// Module federation type declarations
declare module 'rick/App' {
  export function mount(element: HTMLElement): void;
}

declare module 'harry/App' {
  export function mount(element: HTMLElement): void;
}
