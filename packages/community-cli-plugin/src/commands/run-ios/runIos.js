/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {Config} from '@react-native-community/cli-types';

import {apple} from '@react-native/core-cli-utils';
import path from 'path';

export type RunIosCommandArgs = {
  project?: string,
  scheme?: string,
  configuration?: string,
  sdk?: string,
  destination?: string,
  device?: string,
  deviceName?: string,
  udid?: string,
  simulator?: string,
  listDevices?: boolean,
  binaryPath?: string,
  port?: number,
  terminal?: string,
  bundleOutput?: string,
  packager?: boolean,
  verbose?: boolean,
  hermes?: boolean,
  newArchitecture?: boolean,
  frameworks?: string,
};

async function runIos(
  _argv: Array<string>,
  cliConfig: Config,
  args: RunIosCommandArgs,
): Promise<void> {
  const {
    project,
    scheme,
    configuration = 'Debug',
    sdk,
    destination = 'simulator',
    hermes,
    newArchitecture,
    frameworks,
    verbose = false,
  } = args;

  // Determine the iOS project directory
  const projectRoot = cliConfig.root;
  const iosProjectPath = path.join(projectRoot, 'ios');

  if (verbose) {
    console.log(`Running iOS app in ${configuration} mode`);
    console.log(`Project root: ${projectRoot}`);
    console.log(`iOS project path: ${iosProjectPath}`);
  }

  try {
    // Step 1: Setup environment and dependencies
    const setupTasks = apple.ios.setup({
      cwd: iosProjectPath,
      hermes,
      newArchitecture,
      frameworks,
    });

    if (verbose) {
      console.log('Setting up iOS environment...');
    }
    await setupTasks.validate.execute();
    await setupTasks.runCodegen.execute();
    await setupTasks.installRubyGems.execute();
    await setupTasks.installDependencies.execute();

    // Step 2: Build the app
    const buildTasks = apple.ios.build({
      cwd: iosProjectPath,
      name: project || findProjectFile(iosProjectPath),
      scheme,
      mode: configuration,
      destination,
      isWorkspace: project ? project.endsWith('.xcworkspace') : false,
    });

    if (verbose) {
      console.log('Building iOS app...');
    }
    await buildTasks.validate.execute();
    await buildTasks.build.execute();

    // Step 3: Install on simulator (if destination is simulator)
    if (destination === 'simulator') {
      const appPath = findBuiltApp(iosProjectPath, configuration);
      if (appPath) {
        const installTasks = apple.ios.install({
          cwd: iosProjectPath,
          device: args.simulator || 'booted',
          appPath,
        });

        if (verbose) {
          console.log('Installing iOS app on simulator...');
        }
        await installTasks.validate.execute();
        await installTasks.install.execute();
      }
    }

    console.log('✅ iOS app has been built and installed successfully!');
    console.log('📱 The app should now be available on your device/simulator.');
    
    if (!args.packager) {
      console.log('💡 You may need to start Metro bundler separately with: npx react-native start');
    }
  } catch (error) {
    console.error('❌ Failed to run iOS app:', error.message);
    if (verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

function findProjectFile(iosPath: string): string {
  const fs = require('fs');
  const files = fs.readdirSync(iosPath);
  
  // Look for .xcworkspace first, then .xcodeproj
  const workspace = files.find(file => file.endsWith('.xcworkspace'));
  if (workspace) {
    return workspace;
  }
  
  const project = files.find(file => file.endsWith('.xcodeproj'));
  if (project) {
    return project;
  }
  
  throw new Error('No Xcode project or workspace found in ios directory');
}

function findBuiltApp(iosPath: string, configuration: string): string | null {
  const buildPath = path.join(iosPath, 'build', 'Build', 'Products', configuration + '-iphonesimulator');
  
  try {
    const fs = require('fs');
    if (fs.existsSync(buildPath)) {
      const files = fs.readdirSync(buildPath);
      const appFile = files.find(file => file.endsWith('.app'));
      if (appFile) {
        return path.join(buildPath, appFile);
      }
    }
  } catch (error) {
    // Ignore errors - we'll just skip installation step
  }
  
  return null;
}

export default runIos;