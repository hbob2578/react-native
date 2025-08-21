/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import runAndroidCommand from '../index';

describe('run-android command', () => {
  test('should have correct name', () => {
    expect(runAndroidCommand.name).toBe('run-android');
  });

  test('should have a description', () => {
    expect(runAndroidCommand.description).toBeDefined();
    expect(typeof runAndroidCommand.description).toBe('string');
    expect(runAndroidCommand.description.length).toBeGreaterThan(0);
  });

  test('should have a function handler', () => {
    expect(runAndroidCommand.func).toBeDefined();
    expect(typeof runAndroidCommand.func).toBe('function');
  });

  test('should have options array', () => {
    expect(runAndroidCommand.options).toBeDefined();
    expect(Array.isArray(runAndroidCommand.options)).toBe(true);
    expect(runAndroidCommand.options.length).toBeGreaterThan(0);
  });

  test('should have mode option with default', () => {
    const modeOption = runAndroidCommand.options.find(opt => 
      opt.name.includes('--mode')
    );
    expect(modeOption).toBeDefined();
    expect(modeOption?.default).toBe('Debug');
  });

  test('should have appFolder option with default', () => {
    const appFolderOption = runAndroidCommand.options.find(opt => 
      opt.name.includes('--appFolder')
    );
    expect(appFolderOption).toBeDefined();
    expect(appFolderOption?.default).toBe('app');
  });

  test('should have verbose option', () => {
    const verboseOption = runAndroidCommand.options.find(opt => 
      opt.name.includes('--verbose')
    );
    expect(verboseOption).toBeDefined();
    expect(verboseOption?.default).toBe(false);
  });

  test('should have port option with default', () => {
    const portOption = runAndroidCommand.options.find(opt => 
      opt.name.includes('--port')
    );
    expect(portOption).toBeDefined();
    expect(portOption?.default).toBe(8081);
  });
});