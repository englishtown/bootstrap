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
  var toggleMousedown = 'mousedown.bs.toggle'
  var toggleMousemove = 'mousemove.bs.toggle'
  var toggleMouseup = 'mouseup.bs.toggle'
  var toggleMouseleave='mouseleave.bs.toggle'
  var toggleMouseupDataApi = 'mouseup.bs.toggle.data-api'

  var toggleActiveClassName = 'on'
  var toggleDraggingClassName = 'toggle-dragging'
  var toggleOnDragClassName = 'toggle-ondrag'

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
    //TODO: trigger $.fn.toggle via JAVASCRIPT if necessary in the future
    //var $el = $(element).on('click.bs.toggle', this.toggle)
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
        if (/(13|32)/.test(e.keyCode)) $this.trigger(toggleMouseup)
      })

      var dragging = false
      var relativeX, currentElRight
      var maxMove = $this.width() - $btn.width()


      $this.on(toggleMousedown, function(e) {
        $this.addClass(toggleOnDragClassName)
        if (e.target.className.indexOf('btn') == -1) return

        currentElRight = parseInt($btn.css('right'), 10)
        dragging = true
        relativeX = e.pageX

        $this.on(toggleMousemove, function(e) {
          if (e.target.className.indexOf('btn') == -1) return

          if (dragging) {
            console.log('mousemove')
            $this.addClass(toggleDraggingClassName)

            currentElRight = currentElRight + relativeX - e.pageX;

            if (currentElRight < 0) currentElRight = 0
            if (currentElRight > maxMove) currentElRight = maxMove

            $btn.css('right', currentElRight + 'px')
            relativeX = e.pageX

          }
        })

        $this.on(toggleMouseleave, function(e) {
          $this.off(toggleMouseleave)
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

    if ($this.hasClass(toggleOnDragClassName)) {
      $this.removeClass(toggleOnDragClassName)
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