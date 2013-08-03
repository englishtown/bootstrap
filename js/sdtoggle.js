/* ========================================================================
 * Bootstrap-ef: sdtoogle.js v1.0
 * For standard toggle of EF project only
 * ======================================================================== */

+ function($) {
  "use strict";

  // STANDARD TOGGLE CLASS DEFINITION
  // ====================

  var sdtoggleBase = 'sdtoggle'
  var sdtoggle = '.' + sdtoggleBase
  var sdtoggleData = 'data-' + sdtoggleBase
  var sdtoggleCallbackFalse = 'off.bs.sdtoggle'
  var sdtoggleCallbackTrue = 'on.bs.sdtoggle'
  var sdtoggleLabel = '.sdtoggle-label'
  var sdtoggleIcon = '.sdtoggle-icon'

  //TODO: blurbs
  var sdtoogleLabelTrue = 'ON'
  var sdtoogleLabelFalse = 'OFF'
  var sdtoogleIconTrue = '✓'
  var sdtoogleIconFalse = '✕'

  var sdtoggleCallbacks = {
    true: sdtoggleCallbackTrue,
    false: sdtoggleCallbackFalse
  }
  var sdtoogleLabelTexts = {
    true: sdtoogleLabelTrue,
    false: sdtoogleLabelFalse
  }
  var sdtoogleIconTexts = {
    true: sdtoogleIconTrue,
    false: sdtoogleIconFalse
  }


  var StandardToggle = function(element) {
    //TODO: trigger $.fn.sdtoggle via JAVASCRIPT if necessary in the future
    //var $el = $(element).on('click.bs.sdtoggle', this.toggle)
    var $el = $(element)
    $el.each(function() {
      var $this = $(this)
      var data = $this.data(sdtoggleBase)
      var val = data === true

      setText($this, val)

      if (data === undefined) $this.attr(sdtoggleData, false)

    })


  }

  StandardToggle.prototype.toggle = function(e) {
    var $this = $(this)

    if ($this.is('.disabled, [disabled]')) return

    e.preventDefault()
    e.stopPropagation()

    if ($this.data(sdtoggleBase)) {
      setToggle($this, false)
    } else {
      setToggle($this, true)
    }

  }

  StandardToggle.prototype.focus = function(e) {
    var $this = $(this)

    if ($this.is('.disabled, [disabled]')) return

    // TODO: make clear that bind which key to trigger toggle when press 'tab' key and focus on sdtoggle
    //       Current are: Enter & Space
    if (/(13|32)/.test(e.keyCode)) $this.trigger('click.bs.sdtoggle')
  }

  var setToggle = function($this, val) {

    $this
      .attr(sdtoggleData, val)
      .data(sdtoggleBase, val)
      .trigger(sdtoggleCallbacks[val])
    setText($this, val)
  }

  var setText = function($this, val) {
    if ($this.is(sdtoggleLabel)) $this.find('.btn').text(sdtoogleLabelTexts[val])
    if ($this.is(sdtoggleIcon)) $this.find('.btn').text(sdtoogleIconTexts[val])
  }

  // STANDARD TOGGLE DATA-API
  // ===============

  $(document)
    .on('click.bs.sdtoggle.data-api', sdtoggle, StandardToggle.prototype.toggle)
    .on('focus.bs.sdtoggle.data-api', sdtoggle, StandardToggle.prototype.focus)

  $(window).on('load', function() {
    var sdtoggleEntity = new StandardToggle(sdtoggle)
  })

}(window.jQuery);