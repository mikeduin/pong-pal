var arr = [];

function arrBuilder () {
  for (var i=0; i<10000001; i++) {
    arr.push(2)
  }
}

function testPerformance (callback, arr) {
  var t0 = process.hrtime();
  callback(arr);
  var t1 = process.hrtime();
  return t1 - t0;
}

function square(arr) {
  return arr.map(function(el){
    return el * el;
  })
}

First step: establish a base case
Second step: Write recursive component

function factorial (n) {
  if (n < 0) {
    return -1
  } else if (n == 0) {
    return 1
  } else {
    return (n * factorial(n-1))
  };
}

function getMaxProfit (arr) {
  var sorted = arr.sort();
  var low;
  var high;
  if (sorted[0] !== arr[arr.length-1]) {
    low = sorted[0];
  } else {
    low = sorted[1];
  };
  if (sorted[sorted.length-1] !== arr[0]) {
    high = sorted[sorted.length-1];
  } else {
    high = sorted[sorted.length-2];
  }
  return high-low;
}


----

function swap (arr, ind1, ind2) {
  var x = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = x;
}


function bubbleSort(arr) {
  for (var i=0; i<arr.length; i++) {
    for (var j=i+1; j<arr.length; j++) {
      if (arr[i]>arr[j]) {
        swap (arr, i, j);
      }
      console.log(arr);
    }
  }
  return arr;
}


























function selectionSort(arr) {
  for (var i=0; i<arr.length; i++) {
    var currentMin = arr[i];
    var minIndex = i;
    for (var j=i+1; j<arr.length; j++) {
      if (arr[j] < currentMin) {
        currentMin = arr[j];
        minIndex = j;
      }
    };
    swap(arr, i, minIndex);
  }
  return arr;
}


























function insertionSort(arr) {
  for (var i=1; i<arr.length; i++) {
    
  }
}
