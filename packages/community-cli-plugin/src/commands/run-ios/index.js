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

import runIos from './runIos';

export type {RunIosCommandArgs} from './runIos';

const runIosCommand: Command = {
  name: 'run-ios',
  description: 'Build and run your app on the iOS Simulator or connected device.',
  func: runIos,
  options: [
    {
      name: '--project <string>',
      description: 'Path to the Xcode project (.xcodeproj) or workspace (.xcworkspace)',
    },
    {
      name: '--scheme <string>',
      description: 'Specify the Xcode scheme to use',
    },
    {
      name: '--configuration <string>',
      description: 'Specify the Xcode configuration to use',
      default: 'Debug',
    },
    {
      name: '--sdk <string>',
      description: 'Specify the SDK to build with',
    },
    {
      name: '--destination <string>',
      description: 'Specify the destination (simulator or device)',
      default: 'simulator',
    },
    {
      name: '--device [string]',
      description: 'Explicitly set device to use by name or UDID',
    },
    {
      name: '--deviceName <string>',
      description: 'Name of the device to use',
    },
    {
      name: '--udid <string>',
      description: 'UDID of the device to use',
    },
    {
      name: '--simulator <string>',
      description: 'Name of the Simulator to use',
      default: 'booted',
    },
    {
      name: '--list-devices',
      description: 'List available devices and simulators',
    },
    {
      name: '--binary-path <string>',
      description: 'Path to the binary (.app) to install',
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
      description: 'Enable verbose output',
      default: false,
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
    {
      name: '--frameworks <string>',
      description: 'Use frameworks when installing CocoaPods dependencies',
    },
  ],
};

export default runIosCommand;