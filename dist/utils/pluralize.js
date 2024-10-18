"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = pluralize;
/**
 * Returns the plural of an English word.
 *
 * @export
 * @param {string} word
 * @returns {string}
 */
function pluralize(word) {
    const pluralRules = {
        "(quiz)$": "$1zes",
        "^(ox)$": "$1en",
        "([m|l])ouse$": "$1ice",
        "(matr|vert|ind)ix|ex$": "$1ices",
        "(x|ch|ss|sh)$": "$1es",
        "([^aeiouy]|qu)y$": "$1ies",
        "(hive)$": "$1s",
        "(?:([^f])fe|([lr])f)$": "$1$2ves",
        "(shea|lea|loa|thie)f$": "$1ves",
        "sis$": "ses",
        "([ti])um$": "$1a",
        "(tomat|potat|ech|her|vet)o$": "$1oes",
        "(bu)s$": "$1ses",
        "(alias)$": "$1es",
        "(octop)us$": "$1i",
        "(ax|test)is$": "$1es",
        "(us)$": "$1es",
        "([^s]+)$": "$1s"
    };
    const irregularWords = {
        "move": "moves",
        "foot": "feet",
        "goose": "geese",
        "sex": "sexes",
        "child": "children",
        "man": "men",
        "tooth": "teeth",
        "person": "people"
    };
    const uncountableWords = [
        "sheep", "fish", "deer", "moose", "series", "species", "money",
        "rice", "information", "equipment", "bison", "cod", "offspring",
        "pike", "salmon", "shrimp", "swine", "trout", "aircraft",
        "hovercraft", "spacecraft", "sugar", "tuna", "you", "wood"
    ];
    if (uncountableWords.includes(word.toLowerCase())) {
        return word;
    }
    for (const singular in irregularWords) {
        const pattern = new RegExp(`${singular}$`, "i");
        const replace = irregularWords[singular];
        if (pattern.test(word)) {
            return word.replace(pattern, replace);
        }
    }
    for (const rule in pluralRules) {
        const pattern = new RegExp(rule, "i");
        if (pattern.test(word)) {
            return word.replace(pattern, pluralRules[rule]);
        }
    }
    return word;
}
