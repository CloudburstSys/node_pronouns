function replaceAll(string, initial, change) {
  return string.split(initial).join(change);
}

function format(string) {
  var data = [].slice.call(arguments).splice(1);
  let str = string;
  
  data.forEach(arg => {
    str = str.replace("{}", arg);
  });
  
  for(var i = 0; i<data.length; i++) {
    str = str.replaceAll("{"+i+"}", data[i]);
  }
  
  return str;
}

function replaceAllArray(string, initialArray, change) {
	let str = string;
	
	initialArray.forEach(initial => {
		str = replaceAll(str, initial, change);
	});
	
	return str;
}

function replaceAllArrayWithFormat(string, formatString, initialArray, change) {
	let str = string;
	
	initialArray.forEach(initial => {
		str = replaceAll(str, format(formatString, initial), change);
	});
	
	return str;
}
