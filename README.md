# node_pronouns
A node.js module which modifies sentences to use different pronouns, while also modifying the sentence to make the sentences make sense.

## Installation instructions
Currently this module is not on npm, so you must tell npm to explicitly get the module from github.

Execute `npm install LegoDevStudio/node_pronouns` in your project directory.

Now you can try the examples below!

## Examples
**Note: Do not confuse the .single() constructor for making the pronoun singular, it actually means that only 1 person is involved in the string you want to modify**

Singular she/her, 1 person
```javascript
const pronouns = require("node_pronouns");
const pronoun = new pronouns.single("she/her");

console.log(pronoun("They are looking good today!"));
// Output: "She is looking good today!"
```
Plural she/her, 1 person
```javascript
const pronouns = require("node_pronouns");
// Passing "true" as the second argument to pronouns.pronoun forces the modifier to use plural pronouns and modify verbs as such.
const pronoun = new pronouns.single("she/her", true);

console.log(pronoun("Ze is looking good today!"));
// Output: "She are looking good today!"
```
Mixed, 4 people
```javascript
const pronouns = require("node_pronouns");
const pronoun = new pronouns.multiple([["she/her"], ["e/em", true], ["they/them"], ["xe/xem", true]]);

// Due to how multiple pronouns work, you cannot just use any pronoun you choose and expect the module to know what you mean.
// Instead, You use the following format `{{ pronoun <number> }}`.
// The pronoun can be any pronoun of your choice, as long as it makes sense gramatically
// The number must equal the person you want to refer to *starting from 0*, so the first person in the array would be `{{ pronoun 0 }}`
console.log(pronoun("\"Hey! Did you see Becky yesterday?\"\n\"Yeah I was outside with {{ them 0 }}, the others joined us as well. Emmy was talking about how {{ she 1 }} was going to get a dog later this week and Owen mentioned how {{ he 2 }} wanted a dog as well. Jane was having a bad day though, so {{ they 3 }} was quiet.\"\n\"Ah I see, wish I could of come along, but ya know, exams and stuff\""));
// Output: "Hey! Did you see Becky yesterday?"
//         "Yeah I was outside with her, the others joined us as well. Emmy was talking about how e were going to get a dog later this week and Own mentioned how they wanted a dog as well. Jane was having a bad day though, so xe were quiet."
//         "Ah I see, wish I could of come along, but ya know, exams and stuff"
```
You can also minify the code by calling pronouns directly as a function
```javascript
const pronouns = require("node_pronouns");
console.log(pronouns("They are so cute!", ["she/her"]);
// Output: "She is so cute!"
```
The module automatically registers "they/them" as singular, so you must explicitly tell the module that you want the plural version.

Telling the module that you want to use plural pronouns will automatically change the reflexive pronoun suffix to "selves" instead of "self".

## Extending the list of pronouns.
The module exports functions that allow you to extend the list of pronouns. You must pass an array of arrays in the following format.

`[subject, object, posessive determiner, posessive, reflexive]`
```javascript
const pronouns = require("node_pronouns");
const fs = require("fs");
pronouns.extendPronouns([["xey", "xem", "xyr", "xyrs", "xemself"]]);
```
