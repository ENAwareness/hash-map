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

  function get(key) {
    let index = hash(key);

    if (buckets[index] === null) {
      return null;
    }

    for (let pair of buckets[index]) {
      if (pair.key === key) {
        return pair.value;
      }
    }

    return null;
  }

  function has(key) {
    let index = hash(key);

    if (buckets[index] === null) {
      return false;
    }

    for (let pair of buckets[index]) {
      if (pair.key === key) {
        return true;
      }
    }

    return false;
  }

  function remove(key) {
    let index = hash(key);

    if (buckets[index] === null) {
      return false;
    }

    for (let i = 0; i < buckets[index].length; i++) {
      if (buckets[index][i].key === key) {
        buckets[index].splice(i, 1);
        size--;

        if (buckets[index].length === 0) {
          buckets[index] = null;
        }
        return true;
      }
    }

    return false;
  }

  function length() {
    return size;
  }

  function clear() {
    buckets = new Array(capacity).fill(null);
    size = 0;
  }

  function keys() {
    let keyArray = [];

    for (let bucket of buckets) {
      if (bucket !== null) {
        for (let pair of bucket) {
          keyArray.push(pair.key);
        }
      }
    }

    return keyArray;
  }

  function values() {
    let valueArray = [];

    for (let bucket of buckets) {
      if (bucket !== null) {
        for (let pair of bucket) {
          valueArray.push(pair.value);
        }
      }
    }

    return valueArray;
  }

  function entries() {
    let entryArray = [];

    for (let bucket of buckets) {
      if (bucket !== null) {
        for (let pair of bucket) {
          entryArray.push(pair);
        }
      }
    }

    return entryArray;
  }

  return {
    set,
    hash,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    getCapacity: () => capacity,
    getSize: () => size,
    getBuckets: () => buckets
  };
}

//测试
const map = HashMap();
map.set('Alice', '12345');
map.set('Rama', 'First value');
map.set('Sita', 'Second value');

console.log(map.remove('Alice')); // 12345
console.log(map.get('Rama')); // First value
console.log(map.get('Bob')); // null

console.log(map.length());
console.log(map.keys());
console.log(map.entries());
