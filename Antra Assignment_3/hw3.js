// 1. Explain what is prototype and what is prototype chain in your own words

// A prototype is an object with a group of properties and methods 
// that every object inherits from. In Javascript, every object has a prototype, 
// and prototype itself is an object. The properties and methods defined on an object’s 
// prototype are shared among all instances of that object. 

// A prototype chain is the process of looking for 
// an object’s properties on the current object, then its prototype, and its prototype’s prototype, 
// and so on until finding the property or reaching null (which is the end of the prototype chain). 

// 2. Implement your versions of the following Array methods (choose 6).

Array.prototype.myMap = function(callback) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(callback(this[i], i, this));
    }
    return res;
};
  
Array.prototype.myFilter = function(callback) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            res.push(this[i]);
        }
    }
    return res;
};

Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;
    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

Array.prototype.myEvery = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
};

Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
};

Array.prototype.myIncludes = function(target, fromIndex = 0) {
    if (fromIndex < 0) {
        fromIndex = Math.max(this.length + fromIndex, 0);
    }
    for (let i = fromIndex; i < this.length; i++) {
        if (this[i] === target) {
            return true;
        }
    }
    return false;
};

const assert = require('assert');

try {
    // Test myMap
    let arr = [1, 2, 3];
    let result = arr.myMap(x => x * 2);
    assert.deepStrictEqual(result, [2, 4, 6], 'myMap failed');

    // Test myFilter
    arr = [1, 2, 3, 4];
    result = arr.myFilter(x => x % 2 === 0);
    assert.deepStrictEqual(result, [2, 4], 'myFilter failed');

    // Test myReduce
    arr = [1, 2, 3, 4];
    result = arr.myReduce((acc, x) => acc + x, 0);
    assert.strictEqual(result, 10, 'myReduce with initial value failed');

    result = arr.myReduce((acc, x) => acc + x);
    assert.strictEqual(result, 10, 'myReduce without initial value failed');

    // Test myEvery
    arr = [2, 4, 6];
    result = arr.myEvery(x => x % 2 === 0);
    assert.strictEqual(result, true, 'myEvery failed when all elements match');

    arr = [2, 3, 6];
    result = arr.myEvery(x => x % 2 === 0);
    assert.strictEqual(result, false, 'myEvery failed when not all elements match');

    // Test myFind
    arr = [1, 2, 3, 4];
    result = arr.myFind(x => x > 2);
    assert.strictEqual(result, 3, 'myFind failed to find matching element');

    result = arr.myFind(x => x > 4);
    assert.strictEqual(result, undefined, 'myFind failed when no element matches');

    // Test myIncludes
    arr = [1, 2, 3];
    result = arr.myIncludes(2);
    assert.strictEqual(result, true, 'myIncludes failed to find existing element');

    result = arr.myIncludes(4);
    assert.strictEqual(result, false, 'myIncludes failed to return false for non-existing element');

    console.log('All tests passed!');
} catch (error) {
    console.error('A test failed:', error.message);
}