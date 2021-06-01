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
    str = replaceAll(str, "{"+i+"}", data[i]);
  }
  
  return str;
}

function replaceAllArrayWithFormat(string, formatString, initialArray, change) {
	let str = string;
	
	initialArray.forEach(initial => {
		if(initial.source.charAt(0) == initial.source.charAt(0).toUpperCase()) {
			str = replaceAll(str, format(formatString, initial.source), change.charAt(0).toUpperCase() + change.slice(1));
		}else{
			str = replaceAll(str, format(formatString, initial.source), change);
		}
	});
	
	return str;
}

exports.replaceAll = replaceAll;
exports.format = format;
exports.replaceAllArrayWithFormat = replaceAllArrayWithFormat;
