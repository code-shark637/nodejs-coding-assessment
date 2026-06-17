# Node.js Coding Assessment

## Project Structure

```
src/
  findKthLargest.js    - Kth largest element finder (Quickselect)
tests/
  findKthLargest.test.js - Unit tests using assert module
```

## Requirements

- Node.js (v14 or later)
- No external dependencies

## Running the Tests

```bash
node tests/findKthLargest.test.js
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