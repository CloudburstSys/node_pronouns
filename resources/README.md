# Resouces
This directory contains all the .json resources the module uses. This includes the list of all base pronouns the module supports (This can be extended!), the list of all verb replacements between singular and plural pronouns and anything else we need to store in a .json file.

## `pronouns.json`
A json file containing an array of arrays. This stores pronouns.
Format: `[singular, object, posessive determiner, posessive, reflexive]`

## `verbs.json`
A json file containing a object of strings, This stores verbs and their plural equivilent
Format: `"singular": "plural"`
The module supports modification regardless of whether words are already correct or not. All you need to do is send the string and pronouns.
