/// <reference types="vite/client" />

// SVG imports with ?react suffix
declare module '*.svg?react' {
  import React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Module federation type declarations
declare module 'rick/App' {
  export function mount(element: HTMLElement, { language }: { language: string }): void;
}

declare module 'harry/App' {
  export function mount(element: HTMLElement, { language }: { language: string }): void;
}
