/// <reference types="vite/client" />

// SVG imports with ?react suffix
declare module '*.svg?react' {
  import React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
