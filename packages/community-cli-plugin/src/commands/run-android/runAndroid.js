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

import {android} from '@react-native/core-cli-utils';
import path from 'path';

export type RunAndroidCommandArgs = {
  mode?: string,
  variant?: string,
  appFolder?: string,
  appId?: string,
  appIdSuffix?: string,
  mainActivity?: string,
  deviceId?: string,
  listDevices?: boolean,
  binaryPath?: string,
  port?: number,
  terminal?: string,
  bundleOutput?: string,
  packager?: boolean,
  verbose?: boolean,
  createBundleDir?: boolean,
  generateBundle?: boolean,
  gradleArgs?: Array<string>,
  hermes?: boolean,
  newArchitecture?: boolean,
};

async function runAndroid(
  _argv: Array<string>,
  cliConfig: Config,
  args: RunAndroidCommandArgs,
): Promise<void> {
  const {
    mode = 'Debug',
    appFolder = 'app',
    gradleArgs = [],
    hermes,
    newArchitecture,
    verbose = false,
  } = args;

  // Determine the Android project directory
  const projectRoot = cliConfig.root;
  const androidProjectPath = path.join(projectRoot, 'android');

  if (verbose) {
    console.log(`Running Android app in ${mode} mode`);
    console.log(`Project root: ${projectRoot}`);
    console.log(`Android project path: ${androidProjectPath}`);
  }

  try {
    // Configure the Android tasks
    const androidTasks = android({
      cwd: androidProjectPath,
      mode: mode,
      name: appFolder,
      hermes,
      newArchitecture,
    });

    // Step 1: Assemble the app
    if (verbose) {
      console.log('Assembling Android app...');
    }
    await androidTasks.assemble(...gradleArgs).run.execute();

    // Step 2: Install the app
    if (verbose) {
      console.log('Installing Android app...');
    }
    await androidTasks.install(...gradleArgs).run.execute();

    console.log('✅ Android app has been built and installed successfully!');
    console.log('📱 The app should now be available on your device/emulator.');
    
    if (!args.packager) {
      console.log('💡 You may need to start Metro bundler separately with: npx react-native start');
    }
  } catch (error) {
    console.error('❌ Failed to run Android app:', error.message);
    if (verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

export default runAndroid;