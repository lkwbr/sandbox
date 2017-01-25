/* wordFreqCounter.js */

// Luke Weber
// 01/24/2017
// Improved from scan_1 to scan_2

"use strict";


/* scan_2 */

class MaxHeap {
  constructor(valFunction, d) { 
    this.d;
    this.valFunction;

    // Argument checking
    let numArgs = arguments.length;
    if (numArgs < 2) { this.d = 2; }
    if (numArgs < 1) { this.valFunction = valFunction; }
    else { this.valFunction = item => { return item; } }
  }

  iParent(i) { return Math.floor((i - 1) / this.d); }
  /* @param {Number} c - Relative child index, i.e. 0 <= c < d */
  iChild(i, c) { return (this.d * i) + (c + 1); }

  // Heapify given array
  ify(arr, count) {
    // Parent of last element
    let start = this.iParent(count - 1); 

    // Right-to-left sifting down
    while (start >= 0) {
      this.siftDown(arr, start, count - 1); 
      start--;
    }
  }
  
  siftDown(arr, start, end) {
    let root = start;

    while (this.iChild(root, 0) <= end) {
      let child = this.iChild(root, 0);
      let swap = root;

      if (this.valFunction(arr[swap]) < this.valFunction(arr[child])) {
        swap = child;
      } 
      if (((child + 1) <= end) 
        && (this.valFunction(arr[swap]) < this.valFunction(arr[child + 1]))) {
        swap = child + 1;
      }
      if (swap == root) {
        return;
      } else {
        this.swap(arr, root, swap);
        root = swap;
      }
    }
  }

  // Heapsort on given array
  sort(arr, count) {
    if (arguments.length === 1) { count = arr.length; } 

    this.ify(arr, count);

    let end = count - 1;
    while (end > 0) {

      console.log("top = " + arr[0]);

      // Move max to front of sorted elements
      this.swap(arr, end, 0);
      // Heap size reduced
      end--;
      // Restore heap
      this.siftDown(arr, 0, end);

      console.log("end = " + end);
      console.log(arr);
      console.log();
    }
  }

  swap(arr, a, b) {
    let c = arr[a];
    arr[a] = arr[b];
    arr[b] = c;
  } 
}

/**
 *  Return unique words and the number of their occurences
 *  @param {String} doc - Linear combination of space-seperated words
 *  @returns {Array} Unique words paired with their frequency
 */ 
function scan_2(doc) {

  // Capture word frequencies
  let dict = {};
  doc.split(" ").forEach(function(word) {
    dict[word] = (dict[word] || 0) + 1; 
  });

  // Dictionary to array; used for sorting!
  let dictArr = Object.keys(dict).map(k => [k, dict[k]]);

  // Heap sort
  let heap = new MaxHeap(item => {
    // Use frequency to sort
    return item[1]; 
  });
  heap.sort(dictArr);

  return dictArr;
}

var freqs = scan_2("a b a c b d a");


/* scan_1 */

// Input: string doc, containing space-seperated words
// Output: dictionary containing unique words as keys and number of occurances as values
// Time: O(n + n + n^2) = O(n^2) ... pretty bad
// Space: O(n + n + n) = O(n) ... alright
function scan_1(doc) {
   // Get words in array
   var words = doc.split(' ');
   var dict = {};
   
   // Count freq. of words
   // O(n)
   words.forEach(function(word) {
      // Initialize word
      if (dict[word] == undefined) { 
         dict[word] = 0;
      }
      dict[word] += 1;
   });
   
   // Dictionary to array
   // O(n)
   var dictArr = [];
   for (var word in dict) {
      var freq = dict[word];
      dictArr.push([word, freq]);
   }
   
   // Sort array based on value (= frequency)
   // O(n^2)
   dictArr.sort((a, b) => {
      return a[1] - b[1];
   });
   
   return dictArr;
}
