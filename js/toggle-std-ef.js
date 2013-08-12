/* ========================================================================
 * Bootstrap-ef: toggle-std-ef.js v1.0
 * For standard toggle of EF project only
 * ======================================================================== */

+ function($) {
  "use strict";

  // STANDARD TOGGLE CLASS DEFINITION
  // ====================

  var toggleElement = '.toggle'
  var dataToggle = 'stdtoggle'
  var dataToggleContainer = 'stdtoggle-container'
  var dataActive = 'active'
  var dataLabelOn = 'label-on'
  var dataLabelOff = 'label-off'

  // Events
  var toggleCallbackOn = 'on.bs.toggle'
  var toggleCallbackOff = 'off.bs.toggle'

  var toggleMousedown = 'mousedown.bs.toggle.data-api'
  var toggleMouseup = 'mouseup.bs.toggle.data-api'
  var toggleKeydown = 'keydown.bs.toggle.data-api'
  var toggleMousemove = 'mousemove.bs.toggle'
  var toggleMouseleave = 'mouseleave.bs.toggle'

  var toggleTouchstart = 'touchstart.bs.toggle.data-api'
  var toggleTouchmove = 'touchmove.bs.toggle'
  var toggleTouchend = 'touchend.bs.toggle'

  var touchSupport = ('ontouchstart' in document.documentElement)

  var toggleDown = (touchSupport) ? toggleTouchstart : toggleMousedown
  var toggleMove = (touchSupport) ? toggleTouchmove : toggleMousemove
  var toggleEnd = (touchSupport) ? toggleTouchend : toggleMouseleave

  var toggleOnClass = 'on'
  var toggleLabelClass = 'toggle-label'
  //Default label text
  var labelOnText = 'ON'
  var labelOffText = 'OFF'

  var toggleIconClass = 'toggle-icon'
  var toggleIconOnClass = 'icon-ok'
  var toggleIconOffClass = 'icon-remove'

  var disableAttr = '.disabled, [disabled]'

  var dragging, dragged

  var Toggle = function(element) {
    var $el = $(element)
    $el.val(Boolean($el.data(dataToggle)))
    this.toggle.call($el, $el.val())
  }

  Toggle.prototype.toggle = function(optionBool) {
    var $this = $(this)
    var $btn = $this.find('.btn')
    if (optionBool === undefined) {
      optionBool = !$this.val()
    }

    $this.toggleClass('on', optionBool)

    if ($this.hasClass(toggleLabelClass)) {
      var dataLabelOnText = $this.data(dataLabelOn)
      var dataLabelOffText = $this.data(dataLabelOff)

      if (!dataLabelOnText) dataLabelOnText = labelOnText
      if (!dataLabelOffText) dataLabelOffText = labelOffText

      $btn.text((optionBool) ? dataLabelOnText : dataLabelOffText)
    }

    if ($this.hasClass(toggleIconClass)) {
      $btn.addClass(function() {
        return (optionBool) ? toggleIconOnClass : toggleIconOffClass
      }).removeClass(function() {
        return (optionBool) ? toggleIconOffClass : toggleIconOnClass
      })
    }

    $this.trigger((optionBool) ? toggleCallbackOn : toggleCallbackOff)
    $this.val(optionBool)
  }

  var downEvent = function(e) {
    var $this = $(this)
    var $btn = $this.find('.btn')
    $this.data(dataActive, true)

    if (e.target.className.indexOf('btn') == -1 || $this.is(disableAttr)) return

    var relativeX = e.pageX || e.originalEvent.targetTouches[0].pageX
    var currentElRight = parseInt($btn.css('right'), 10)
    var maxMove = $this.width() - $btn.width()
    dragging = true

    $this.on(toggleMove, function(e) {
      e.preventDefault()
      if (!dragged) dragged = true
      if (dragging) {
        var pageX = e.pageX || e.originalEvent.targetTouches[0].pageX

        currentElRight = currentElRight + relativeX - pageX

        if (currentElRight < 0) currentElRight = 0
        if (currentElRight > maxMove) currentElRight = maxMove

        $btn.css('right', currentElRight + 'px')
        relativeX = pageX

        $this.val(currentElRight > maxMove / 2)
      }
    })

    $this.on(toggleEnd, function(e) {
      $this.off(toggleEnd)
      $this.trigger(toggleMouseup)
    })

  }

  var mouseupEvent = function(e) {
    var $this = $(this)
    var $btn = $this.find('.btn')
    if ($this.is(disableAttr) || !$this.data(dataActive)) return
    dragging = false
    $this.off(toggleMove)
    if (dragged) {
      dragged = false
      $btn.css('right', '')
      $this.stdtoggle($this.val())
    } else {
      $this.stdtoggle()
    }

    $this.data(dataActive, false)

  }

  var keydownEvent = function(e) {
    var $this = $(this)
    if ($this.not(':focus')) return
    if (/(13|32)/.test(e.keyCode)) {
      e.preventDefault()
      $this.data(dataActive, true)
      $this.trigger(toggleMouseup)
    }

  }

  // STANDARD TOGGLE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.stdtoggle

  $.fn.stdtoggle = function(option) {
    return this.each(function() {
      var $this = $(this)
      var data = $this.data(dataToggleContainer)

      if (!data) {
        $this.data(dataToggleContainer, (data = new Toggle(this)))
      } else {
        data.toggle.call(this, option)
      }

    })
  }

  $.fn.stdtoggle.Constructor = Toggle


  // STANDARD TOGGLE NO CONFLICT
  // ====================

  $.fn.stdtoggle.noConflict = function() {
    $.fn.stdtoggle = old
    return this
  }

  $(document)
    .on(toggleDown, toggleElement, downEvent)
    .on(toggleMouseup, toggleElement, mouseupEvent)
    .on(toggleKeydown, toggleElement, keydownEvent)

  $(window).on('load', function() {
    $(toggleElement).stdtoggle()
  })

}(window.jQuery);
