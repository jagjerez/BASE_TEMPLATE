import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run FRONT_CHIMERA:serve',
        production: 'npx nx run FRONT_CHIMERA:serve-static',
      },
      ciWebServerCommand: 'npx nx run FRONT_CHIMERA:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
