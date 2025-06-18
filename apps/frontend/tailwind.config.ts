import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import sharedTailwindConfig from '../../libs/tailwind-preset/tailwind.config';

const config: Config ={
  darkMode: 'class', // <==== esto debe estar sí o sí AQUÍ
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;