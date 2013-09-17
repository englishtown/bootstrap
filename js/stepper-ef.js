/* ========================================================================
 * Bootstrap-ef: stepper-ef.js v1.0
 * For numeric stepper of EF project only
 * ======================================================================== */

+function($) {
  "use strict";

  // NUMERIC STEPPER CLASS DEFINITION
  // =========================

  var stepperClass = '.stepper'
  var stepperBtnUpClass = stepperClass + ' .btn-up'
  var stepperBtnDownClass = stepperClass + ' .btn-down'
  var stepperInputClass = '.form-control'
  var stepperInputDelegateClass = stepperClass + ' ' + stepperInputClass

  var dataStepper = 'stepper'
  var dataLastVal = 'stepper-lastval'

  var stepperClick = 'click.gud.stepper.data-api'
  var stepperKeydown = 'keydown.gud.stepper.data-api'
  var stepperFocus = 'focus.gud.stepper.data-api'
  var stepperBlur = 'blur.gud.stepper.data-api'

  var disableAttr = '.disabled, :disabled'

  var Stepper = function(element, options) {
    var $el = $(element)
    this.inputEl = $el.find(stepperInputClass)
    this.options = options

    this.set()
  }

  Stepper.DEFAULTS = {
    'min': 0,
    'max': 99999,
    'step': 1
  }

  Stepper.prototype.increase = function(step) {
    execStep(this.inputEl, 'increase', this.options, step)
  }

  Stepper.prototype.decrease = function(step) {
    execStep(this.inputEl, 'decrease', this.options, step)
  }

  Stepper.prototype.set = function(val) {
    var $input = this.inputEl
    if (val === undefined) val = $input.val()
    setVal($input, val, this.options)
  }

  var execStep = function($input, action, options, step) {
    if ($input.is(disableAttr)) return
    var val
    if (step === undefined) step = options['step']
    if (isNaN(val = parseInt($input.val(), 10))) val = 0
    step = parseInt(step, 10)

    if (action == 'decrease') {
      step *= -1;
    }
    val += step;

    setVal($input, val, options)

  }

  var setVal = function($input, val, options) {
    var maxValue = parseInt(options['max'], 10)
    var minValue = parseInt(options['min'], 10)

    var lastVal = $input.data(dataLastVal)

    if (val.length === 0) {
      val = lastVal != null ? lastVal : minValue;
    }

    if (isNaN(val = parseInt(val, 10))) val = 0

    if (val < minValue) {
      val = minValue
    } else if (val > maxValue) {
      val = maxValue
    }

    $input.val(val)
    $input.data(dataLastVal, val)
  }

  // NUMERIC STEPPER PLUGIN DEFINITION
  // ==========================

  var old = $.fn.stepper

  $.fn.stepper = function(option, val) {
    return this.each(function() {
      var $this = $(this)
      var data = $this.data(dataStepper)
      var options = $.extend({}, Stepper.DEFAULTS, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data(dataStepper, (data = new Stepper(this, options)))
      if (typeof option == 'string') data[option](val)
    })
  }

  $.fn.stepper.Constructor = Stepper

  // NUMERIC STEPPER NO CONFLICT
  // ====================

  $.fn.stepper.noConflict = function() {
    $.fn.stepper = old
    return this
  }

  // APPLY TO NUMERIC STEPPER ELEMENTS
  // ===================================

  $(document)
    .on(stepperClick, stepperBtnUpClass, function(e) {
      $(this).parents(stepperClass).stepper('increase')
    })
    .on(stepperClick, stepperBtnDownClass, function(e) {
      $(this).parents(stepperClass).stepper('decrease')
    })
    .on(stepperFocus, stepperInputDelegateClass, function(e){
      $(this).val('')
    })
    .on(stepperBlur, stepperInputDelegateClass, function(e){
      $(this).parents(stepperClass).stepper('set')
    })
    .on(stepperKeydown, stepperInputDelegateClass, function(e){
      if (e.keyCode === 13) $(this).trigger(stepperBlur)
    })


  $(window).on('load', function() {
    $(stepperClass).stepper()
  })

}(window.jQuery);
