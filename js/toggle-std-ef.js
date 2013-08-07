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

  var toggleActiveClassName = 'on'

  var toggleLabel = '.toggle-label'
  //Default label text
  var toggleLabelOn = 'ON'
  var toggleLabelOff = 'OFF'

  var toggleIcon = '.toggle-icon'
  var toggleIconOnClassName = 'icon-ok'
  var toggleIconOffClassName = 'icon-remove'

  var toggleCallbacks = {
    'true': toggleCallbackOn,
    'false': toggleCallbackOff
  }
  var toggleLabelTexts = {
    'true': toggleLabelOn,
    'false': toggleLabelOff
  }

  var toggleIconClassNames = {
    'true': toggleIconOnClassName,
    'false': toggleIconOffClassName
  }

  var Toggle = function(element) {
    //TODO: trigger $.fn.toggle via JAVASCRIPT if necessary in the future
    //var $el = $(element).on('click.bs.toggle', this.toggle)
    var $el = $(element)
    $el.each(function() {
      var $this = $(this)
      var data = $this.data(toggleBase)
      var val = data === true

      setToggle($this, val)

    })
  }

  Toggle.prototype.toggle = function(e) {
    var $this = $(this)

    if ($this.is('.disabled, [disabled]')) return

    e.stopPropagation()

    var val = !$this.data(toggleBase)
    var valKey = val.toString()

    setToggle($this, val).trigger(toggleCallbacks[valKey])

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
    var valOppositeKey = (!val).toString()

    $this
      .attr(toggleData, val)
      .data(toggleBase, val)

    if (val) {
      $this.addClass(toggleActiveClassName)
    } else {
      $this.removeClass(toggleActiveClassName)
    }

    if ($this.is(toggleIcon)) $this.find('.btn').addClass(toggleIconClassNames[valKey]).removeClass(toggleIconClassNames[valOppositeKey])

    if ($this.is(toggleLabel)) $this.find('.btn').text(toggleLabelTexts[valKey])

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