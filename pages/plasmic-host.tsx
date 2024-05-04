import * as React from 'react';
import { registerAll } from '@/lib/code-components/registerAll';
import { PlasmicCanvasHost } from '@plasmicapp/react-web/lib/host';

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}

registerAll();