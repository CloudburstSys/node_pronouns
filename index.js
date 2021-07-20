const StringModifier = require("./src/StringModifier");
var pronouns = require("./resources/pronouns.json");

const stringModifier = new StringModifier(pronouns);

/**
 * Minified pronoun replacement, pass an Array to `data` for multiple people, pass a String to `data` for one person.
 * 
 * @param {String} string The content you want to have pronouns replaced in.
 * @param {any} data The pronoun(s). Pass an Array for multiple people, pass a String for one person.
 * @param {Boolean} ignoreFile Whether to ignore the pronouns file. Please pass full pronouns to `data` if this is set to true. Optional.
 * @returns {String} A string with pronouns replaced.
 */
module.exports = (string, data, ignoreFile = false) => {
	if (Array.isArray(data)) {
		// multiple
		return multiple(data, ignoreFile)(string);
	} else {
		// single
		return single(data, ignoreFile)(string);
	}
}

/**
 * Pronoun replacement for one person. Returns a function you can pass a string to.
 *
 * @param {String} pronoun The pronoun you want to use.
 * @param {Boolean} ignoreFile Whether to ignore checking the file. Please pass a full pronoun set to `pronoun` if you set this to true. Optional.
 *
 * @returns {Function} A function you can pass a string to.
 */
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

/**
 * Pronoun replacement for one person. Returns a function you can pass a string to.
 *
 * @param {Array<String>} pronounArray The array of pronouns for the people.
 * @param {Boolean} ignoreFile Whether to ignore checking the file. Please pass full pronoun sets to `pronounArray` if you set this to true. Optional.
 *
 * @returns {Function} A function you can pass a string to.
 */
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

/**
 * Extends the pronoun set implemented from the pronouns file.
 * 
 * @param {Array<Array<String>>} pronounArray An array of Pronouns, which follows the format of `[singular, object, posessive determiner, posessive, reflexive]`.
 * @returns {Boolean} Whether the extension was successful.
 */
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
