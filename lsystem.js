function LSystem(options) {
  this.axiom = options.axiom || "";
  this.rules = options.rules || {};
  this.renderRules = options.renderRules || {};
}

LSystem.prototype = (function () {

  var state;

  return {

    reset: function () {
      state = this.axiom;

    },

    render: function () {
      for (var i = 0; i < state.length; i++) {
        var s = state.charAt(i);
        var rule = this.renderRules[s];
        if (rule) {
          rule();
        } else {
          throw "Unknown instruction " + s;
        }
      }
    },

    step: function () {
      var newState = "";
      for (var i = 0; i < state.length; i++) {
        var s = state.charAt(i);
        var rule = this.rules[s];
        if (rule) {
          newState = newState + rule;
        } else {
          newState = newState + s;
        }
      }
      state = newState;
    },

    simulate: function (n) {
      for (var i = 0; i < n; i++) {
        this.step();
      }
    }
  };

}());

