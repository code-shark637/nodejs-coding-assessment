'use strict';

const assert = require('assert');
const { findKthLargest } = require('../src/findKthLargest');

/**
 * Unit tests for findKthLargest using Node.js built-in assert module.
 */

function runTests() {
  console.log('Running findKthLargest tests...\n');

  // Test 1: Basic case with distinct elements
  (function testBasicCase() {
    const result = findKthLargest([3, 2, 1, 5, 6, 4], 2);
    assert.strictEqual(result, 5);
    console.log('✓ Test 1 passed: [3,2,1,5,6,4], k=2 => 5');
  })();

  // Test 2: Array with duplicate elements
  (function testDuplicates() {
    const result = findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4);
    assert.strictEqual(result, 4);
    console.log('✓ Test 2 passed: [3,2,3,1,2,4,5,5,6], k=4 => 4');
  })();

  // Test 3: k=1 (largest) and k=n (smallest)
  (function testBoundaryK() {
    assert.strictEqual(findKthLargest([7, 10, 4, 3, 20, 15], 1), 20);
    assert.strictEqual(findKthLargest([7, 10, 4, 3, 20, 15], 6), 3);
    console.log('✓ Test 3 passed: k=1 => largest, k=n => smallest');
  })();

  // Test 4: Single element array
  (function testSingleElement() {
    assert.strictEqual(findKthLargest([42], 1), 42);
    console.log('✓ Test 4 passed: single element [42], k=1 => 42');
  })();

  // Test 5: Edge cases — empty array and invalid k throw errors
  (function testEdgeCases() {
    assert.throws(() => findKthLargest([], 1), /Array must not be empty/);
    assert.throws(() => findKthLargest([1, 2, 3], 0), /k must be an integer/);
    assert.throws(() => findKthLargest([1, 2, 3], 4), /k must be an integer/);
    console.log('✓ Test 5 passed: empty array and invalid k throw errors');
  })();

  console.log('\nAll tests passed!');
}

runTests();
