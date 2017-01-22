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
      };
    };
  };
  return arr;
};

function selectionSort (arr) {
  for (var i=0; i<arr.length; i++) {
    var min = i;
    for (var j=i+1; j<arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      };
    };
    var temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  };
  return arr;
};

function insertionSort(arr) {
  for (var i=0; i<arr.length; i++) {
    var tmp = arr[i];
    for (var j=i-1; j>=0 && (arr[j]>tmp); j--) {
      arr[j+1] = arr[j];
    };
    arr[j+1] = tmp;
  };
  return arr;
};

function merge (arr1, arr2) {
  var newArr = [];
  var i = 0;
  var j = 0;

  while (i<arr1.length && j<arr2.length) {
    if (arr1[i]<arr2[j]) {
      newArr.push(arr1[i]);
      i++;
    } else {
      newArr.push(arr2[j]);
      j++;
    }
  };

  return newArr.concat(arr1.slice(i)).concat(arr2.slice(j));
}



function mergeSort (arr) {
  if (arr.length<2) {
    return arr
  };

  var mid = Math.floor(arr.length/2);
  var arr1 = arr.slice(0, mid);
  var arr2 = arr.slice(mid, arr.length);

  return merge(mergeSort(arr1), mergeSort(arr2));
}

function swap (arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};


function partition (arr, left, right) {
  var pivot = arr[Math.floor(arr.length/2)];
  i = left;
  j = right;
  while (i<=j){
    while (arr[i]<pivot) {
      i++;
    };

    while (arr[j]>pivot) {
      j--
    };

    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }

  return i;
}
