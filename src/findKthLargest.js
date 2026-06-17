'use strict';

/**
 * Finds the kth largest element in an unsorted array using the Quickselect algorithm.
 *
 * The approach is based on the partitioning logic of QuickSort. We pick a pivot,
 * partition the array such that elements greater than the pivot are on the left
 * and elements smaller are on the right, then recurse into the correct partition.
 *
 * Time Complexity:
 *   - Average case: O(n) — each recursive call processes roughly half the array
 *   - Worst case: O(n^2) — mitigated by random pivot selection
 *
 * Space Complexity:
 *   - O(1) auxiliary space (in-place partitioning, iterative approach)
 *
 * @param {number[]} nums - Array of integers (may contain duplicates)
 * @param {number} k - The position (1-indexed) of the largest element to find
 * @returns {number} The kth largest element
 * @throws {Error} If input is invalid (empty array, k out of bounds, non-array input)
 */
function findKthLargest(nums, k) {
  if (!Array.isArray(nums)) {
    throw new Error('Input must be an array');
  }

  if (nums.length === 0) {
    throw new Error('Array must not be empty');
  }

  if (!Number.isInteger(k) || k < 1 || k > nums.length) {
    throw new Error(`k must be an integer between 1 and ${nums.length}`);
  }

  // We want the kth largest, which is the element at index (k-1)
  // if the array were sorted in descending order.
  // Equivalently, it's the element at index (n - k) in ascending order.
  const targetIndex = nums.length - k;

  // Work on a copy so we don't mutate the original
  const arr = nums.slice();

  return quickselect(arr, 0, arr.length - 1, targetIndex);
}

/**
 * Iterative quickselect to find the element that would be at targetIndex
 * if the array were sorted in ascending order.
 *
 * @param {number[]} arr - The array to search (modified in place)
 * @param {number} left - Left boundary index
 * @param {number} right - Right boundary index
 * @param {number} targetIndex - The index we're looking for in sorted order
 * @returns {number} The element at targetIndex in sorted order
 */
function quickselect(arr, left, right, targetIndex) {
  while (left < right) {
    const pivotIndex = partition(arr, left, right);

    if (pivotIndex === targetIndex) {
      return arr[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return arr[left];
}

/**
 * Partitions the array segment [left, right] around a randomly chosen pivot
 * using the Lomuto partition scheme.
 *
 * After partitioning, the pivot is in its final sorted position:
 * all elements to its left are <= pivot, all to its right are >= pivot.
 *
 * @param {number[]} arr - The array to partition
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} The final index of the pivot element
 */
function partition(arr, left, right) {
  // Random pivot selection to avoid worst-case on sorted/nearly-sorted input
  const randomIdx = left + Math.floor(Math.random() * (right - left + 1));
  swap(arr, randomIdx, right);

  const pivot = arr[right];
  let storeIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] <= pivot) {
      swap(arr, i, storeIndex);
      storeIndex++;
    }
  }

  swap(arr, storeIndex, right);
  return storeIndex;
}

/**
 * Swaps two elements in an array.
 *
 * @param {number[]} arr - The array
 * @param {number} i - First index
 * @param {number} j - Second index
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

module.exports = { findKthLargest };
