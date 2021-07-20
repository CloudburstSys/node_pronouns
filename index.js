const fs = require("fs");
const StringModifier = require("./src/StringModifier");
var pronouns = require("./resources/pronouns.json");

const stringModifier = new StringModifier(pronouns);

module.exports = (string, data, ignoreFile = false) => {
	if (Array.isArray(data)) {
		// multiple
		return multiple(data, ignoreFile)(string);
	} else {
		// single
		return single(data, ignoreFile)(string);
	}
}

function single(pronoun, ignoreFile = false) {
	this.pronoun = null;

	if (!ignoreFile) {
		pronouns.forEach(pronounSet => {
			if (pronounSet.join("/").startsWith(pronoun.join("/"))) this.pronoun = pronounSet;
		});
	} else {
		this.pronoun = pronoun;
	}

	return (string) => {
		return stringModifier.modifySingle(string, this.pronoun);
	}
}

function multiple(pronounArray, ignoreFile = false) {
	this.pronouns = [];

	pronounArray.forEach(pronoun => {
		if (!ignoreFile) {
			pronouns.forEach(pronounSet => {
				if (pronounSet.join("/").startsWith(pronoun.join("/"))) this.pronouns.push(pronounSet);
			});
		} else {
			this.pronouns.push(pronoun);
		}
	});

	return (string) => {
		return stringModifier.modifyMultiple(string, this.pronouns);
	}
}

module.exports.extendPronouns = (pronounArray) => {
	if (!Array.isArray(pronounArray)) throw new Error("PronounArray MUST be an array!");
	if (!Array.isArray(pronounArray[0])) throw new Error("PronounArray must contain arrays");

	pronounArray.forEach(pronoun => {
		pronouns.push(pronoun);
	});

	stringModifier.addPronouns(pronounArray);

	return true;
}

module.exports.single = single;
module.exports.multiple = multiple;
