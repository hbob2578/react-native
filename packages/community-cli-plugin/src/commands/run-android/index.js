/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {Command} from '@react-native-community/cli-types';

import runAndroid from './runAndroid';

export type {RunAndroidCommandArgs} from './runAndroid';

const runAndroidCommand: Command = {
  name: 'run-android',
  description: 'Build and run your app on a connected Android device or emulator.',
  func: runAndroid,
  options: [
    {
      name: '--mode <string>',
      description: 'Specify your app\'s build mode',
      default: 'Debug',
    },
    {
      name: '--variant <string>',
      description: 'Specify your app\'s build variant',
    },
    {
      name: '--appFolder <string>',
      description: 'Specify a different application folder name for the android source',
      default: 'app',
    },
    {
      name: '--appId <string>',
      description: 'Specify an applicationId to launch after build',
    },
    {
      name: '--appIdSuffix <string>',
      description: 'Specify an applicationIdSuffix to launch after build',
    },
    {
      name: '--main-activity <string>',
      description: 'Name of the activity to start',
      default: 'MainActivity',
    },
    {
      name: '--deviceId <string>',
      description: 'builds your app and starts it on a specific device/simulator with the given device id (listed by running "adb devices" on the command line).',
    },
    {
      name: '--list-devices',
      description: 'Lists available Android devices and simulators and let you choose one to run the app',
    },
    {
      name: '--binary-path <string>',
      description: 'Path relative to project root where pre-built .apk binary lives',
    },
    {
      name: '--port <number>',
      description: 'The port where the packager server is listening on',
      default: 8081,
      parse: (val: string): number => Number(val),
    },
    {
      name: '--terminal <string>',
      description: 'Launches the Metro Bundler in a new window using the specified terminal path',
    },
    {
      name: '--bundle-output <string>',
      description: 'File name where to store the resulting bundle',
    },
    {
      name: '--packager',
      description: 'Disable auto start of Metro bundler',
      default: true,
    },
    {
      name: '--verbose',
      description: 'Do not use verbose output. Useful for hiding compilation output from React Native builds',
      default: false,
    },
    {
      name: '--create-bundle-dir',
      description: 'Create bundle output directory if it does not exist',
      default: false,
    },
    {
      name: '--generate-bundle',
      description: 'Force bundle generation',
      default: false,
    },
    {
      name: '--gradle-args <string>',
      description: 'Pass additional arguments to gradle',
      parse: (val: string): Array<string> => 
        val.split(' ').filter(arg => arg.trim() !== ''),
      default: [],
    },
    {
      name: '--hermes',
      description: 'Enable Hermes JavaScript engine',
      default: undefined,
    },
    {
      name: '--new-architecture',
      description: 'Enable React Native new architecture',
      default: undefined,
    },
  ],
};

export default runAndroidCommand;