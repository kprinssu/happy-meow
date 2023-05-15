import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import * as fs from 'fs-extra';
import * as path from 'path';
import { spawn } from 'child_process';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    icon: './assets/icon.png',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
    {
      name: '@electron-forge/plugin-electronegativity',
      config: {
        isSarif: true,
      },
    },
  ],
  hooks: {
    readPackageJson: async (forgeConfig, packageJson) => {
      // only copy deps if there isn't any
      if (Object.keys(packageJson.dependencies).length === 0) {
        const originalPackageJson = await fs.readJson(path.resolve(__dirname, 'package.json'));
        const webpackConfigJs = require('./webpack.renderer.config.js');

        Object.keys(webpackConfigJs.externals).forEach(jsPkg => {
          packageJson.dependencies[jsPkg] = originalPackageJson.dependencies[jsPkg];
        });
      }

      return packageJson;
    },
    packageAfterPrune: async (_forgeConfig, buildPath) => {
      console.log(buildPath);
      return new Promise((resolve, reject) => {
        const yarnInstall = spawn('yarn', ['install'], {
          cwd: buildPath,
          stdio: 'inherit',
          shell: true
        });

        yarnInstall.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error('process finished with error code ' + code));
          }
        });

        yarnInstall.on('error', (error: unknown) => {
          reject(error);
        });
      });
    }
  },
};

export default config;

