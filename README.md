# node_pronouns
A node.js module which modifies sentences to use different pronouns, while also modifying the sentence to make the sentences make sense.

## Installation instructions
Currently this module is not on npm, so you must tell npm to explicitly get the module from github.

Execute `npm install LegoDevStudio/node_pronouns` in your project directory.

Now you can try the examples below!

## Examples
Singular she/her
```javascript
const pronouns = require("node_pronouns");
const pronoun = new pronouns.pronoun("she/her");

console.log(pronoun("They are looking good today!"));
// Output: "She is looking good today!"
```
Plural she/her
```javascript
const pronouns = require("node_pronouns");
// Passing "true" as the second argument to pronouns.pronoun forces the modifier to use plural pronouns and modify verbs as such.
const pronoun = new pronouns.pronoun("she/her", true);

console.log(pronoun("Ze is looking good today!"));
// Output: "She are looking good today!"
```
The module automatically registers "they/them" as singular, so you must explicitly tell the module that you want the plural version.

Telling the module that you want to use plural pronouns will automatically change the reflexive pronoun suffix to "selves" instead of "self".
