const { replaceAllArrayWithFormat } = require("./StringUtils");

class StringModifier {
	constructor(pronouns) {
		this.subjects = [];
		this.objects = [];
		this.posessiveDeterminer = [];
		this.posessive = [];
		this.reflexive = [];
		
		pronouns.forEach(pronoun => {
			this.subjects.push(new RegExp(pronoun[0], "gm"));
			this.objects.push(new RegExp(pronoun[1], "gm"));
			this.posessiveDeterminer.push(new RegExp(pronoun[2], "gm"));
			this.posessive.push(new RegExp(pronoun[3], "gm"));
			this.reflexive.push(new RegExp(pronoun[4], "gm"));
			
			// Hacky solution to case stuff
			this.subjects.push(new RegExp(pronoun[0].charAt(0).toUpperCase() + pronoun[0].slice(1), "gm"));
			this.objects.push(new RegExp(pronoun[1].charAt(0).toUpperCase() + pronoun[1].slice(1), "gm"));
			this.posessiveDeterminer.push(new RegExp(pronoun[2].charAt(0).toUpperCase() + pronoun[2].slice(1), "gm"));
			this.posessive.push(new RegExp(pronoun[3].charAt(0).toUpperCase() + pronoun[3].slice(1), "gm"));
			this.reflexive.push(new RegExp(pronoun[4].charAt(0).toUpperCase() + pronoun[4].slice(1), "gm"));
		});
	}
	
	addPronoun(pronounSet) {
		this.subjects.push(new RegExp(pronoun[0], "gm"));
		this.objects.push(new RegExp(pronoun[1], "gm"));
		this.posessiveDeterminer.push(new RegExp(pronoun[2], "gm"));
		this.posessive.push(new RegExp(pronoun[3], "gm"));
		this.reflexive.push(new RegExp(pronoun[4], "gm"));
		
		// Hacky solution to case stuff
		this.subjects.push(new RegExp(pronoun[0].charAt(0).toUpperCase() + pronoun[0].slice(1), "gm"));
		this.objects.push(new RegExp(pronoun[1].charAt(0).toUpperCase() + pronoun[1].slice(1), "gm"));
		this.posessiveDeterminer.push(new RegExp(pronoun[2].charAt(0).toUpperCase() + pronoun[2].slice(1), "gm"));
		this.posessive.push(new RegExp(pronoun[3].charAt(0).toUpperCase() + pronoun[3].slice(1), "gm"));
		this.reflexive.push(new RegExp(pronoun[4].charAt(0).toUpperCase() + pronoun[4].slice(1), "gm"));
	}
	
	addPronouns(pronounArray) {
		pronounArray.forEach(pronounSet => {
			if(!Array.isArray(pronounSet)) throw new Error("PronounArray must be an array of pronouns!");
			
			this.addPronoun(pronounSet);
		});
	}
	
	modifySingle(string, pronounSet) {
		let result = string;
		for(var i = 0; i<pronounSet.length; i++) {
			let template = "{{ {} }}";
			switch(i) {
				case 0:
					// Subject
					result = replaceAllArrayWithFormat(result, template, this.subjects, pronounSet[0]);
					break;
				case 1:
					// Object
					result = replaceAllArrayWithFormat(result, template, this.objects, pronounSet[1]);
					break;
				case 2:
					// Posessive Determiner
					result = replaceAllArrayWithFormat(result, template, this.posessiveDeterminer, pronounSet[2]);
					break;
				case 3:
					// Posessive
					result = replaceAllArrayWithFormat(result, template, this.posessive, pronounSet[3]);
					break;
				case 4:
					// Reflexive
					result = replaceAllArrayWithFormat(result, template, this.reflexive, pronounSet[4]);
					break;
				default:
					throw new Error("Invalid pronounSet. A pronounSet must be 5 elements in an array.");
			}
		}
		
		return result;
	}
	
	modifyMultiple(string, pronounArray) {
		let result = string;
		
		for(var i = 0; i<pronounArray.length; i++) {
			let template = "{{ {} "+i+" }}";
			for(var j = 0; j<pronounArray[i].length; j++) {
				let pronounSet = pronounArray[i];
				switch(j) {
					case 0:
						// Subject
						result = replaceAllArrayWithFormat(result, template, this.subjects, pronounSet[0]);
						break;
					case 1:
						// Object
						result = replaceAllArrayWithFormat(result, template, this.objects, pronounSet[1]);
						break;
					case 2:
						// Posessive Determiner
						result = replaceAllArrayWithFormat(result, template, this.posessiveDeterminer, pronounSet[2]);
						break;
					case 3:
						// Posessive
						result = replaceAllArrayWithFormat(result, template, this.posessive, pronounSet[3]);
						break;
					case 4:
						// Reflexive
						result = replaceAllArrayWithFormat(result, template, this.reflexive, pronounSet[4]);
						break;
					default:
						throw new Error("Invalid pronounSet. A pronounSet must be 5 elements in an array.");
				}
			}
		}
		
		return result;
	}
}

module.exports = StringModifier;
