/* wordFreqCounter.js */

// Luke Weber
// 01/24/2017
// Pramp Interview

/**
 *  Return unique words and the number of their occurences
 *  @param {string} doc - Linear combination of space-seperated words
 *  @returns {Array} Array of unique words paired with their frequency
 */ 
function scan(doc) {

  var numWords = 0;

  // Loop doc char-by-char
  var i = str.length;
  var word;
  while (i--) {
    var val = str[i];

    if (val == " ") {
      // TODO

      word = "";
      numWords++;
    } else {
      word += val;
    }
  }
  
  numWords++;
  // TODO
}

/**
 *  Return unique words and the number of their occurences
 *  @param {string} doc - Linear combination of space-seperated words
 *  @returns {Array} Array of unique words paired with their frequency
 */ 
function wordHash(word) {

}

// Input: string doc, containing space-seperated words
// Output: dictionary containing unique words as keys and number of occurances as values
// Time: O(n + n + n^2) = O(n^2) ... pretty bad
// Space: O(n + n + n) = O(n) ... alright
function scan(doc) {
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
