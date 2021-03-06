(function(){

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Morpho;
  } else {
    window.JsLingua.Cls.Morpho = Morpho;
  }

  function Morpho(langCode) {

    this.code = langCode;
    //Contains name of service and the function

  }

  var C = Object.freeze;

  var PoS = C({
    Noun: 0,
    Verb: 1,
    Adjective: 2,
    Adverb: 3,
    Preposition: 4,
    Pronoun: 5
  });


  var Tense = C({
    Past: 0,
    Present: 1,
    Future: 2
  });

  var Aspect = C({
    Simple: 0,
    Continuous: 1,
    Perfect: 2,
    PerfectContinuous: 3
  });

  var Mood = C({
    Indicative: 0,
    Subjunctive: 1,
    Conditional: 2,
    Optative: 3,
    Imperative: 4,
    Jussive: 5,
    Potential: 6,
    Hypothetical: 7,
    Inferential: 8
  });

  var Voice = C({
    Active: 0,
    Passive: 1,
    Middle: 2
  });

  var Num = C({
    Singular: 0,
    Dual: 1,
    Plural: 2
  });

  var Case = C({
    Nominative: 0,
    Accusative: 1,
    Genitive: 2,
    Dative: 3,
    Prepositional: 4,
    Ablative: 5,
    Instrumental: 6,
    Vocative: 7
  });

  var Person = C({
    First: 0,
    Second: 1,
    Third: 2
  });

  var Gender = C({
    Masculine: 0,
    Feminine: 1,
    Neuter: 2
  });

  Morpho.Feature = C({
    "POS": PoS,
    "Tense": Tense,
    "Aspect": Aspect,
    "Mood": Mood,
    "Voice": Voice,
    "Number": Num,
    "Case": Case,
    "Person": Person,
    "Gender": Gender
  });

  /**
   * This function is used for verb conjugation
   * @param  {string} verb the word to be conjugated
   * @param  {object} opts  options for tense, case, voice, aspect, person, number, gender, mood, and other
   * @return {string}      inflected word
   */
  Morpho.prototype.conjugate = function(verb, opts){
    return verb;
  }


  Morpho.prototype.getPronoun = function(opts){
    return "";
  }

  /**
   * This function is used for noun inflexion<br>
   * For example: noun to plural nouns
   * @param  {string} noun the noun to be inflected
   * @param  {object} opts  the options: number for example
   * @return {string}      the inflected noun
   */
  Morpho.prototype.declenseNoun = function(noun, opts){
    return noun;
  }


  Morpho.prototype.derivate = function(word, srcPOS, dstPOS){
    return word;
  }

  Morpho.prototype.stem = function(word){
    return word;
  }

  Morpho.prototype.lemmatize = function(word){
    return word;
  }

}());
