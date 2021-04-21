const fs = require("fs");
const StringModifier = require("./src/StringModifier");
var pronouns = require("./resources/pronouns.json");

const stringModifier = new StringModifier(pronouns);

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
	if(!Array.isArray(pronounArray)) throw new Error("PronounArray MUST be an array!");
	if(!Array.isArray(pronounArray[0])) throw new Error("PronounArray must contain arrays");
	
	pronounArray.forEach(pronoun => {
		pronouns.push(pronoun);
	});
	
	return true;
}
