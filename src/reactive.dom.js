(function() {
  var identity = function (v) { return v };

  if (!$R) { return; }
  $R.identity = function() {return $R(identity);};
  $R.dom = function(inputEl) {
    return new $R.Dom(inputEl);
  };
  $R.Dom = function (inputEl) {
    this.el = $(inputEl);
  };
  $R.Dom.prototype = {
    bindAttributeTo: function (attribute, rf, formatter) {
      formatter = formatter || identity;
      $R(function(v) {
        if (this.el[0]) { this.el[0][attribute] = formatter(v) }
      }, this).bindTo(rf);
      return this;
    },
    bindPropertyTo: function (property, rf, formatter) {
      formatter = formatter || identity;
      $R(function(v) {
        this.el.prop(property, formatter(v));
      }, this).bindTo(rf);
      return this;
    },
    bindPropertyToEach: function (property, rf, formatter) {
      formatter = formatter || identity;
      $R(function(v) {
        this.el.each(function() {
            $(this).prop(property, formatter(v));
        });
      }, this).bindTo(rf);
        return this;
    },
    bindToggleClassTo: function (className, rf) {
      $R(function(v) {
        this.el.toggleClass(className, v);
      }, this).bindTo(rf);
      return this;
    },
    bindInputTo: function (rf, formatter) {
      this.bindAttributeTo("value", rf, formatter);
      return this;
    },
    linkInput: function(rf, formatter, sanitizer) {
      this.bindInputTo(rf, formatter);
      rf.bindToInput(this.el, sanitizer);
      return this;
    }
  };

  $R.extend($R.pluginExtensions, {
    bindToChange: function(input, sanitizer) {
      sanitizer = sanitizer || identity;
      var rf = this;
      // Update to the initial state first, then update on every change.
      rf(sanitizer($(input).val()));
      $(input).on("change", function () {
        rf(sanitizer(this.value));
      });
      return this;
    },
    bindToInput: function(input, sanitizer) {
      sanitizer = sanitizer || identity;
      var rf = this;
      // Update to the initial state first, then update on every change.
      rf(sanitizer($(input).val()));
      $(input).on("input", function () {
        rf(sanitizer(this.value));
      });
      return this;
    },
    bindToChecked: function(input, sanitizer) {
      sanitizer = sanitizer || identity;
      var rf = this;
      // Update to the initial state first, then update on every change.
      rf(sanitizer($(input).is(':checked')));
      $(input).change(function () {
        rf(sanitizer($(this).is(':checked')));
      });
      return this;
    }
  });

})();
