const { replaceAllArray, replaceAllArrayWithFormat } = require("./StringUtils");

class StringModifier {
	constructor(pronouns) {
		this.subjects = [];
		this.objects = [];
		this.posessiveDeterminer = [];
		this.posessive = [];
		this.reflexive = [];
		
		pronouns.forEach(pronoun => {
			this.subjects.push(pronoun[0]);
			this.objects.push(pronoun[1]);
			this.posessiveDeterminer.push(pronoun[2]);
			this.posessive.push(pronoun[3]);
			this.reflexive.push(pronoun[4]);
		});
	}
	
	addPronoun(pronounSet) {
		this.subjects.push(pronoun[0]);
		this.objects.push(pronoun[1]);
		this.posessiveDeterminer.push(pronoun[2]);
		this.posessive.push(pronoun[3]);
		this.reflexive.push(pronoun[4]);
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
			switch(i) {
				case 0:
					// Subject
					result = replaceAllArray(result, this.subjects, pronounSet[0]);
					break;
				case 1:
					// Object
					result = replaceAllArray(result, this.objects, pronounSet[1]);
					break;
				case 2:
					// Posessive Determiner
					result = replaceAllArray(result, this.posessiveDeterminer, pronounSet[2]);
					break;
				case 3:
					// Posessive
					result = replaceAllArray(result, this.posessive, pronounSet[3]);
					break;
				case 4:
					// Reflexive
					result = replaceAllArray(result, this.reflexive, pronounSet[4]);
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
