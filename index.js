module.exports = (string, data) => {
	if(Array.isArray(data)) {
		// multiple
		return new multiple(data)(string);
	} else {
		// single
		return new single(data)(string);
	}
}

function single(pronoun) {
	if(!new.target) return new single(pronoun);
	
	this.pronoun = pronoun;
	
	return (string) => {
		// do stuff lol
	}
}

function multiple(pronounArray) {
	if(!new.target) return new multiple(pronounArray);
	
	this.pronouns = pronounArray;
	
	return (string) => {
		// do stuff lol
	}
}

module.exports.extendPronouns = (pronounArray) => {
	// idk lmao
}
