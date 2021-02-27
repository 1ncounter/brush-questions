/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存机制
 */

// @lc code=start

/**
 * 哈希链表节点
 * @param {number} key
 * @param {number} value
 */
function CacheNode(key, value) {
  this.key = key;
  this.value = value;
  this.prev = this.next = null;
}

/**
 * LRU 缓存算法的核心数据结构就是哈希链表，双向链表和哈希表的结合体。
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.caches = {};
  this.size = 0;

  // 使用伪头部和伪尾部节点
  this.head = new CacheNode(-1, -1);
  this.tail = new CacheNode(-2, -1);
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const cache = this.caches[key];

  if (cache) {
    this.moveToHead(cache);
    return cache.value;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const cache = this.caches[key];

  if (cache) {
    cache.value = value;

    this.moveToHead(cache);
  } else {
    const cache = new CacheNode(key, value);

    this.caches[key] = cache;

    if (this.size < this.capacity) {
      this.size++;
    } else {
      const tail = this.removeTail();
      if (tail) delete this.caches[tail.key];
    }

    this.addToHead(cache);
  }
};

LRUCache.prototype.removeNode = function (node) {
  node.next.prev = node.prev;
  node.prev.next = node.next;
};

LRUCache.prototype.removeTail = function () {
  const tail = this.tail.prev;

  this.removeNode(tail);

  return tail;
};

LRUCache.prototype.addToHead = function (node) {
  this.head.next.prev = node;
  node.next = this.head.next;
  node.prev = this.head;
  this.head.next = node;
};

LRUCache.prototype.moveToHead = function (node) {
  this.removeNode(node);
  this.addToHead(node);
};
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
