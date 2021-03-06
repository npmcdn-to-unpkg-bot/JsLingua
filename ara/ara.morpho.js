(function () {

  var Morpho = {};
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    Morpho = require("../morpho.js");
    module.exports = AraMorpho;
  } else {
    Morpho = window.JsLingua.Cls.Morpho;
    window.JsLingua.addService("Morpho", "ara", AraMorpho);
  }

  //Different global features
  var F = Morpho.Feature;
  var T = F.Tense;
  var M = F.Mood;
  var V = F.Voice;
  var N = F.Number;
  var A = F.Aspect;
  var G = F.Gender;
  var P = F.Person;

  function AraMorpho() {
    Morpho.call(this, "ara");
  }

  AraMorpho.prototype = Object.create(Morpho.prototype);;
  AraMorpho.prototype.constructor = AraMorpho;

  //var C = Object.freeze;

  //=================
  //Conjugation zone
  //=================

  //Override conjugate function
  AraMorpho.prototype.conjugate = function(verb, opts){
    //delete diacretics
    var noDiac = verb.replace(/\u064E\u064F\u0650\u0651\u0652/gi, "");//fat,dam,kas,shad,sukun

    //detect if the verb with weak begining
    var weekBegin = /^[اأو]/.test(noDiac);

    //detect if the verb has a week ending
    var weekEnd = /[يى]$/.test(noDiac);

    //detect if the verb has a week middle
    var weekMiddle = false;

    var begin = "";
    var end = "";
    var endDiac = "ُ";//Dhamma for present
    var notAllowed = false;

    //Future is prefix + present
    var future = false;
    if (opts.tense === T.Future){
      future = true;
      opts.tense = T.Present;
    }

    switch (opts.tense) {

      case T.Present:

      switch (opts.person) {

        case P.First:
        if (opts.number === N.Singular) begin = "أ";
        else begin = "ن";
        break;


        case P.Second:
        begin = "ت";
        switch (opts.number) {
          case N.Singular:
          if (opts.gender === G.Feminine){
            end = "ينَ";
            var endDiac = "ِ";//Kasra
          }
          break;


          case N.Dual:
          end = "انِ";
          endDiac = "َ";//Fatha
          break;


          case N.Plural:
          if (opts.gender === G.Feminine){
            end = "نَ";
            var endDiac = "ْ";//Sukuun
          }
          else end = "ونَ";
          break;


        }//Number
        break;


        case P.Third:
        begin = "ي";
        if (opts.gender === G.Feminine) begin = "ت";

        switch (opts.number) {
          //No ending for singular
          case N.Dual:
          end = "انِ";
          endDiac = "َ";//Fatha
          break;


          case N.Plural:
          if (opts.gender === G.Feminine){
            end = "نَ";
            begin = "ي";
            endDiac = "ْ";//Sukuun
          }
          else end = "ونَ";

        }//Number

      }//person
      begin += "َ";//Add fatha
      break;


      case T.Past:
      endDiac = "ْ";//Sukuun for past
      switch (opts.person) {
        case P.First:
        if (opts.number == N.Singular) end = "تُ";
        else end = "نَا";
        break;


        case P.Second:
        switch (opts.number) {
          case N.Singular:
          if (opts.gender === G.Feminine) end = "تِ";
          else end = "تَ";
          break;

          case N.Dual:
          end = "تُمَا";
          break;

          case N.Plural:
          if (opts.gender === G.Feminine) end = "تُنَّ";
          else end = "تُمْ";

        }//Number
        break;


        case P.Third:
        endDiac = "َ";//Fatha for past third
        switch (opts.number) {
          case N.Singular:
          if (opts.gender === G.Feminine) end = "تْ";
          break;

          case N.Dual:
          if (opts.gender === G.Feminine) end = "تَا";
          else end = "ا";
          break;


          case N.Plural:
          if (opts.gender === G.Feminine){
            end = "نَ";
            endDiac = "ْ";//Sukuun for past third plural feminine
          }else{
            end = "وا";
            endDiac = "ُ";//Sukuun for past third plural feminine
          }


        }//Number

      }//person


    }//swich(tense)

    var result = verb;

    if (opts.tense === T.Present){
      result = result.replace(/^(.)[َُِْ]?/, "$1ْ");
    }

    result = result.replace(/[َ]?$/, endDiac);

    result = begin + result + end;

    if (future) result = "سَوْفَ " + result;


    return result;

  }

  AraMorpho.prototype.getPronoun = function(opts){

    switch (opts.person) {
      case P.First:
      if (opts.number === N.Singular) return "أَنَا";
      else return "نَحْنُ";

      case P.Second:
      switch (opts.number) {
        case N.Singular:
        if (opts.gender === G.Feminine) return "أَنْتِ";
        else return "أَنْتَ";

        case N.Dual:
        return "أَنْتُمَا";

        case N.Plural:
        if (opts.gender === G.Feminine) return "أَنْتُنَّ";
        else return "أَنْتُمْ";

      }

      case P.Third:
      switch (opts.number) {
        case N.Singular:
        if (opts.gender === G.Feminine) return "هِيَ";
        else return "هُوَ";

        case N.Dual:
        return "هُمَا";

        case N.Plural:
        if (opts.gender === G.Feminine) return "هُنَّ";
        else return "هُمْ";

      }

    }
    return "";
  }

  AraMorpho.prototype.stem = function(word){

    var result = word;
    return result;
  }
  
  

}());
