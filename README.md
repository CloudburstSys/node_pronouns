# node_pronouns
A node.js module which modifies sentences to use different pronouns.

## Installation instructions
Currently this module is not on npm, so you must tell npm to explicitly get the module from github.

Execute `npm install LegoDevStudio/node_pronouns` in your project directory.

Now you can try the examples below!

## Examples
she/her, 1 person
```javascript
const pronouns = require("node_pronouns");
const pronoun = new pronouns.single("she/her");

console.log(pronoun("He is looking good today!"));
// Output: "She is looking good today!"
```
he/him, 1 person
```javascript
const pronouns = require("node_pronouns");
const pronoun = new pronouns.single("he/him");

console.log(pronoun("Ze is looking good today!"));
// Output: "He is looking good today!"
```
Mixed, 4 people
```javascript
const pronouns = require("node_pronouns");
const pronoun = new pronouns.multiple(["she/her", "e/em", "they/them", "xe/xem"]);

// Due to how multiple pronouns work, you cannot just use any pronoun you choose and expect the module to know what you mean.
// Instead, You use the following format `{{ pronoun <number> }}`.
// The pronoun can be any pronoun of your choice, as long as it makes sense gramatically
// The number must equal the person you want to refer to *starting from 0*, so the first person in the array would be `{{ pronoun 0 }}`
console.log(pronoun("\"Hey! Did you see Becky yesterday?\"\n\"Yeah I was outside with {{ them 0 }}, the others joined us as well. Emmy was talking about how {{ she 1 }} was going to get a dog later this week and Owen mentioned how {{ he 2 }} wanted a dog as well. Jane was having a bad day though, so {{ they 3 }} was quiet.\"\n\"Ah I see, wish I could of come along, but ya know, exams and stuff\""));
// Output: "Hey! Did you see Becky yesterday?"
//         "Yeah I was outside with her, the others joined us as well. Emmy was talking about how e was going to get a dog later this week and Own mentioned how they wanted a dog as well. Jane was having a bad day though, so xe was quiet."
//         "Ah I see, wish I could of come along, but ya know, exams and stuff"
```
You can also minify the code by calling pronouns directly as a function
```javascript
const pronouns = require("node_pronouns");
console.log(pronouns("They is so cute!", "she/her");
// Output: "She is so cute!"
```
or for multiple people
```javascript
const pronouns = require("node_pronouns");
console.log(pronouns("\"Did you see Katelyn yesterday? {{ She 0 }} didn't look well. I'm worried for {{ them 0 }}!\"\n\"Yeah I did and yeah {{ he 0 }} didn't look well, I've heard that {{ eir 0 }} sister, Lucy, is trying {{ her 1 }} best to help {{ nem 0 }} out.\"\n\"Aww bless {{ their 1 }} little socks off that's is so cute!\"", ["she/her", "they/them"]));
// Output: "Did you see Katelyn yesterday? She didn't look well. I'm worried for her!"
//         "Yeah I did and yeah she didn't look well, I've heard that her sister, Lucy is trying their best to help her out."
//         "Aww bless their little socks off that is so cute!"
```
The module automatically registers "they/them" as singular, Automatically converting to plural vowels is currently not supported by this module.

## Extending the list of pronouns.
The module exports functions that allow you to extend the list of pronouns. You must pass an array of arrays in the following format.

`[subject, object, posessive determiner, posessive, reflexive]`

This *adds* to the list of pronouns.
```javascript
const pronouns = require("node_pronouns");
const fs = require("fs");
pronouns.extendPronouns([["xey", "xem", "xyr", "xyrs", "xemself"]]);
```
