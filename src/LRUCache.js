'use strict';

/**
 * Node for the doubly linked list used internally by LRUCache.
 * Each node holds a key-value pair, optional expiration timestamp,
 * and pointers to previous/next nodes.
 */
class ListNode {
  constructor(key, value, expiresAt) {
    this.key = key;
    this.value = value;
    this.expiresAt = expiresAt || null;
    this.prev = null;
    this.next = null;
  }
}

/**
 * LRU Cache with optional TTL-based expiration per entry.
 *
 * Uses a doubly linked list + hash map for O(1) get/put operations.
 * The head of the list is the most recently used item, the tail is the least recently used.
 *
 * Time Complexity:
 *   - get(key): O(1) average
 *   - put(key, value, ttl): O(1) average
 *
 * Space Complexity:
 *   - O(capacity) for storing up to `capacity` entries
 */
class LRUCache {
  /**
   * @param {number} capacity - Maximum number of items the cache can hold (must be positive integer)
   */
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error('Capacity must be a positive integer');
    }

    this.capacity = capacity;
    this.size = 0;
    this.map = new Map();

    // Sentinel nodes to simplify edge cases in linked list operations
    this.head = new ListNode(null, null);
    this.tail = new ListNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Retrieves the value for a given key if it exists and has not expired.
   * Accessing a key marks it as most recently used.
   *
   * @param {*} key - The cache key to look up
   * @returns {*} The cached value, or -1 if not found / expired
   */
  get(key) {
    const node = this.map.get(key);

    if (!node) {
      return -1;
    }

    // Check expiration
    if (node.expiresAt !== null && Date.now() >= node.expiresAt) {
      this._removeNode(node);
      this.map.delete(key);
      this.size--;
      return -1;
    }

    // Move to front (most recently used)
    this._moveToFront(node);
    return node.value;
  }

  /**
   * Inserts or updates a key-value pair in the cache.
   * If the cache is at capacity, evicts the least recently used item.
   *
   * @param {*} key - The cache key
   * @param {*} value - The value to store
   * @param {number} [ttl] - Optional time-to-live in milliseconds (must be positive if provided)
   */
  put(key, value, ttl) {
    let expiresAt = null;

    if (ttl !== undefined) {
      if (typeof ttl !== 'number' || ttl <= 0) {
        throw new Error('TTL must be a positive number in milliseconds');
      }
      expiresAt = Date.now() + ttl;
    }

    // If key already exists, update it
    if (this.map.has(key)) {
      const existing = this.map.get(key);
      existing.value = value;
      existing.expiresAt = expiresAt;
      this._moveToFront(existing);
      return;
    }

    // Evict if at capacity
    if (this.size >= this.capacity) {
      this._evictLRU();
    }

    const node = new ListNode(key, value, expiresAt);
    this._addToFront(node);
    this.map.set(key, node);
    this.size++;
  }

  /**
   * Removes a node from its current position in the linked list.
   * @param {ListNode} node
   */
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * Inserts a node right after the head sentinel (most recent position).
   * @param {ListNode} node
   */
  _addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * Moves an existing node to the front of the list (most recently used).
   * @param {ListNode} node
   */
  _moveToFront(node) {
    this._removeNode(node);
    this._addToFront(node);
  }

  /**
   * Evicts the least recently used item (node before tail sentinel).
   */
  _evictLRU() {
    const lru = this.tail.prev;
    if (lru === this.head) return;

    this._removeNode(lru);
    this.map.delete(lru.key);
    this.size--;
  }
}

module.exports = { LRUCache };
