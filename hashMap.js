function HashMap(initialCapacity = 16, loadFactor = 0.75) {
  let capacity = initialCapacity;
  let buckets = new Array(capacity).fill(null);
  let size = 0;

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);

    if (buckets[index] === null) {
      buckets[index] = [];
    }

    for (let pair of buckets[index]) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }

    buckets[index].push({ key, value });
    size++;

    if (size / capacity > loadFactor) {
      resize();
    }
  }

  function resize() {
    const oldBuckets = buckets;
    capacity *= 2;
    buckets = new Array(capacity).fill(null);
    size = 0;

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let { key, value } of bucket) {
          set(key, value);
        }
      }
    }
  }

  return {
    set,
    hash,
    getCapacity: () => capacity,
    getSize: () => size,
    getBuckets: () => buckets
  };
}

//测试
const map = HashMap();
map.set('Carlos', 'I am the old value.');
console.log(map.getBuckets()); // Carlos 存入
map.set('Carlos', 'I am the new value.');
console.log(map.getBuckets()); // Carlos 的值被更新
map.set('Rama', 'First value');
map.set('Sita', 'Second value');
console.log(map.getSize());
console.log(map.getCapacity());
console.log(map.getBuckets());
