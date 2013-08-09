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
  var dataLabelOn = 'label-on'
  var dataLabelOff = 'label-off'

  // Events
  var toggleCallbackOn = 'on.bs.toggle'
  var toggleCallbackOff = 'off.bs.toggle'

  var toggleFocus = 'focus.bs.toggle'
  var toggleBlur = 'blur.bs.toggle'
  var toggleKeydown = 'keydown.bs.toggle'
  var toggleMousedown = 'mousedown.bs.toggle'
  var toggleMousemove = 'mousemove.bs.toggle'
  var toggleMouseup = 'mouseup.bs.toggle'
  var toggleMouseleave = 'mouseleave.bs.toggle'
  var toggleMouseupDataApi = 'mouseup.bs.toggle.data-api'

  var toggleTouchstart = 'touchstart.bs.toggle'
  var toggleTouchmove = 'touchmove.bs.toggle'
  var toggleTouchend = 'touchend.bs.toggle'

  var touchSupport = ('ontouchstart' in document.documentElement)

  var downEvent = (touchSupport) ? toggleTouchstart : toggleMousedown
  var moveEvent = (touchSupport) ? toggleTouchmove : toggleMousemove
  var endEvent = (touchSupport) ? toggleTouchend : toggleMouseleave

  var toggleActiveClassName = 'on'
  var toggleDraggingClassName = 'toggle-dragging'
  var toggleTargetClassName = 'toggle-target'

  var toggleLabel = '.toggle-label'
  //Default label text
  var dataLabelOnTextDefault = 'ON'
  var dataLabelOffTextDefault = 'OFF'

  var toggleIcon = '.toggle-icon'
  var toggleIconOnClassName = 'icon-ok'
  var toggleIconOffClassName = 'icon-remove'

  var toggleCallbacks = {
    'true': toggleCallbackOn,
    'false': toggleCallbackOff
  }

  var toggleIconClassNames = {
    'true': toggleIconOnClassName,
    'false': toggleIconOffClassName
  }

  var Toggle = function(element) {
    var $el = $(element)
    $el.each(function() {
      var $this = $(this)
      var $btn = $this.find('.btn')
      var data = $this.data(toggleBase)
      var val = data === true

      $this.on(toggleFocus, function(e) {
        if ($this.is('.disabled, [disabled]')) return
        // TODO: make clear that bind which key to trigger toggle when press 'tab' key and focus on toggle
        //       Current are: Enter & Space
        $this.on(toggleKeydown, function(e) {
          if (/(13|32)/.test(e.keyCode)) {
            e.preventDefault()
            $this.addClass(toggleTargetClassName)
            $this.trigger(toggleMouseup)
          }
        })
      })

      $this.on(toggleBlur, function(e) {
        console.log(1)
        $this.off(toggleKeydown)
      })

      var dragging = false
      var relativeX, currentElRight
      var maxMove = $this.width() - $btn.width()


      $this.on(downEvent, function(e) {
        $this.addClass(toggleTargetClassName)
        
        if (e.target.className.indexOf('btn') == -1) return
        if ($this.is('.disabled, [disabled]')) return

        currentElRight = parseInt($btn.css('right'), 10)
        dragging = true
        relativeX = e.pageX || e.originalEvent.targetTouches[0].pageX

        $this.on(moveEvent, function(e) {

          if (e.target.className.indexOf('btn') == -1) return
          if ($this.is('.disabled, [disabled]')) return

          e.preventDefault()

          if (dragging) {
            var pageX = e.pageX || e.originalEvent.targetTouches[0].pageX
            $this.addClass(toggleDraggingClassName)

            currentElRight = currentElRight + relativeX - pageX;

            if (currentElRight < 0) currentElRight = 0
            if (currentElRight > maxMove) currentElRight = maxMove

            $btn.css('right', currentElRight + 'px')
            relativeX = pageX

          }
        })

        $this.on(endEvent, function(e) {
          $this.off(endEvent)
          if (dragging) $this.trigger(toggleMouseup)
        })
      })

      $this.on(toggleMouseup, function(e) {

        if (dragging) {
          dragging = false
          $this.off(toggleMousemove)
          $btn.css('right', '')
        }

        if ($this.hasClass(toggleDraggingClassName)) {
          var val = (currentElRight > maxMove / 2)
          setToggle($this, val)
        }

      })

      setToggle($this, val)
    })
  }

  Toggle.prototype.toggle = function(e) {

    var $this = $(this)

    if ($this.is('.disabled, [disabled]')) return

    if ($this.hasClass(toggleDraggingClassName)) {
      $this.removeClass(toggleDraggingClassName)
      return
    }

    if ($this.hasClass(toggleTargetClassName)) {
      $this.removeClass(toggleTargetClassName)
    } else {
      return
    }

    e.stopPropagation()

    var val = !$this.data(toggleBase)
    var valKey = val.toString()

    setToggle($this, val).trigger(toggleCallbacks[valKey])

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

    if ($this.is(toggleLabel)) {
      var dataLabelOnText = $this.data(dataLabelOn)
      var dataLabelOffText = $this.data(dataLabelOff)

      var toggleLabelTexts = {
        'true': (dataLabelOnText) ? dataLabelOnText : dataLabelOnTextDefault,
        'false': (dataLabelOffText) ? dataLabelOffText : dataLabelOffTextDefault
      }

      $this.find('.btn').text(toggleLabelTexts[valKey])
    }

    if ($this.is(toggleIcon)) $this.find('.btn').addClass(toggleIconClassNames[valKey]).removeClass(toggleIconClassNames[valOppositeKey])

    return $this;
  }

  // STANDARD TOGGLE DATA-API
  // ===============

  $(document)
    .on(toggleMouseupDataApi, toggleClass, Toggle.prototype.toggle)

  $(window).on('load', function() {
    var toggleEntity = new Toggle(toggleClass)
  })

}(window.jQuery);