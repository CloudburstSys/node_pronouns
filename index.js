module.exports = (string, data, plural = false) => {
	if(Array.isArray(data)) {
		// multiple
		return new multiple(data)(string);
	} else {
		// single
		return new single(data, plural)(string);
	}
}

function single(pronoun, plural = false) {
	if(!new.target) return new single(pronoun, plural);
	
	this.pronoun = pronoun;
	this.isPlural = plural;
	
	return (string) => {
		// do stuff lol
	}
}

function multiple(pronounArray) {
	if(!new.target) return new multiple(pronounArray);
	
	this.pronouns = [];
	this.plural = [];
	
	pronounArray.forEach(pronoun => {
		this.pronouns.push(pronoun[0]);
		this.plural.push(pronoun[1] == undefined ? false : pronoun[1]);
	});
	
	return (string) => {
		// do stuff lol
	}
}

module.exports.extendPronouns = (pronounArray) => {
	// idk lmao
}
