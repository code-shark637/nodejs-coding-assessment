# Node.js Coding Assessment

## Project Structure

```
src/
  findKthLargest.js      - Kth largest element finder (Quickselect)
  LRUCache.js            - LRU Cache with TTL expiration
tests/
  findKthLargest.test.js - Unit tests for Task 1
  LRUCache.test.js       - Unit tests for Task 2
```

## Requirements

- Node.js (v14 or later)
- No external dependencies

## Running the Tests

```bash
node tests/findKthLargest.test.js
node tests/LRUCache.test.js
```

## Task 1: Kth Largest Element Finder

Finds the kth largest element in an unsorted array using the **Quickselect** algorithm.

- **Average time complexity:** O(n)
- **Worst-case time complexity:** O(n²) — mitigated via random pivot selection
- **Space complexity:** O(n) for the working copy of the array; O(1) auxiliary for partitioning

### Usage

```js
const { findKthLargest } = require('./src/findKthLargest');

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));          // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
```

### Edge Cases Handled

- Empty array → throws Error
- k out of bounds (k < 1 or k > n) → throws Error
- Non-array input → throws Error
- Single element array
- All duplicate elements
- Negative numbers
- Original array is not mutated

## Task 2: LRU Cache with Expiration

LRU Cache implementation using a **doubly linked list + hash map** for O(1) get/put operations, with optional per-entry TTL expiration.

- **get/put time complexity:** O(1) average
- **Space complexity:** O(capacity)

### Usage

```js
const { LRUCache } = require('./src/LRUCache');

const cache = new LRUCache(2);
cache.put(1, 1);           // No TTL
cache.put(2, 2, 1000);     // Expires after 1 second
console.log(cache.get(1)); // 1
console.log(cache.get(2)); // 2 (if not expired)
cache.put(3, 3);           // Evicts key 2 (LRU)
console.log(cache.get(2)); // -1 (evicted)
```

### Edge Cases Handled

- Invalid capacity (zero, negative, non-integer) → throws Error
- Negative or zero TTL → throws Error
- Expired entries removed on next access
- Updating existing key refreshes recency
- Key not found returns -1