function HashMap(initialCapacity = 16, loadFactor = 0.75) {
  let capacity = initialCapacity;
  let buckets = new Array(capacity).fill(null);
  let size = 0;

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCOde = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  return {
    getCapacity: () => capacity,
    getLoadFactor: () => loadFactor,
    getSize: () => size,
    getBuckets: () => buckets,
    hash
  };
}

//测试
const map = HashMap();
console.log(map.hash('hello'));
console.log(map.hash('worldfollow'));
console.log(map.getCapacity());
