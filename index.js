const fs = require("fs");
const StringModifier = require("./src/StringModifier");
var pronouns = require("./resources/pronouns.json");

const stringModifier = new StringModifier(pronouns);

module.exports = (string, data) => {
	if(Array.isArray(data)) {
		// multiple
		return multiple(data)(string);
	} else {
		// single
		return single(data)(string);
	}
}

function single(pronoun) {
	this.pronoun = null;

	pronouns.forEach(pronounSet => {
		if(pronounSet.join("/").startsWith(pronoun)) this.pronoun = pronounSet;
	});
	
	return (string) => {
		return stringModifier.modifySingle(string, this.pronoun);
	}
}

function multiple(pronounArray) {	
	this.pronouns = [];
	
	pronounArray.forEach(pronoun => {
		pronouns.forEach(pronounSet => {
			if(pronounSet.join("/").startsWith(pronoun)) this.pronouns.push(pronounSet);
		})
	});

	return (string) => {
		return stringModifier.modifyMultiple(string, this.pronouns);
	}
}

module.exports.extendPronouns = (pronounArray) => {
	if(!Array.isArray(pronounArray)) throw new Error("PronounArray MUST be an array!");
	if(!Array.isArray(pronounArray[0])) throw new Error("PronounArray must contain arrays");
	
	pronounArray.forEach(pronoun => {
		pronouns.push(pronoun);
	});

	stringModifier.addPronouns(pronounArray);
	
	return true;
}

module.exports.single = single;
module.exports.multiple = multiple;
