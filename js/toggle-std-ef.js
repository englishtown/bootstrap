/* ========================================================================
 * Bootstrap-ef: toggle.js v1.0
 * For standard toggle of EF project only
 * ======================================================================== */

+ function($) {
  "use strict";

  // STANDARD TOGGLE CLASS DEFINITION
  // ====================

  var toggleBase = 'toggle'
  var toggleClass = '.' + toggleBase
  var toggleData = 'data-' + toggleBase
  var toggleCallbackOn = 'on.bs.toggle'
  var toggleCallbackOff = 'off.bs.toggle'
  var toggleLabel = '.toggle-label'
  var toggleIcon = '.toggle-icon'

  //Default label text
  var toggleLabelOn = 'ON'
  var toggleLabelOff = 'OFF'
  var toggleIconTrue = '✓'
  var toggleIconFalse = '✕'

  var toggleCallbacks = {
    'true': toggleCallbackOn,
    'false': toggleCallbackOff
  }
  var toggleLabelTexts = {
    'true': toggleLabelOn,
    'false': toggleLabelOff
  }
  var toggleIconTexts = {
    'true': toggleIconTrue,
    'false': toggleIconFalse
  }


  var Toggle = function(element) {
    //TODO: trigger $.fn.toggle via JAVASCRIPT if necessary in the future
    //var $el = $(element).on('click.bs.toggle', this.toggle)
    var $el = $(element)
    $el.each(function() {
      var $this = $(this)
      var data = $this.data(toggleBase)
      var val = data === true
      var valKey = val.toString()

      setText($this, valKey)

      if (val) {
        $this.addClass('on')
      } else {
        $this.attr(toggleData, false)
      }

    })
  }

  Toggle.prototype.toggle = function(e) {
    var $this = $(this)

    if ($this.is('.disabled, [disabled]')) return

    e.stopPropagation()

    if ($this.data(toggleBase)) {
      setToggle($this, false)
    } else {
      setToggle($this, true)
    }

    $this.toggleClass('on')

  }

  Toggle.prototype.focus = function(e) {
    var $this = $(this)

    if ($this.is('.disabled, [disabled]')) return

    // TODO: make clear that bind which key to trigger toggle when press 'tab' key and focus on toggle
    //       Current are: Enter & Space
    if (/(13|32)/.test(e.keyCode)) $this.trigger('click.bs.toggle')
  }

  var setToggle = function($this, val) {
    var valKey = val.toString()

    $this
      .attr(toggleData, val)
      .data(toggleBase, val)
      .trigger(toggleCallbacks[valKey])

    setText($this, valKey)
  }

  var setText = function($this, valKey) {
    if ($this.is(toggleLabel)) $this.find('.btn').text(toggleLabelTexts[valKey])
    if ($this.is(toggleIcon)) $this.find('.btn').text(toggleIconTexts[valKey])
  }

  // STANDARD TOGGLE DATA-API
  // ===============

  $(document)
    .on('click.bs.toggle.data-api', toggleClass, Toggle.prototype.toggle)
    .on('focus.bs.toggle.data-api', toggleClass, Toggle.prototype.focus)

  $(window).on('load', function() {
    var toggleEntity = new Toggle(toggleClass)
  })

}(window.jQuery);