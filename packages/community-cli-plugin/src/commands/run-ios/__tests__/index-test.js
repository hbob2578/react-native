/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import runIosCommand from '../index';

describe('run-ios command', () => {
  test('should have correct name', () => {
    expect(runIosCommand.name).toBe('run-ios');
  });

  test('should have a description', () => {
    expect(runIosCommand.description).toBeDefined();
    expect(typeof runIosCommand.description).toBe('string');
    expect(runIosCommand.description.length).toBeGreaterThan(0);
  });

  test('should have a function handler', () => {
    expect(runIosCommand.func).toBeDefined();
    expect(typeof runIosCommand.func).toBe('function');
  });

  test('should have options array', () => {
    expect(runIosCommand.options).toBeDefined();
    expect(Array.isArray(runIosCommand.options)).toBe(true);
    expect(runIosCommand.options.length).toBeGreaterThan(0);
  });

  test('should have configuration option with default', () => {
    const configOption = runIosCommand.options.find(opt => 
      opt.name.includes('--configuration')
    );
    expect(configOption).toBeDefined();
    expect(configOption?.default).toBe('Debug');
  });

  test('should have destination option with default', () => {
    const destOption = runIosCommand.options.find(opt => 
      opt.name.includes('--destination')
    );
    expect(destOption).toBeDefined();
    expect(destOption?.default).toBe('simulator');
  });

  test('should have simulator option with default', () => {
    const simOption = runIosCommand.options.find(opt => 
      opt.name.includes('--simulator')
    );
    expect(simOption).toBeDefined();
    expect(simOption?.default).toBe('booted');
  });

  test('should have verbose option', () => {
    const verboseOption = runIosCommand.options.find(opt => 
      opt.name.includes('--verbose')
    );
    expect(verboseOption).toBeDefined();
    expect(verboseOption?.default).toBe(false);
  });

  test('should have port option with default', () => {
    const portOption = runIosCommand.options.find(opt => 
      opt.name.includes('--port')
    );
    expect(portOption).toBeDefined();
    expect(portOption?.default).toBe(8081);
  });
});