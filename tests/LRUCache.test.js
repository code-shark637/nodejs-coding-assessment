'use strict';

const assert = require('assert');
const { LRUCache } = require('../src/LRUCache');

/**
 * Unit tests for LRUCache using Node.js built-in assert module.
 */

function runTests() {
  console.log('Running LRUCache tests...\n');

  // Test 1: Basic put and get operations
  (function testBasicOps() {
    const cache = new LRUCache(2);
    cache.put(1, 10);
    cache.put(2, 20);
    assert.strictEqual(cache.get(1), 10);
    assert.strictEqual(cache.get(2), 20);
    assert.strictEqual(cache.get(3), -1);
    console.log('✓ Test 1 passed: basic put/get operations');
  })();

  // Test 2: Eviction of least recently used item
  (function testEviction() {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);       // key 1 is now most recent, key 2 is LRU
    cache.put(3, 3);    // evicts key 2
    assert.strictEqual(cache.get(2), -1);
    assert.strictEqual(cache.get(1), 1);
    assert.strictEqual(cache.get(3), 3);
    console.log('✓ Test 2 passed: LRU eviction works correctly');
  })();

  // Test 3: TTL expiration
  (function testExpiration() {
    const cache = new LRUCache(3);
    cache.put('a', 'hello', 50);  // expires in 50ms
    cache.put('b', 'world');      // no expiration

    assert.strictEqual(cache.get('a'), 'hello');
    assert.strictEqual(cache.get('b'), 'world');

    // Wait for expiration and check
    setTimeout(() => {
      assert.strictEqual(cache.get('a'), -1);
      assert.strictEqual(cache.get('b'), 'world');
      console.log('✓ Test 3 passed: TTL expiration removes entry on access');
      continueTests();
    }, 60);
  })();
}

function continueTests() {
  // Test 4: Updating existing key resets value and recency
  (function testUpdate() {
    const cache = new LRUCache(2);
    cache.put(1, 'old');
    cache.put(2, 'two');
    cache.put(1, 'new');    // update key 1, now key 2 is LRU
    cache.put(3, 'three');  // evicts key 2
    assert.strictEqual(cache.get(1), 'new');
    assert.strictEqual(cache.get(2), -1);
    assert.strictEqual(cache.get(3), 'three');
    console.log('✓ Test 4 passed: updating key refreshes recency');
  })();

  // Test 5: Invalid inputs throw errors
  (function testInvalidInputs() {
    assert.throws(() => new LRUCache(0), /Capacity must be a positive integer/);
    assert.throws(() => new LRUCache(-5), /Capacity must be a positive integer/);
    assert.throws(() => new LRUCache(1.5), /Capacity must be a positive integer/);

    const cache = new LRUCache(2);
    assert.throws(() => cache.put('x', 'val', -100), /TTL must be a positive number/);
    assert.throws(() => cache.put('x', 'val', 0), /TTL must be a positive number/);
    console.log('✓ Test 5 passed: invalid inputs throw appropriate errors');
  })();

  console.log('\nAll tests passed!');
}

runTests();
