function letterCounter (str) {
  var obj = {};
  for (var i=0; i<str.length; i++) {
    if (/[a-z]/.test(str[i]) !== 1) {
      if (obj[str[i]] === undefined) {
        obj[str[i]] = 1
      } else {
        obj[str[i]]++
      };
    };
  };
  return obj;
}


function ramp (num) {
  var str = num.toString();
  var last = 0;
  for (var i=0; i<str.length; i++) {
    if (parseInt(str[i]) >= last) {
      last = parseInt(str[i])
    } else {
      return false
    };
  };
  return true;
}

function palindrome (str) {
  var str = str.toLowerCase();
  var fixed = str.replace(/[\W]/g, "");
  var reversed = fixed.split('').reverse().join('');
  if (fixed === reversed) {
    return true
  } else {
    return false
  };
}
