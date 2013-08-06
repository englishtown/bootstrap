/* ========================================================================
* Bootstrap-ef: sdtoogle.js v1.0
* For button group toggle of EF project only
* ======================================================================== */

(function($) { "use strict";

  $(function(){
    $('.toggle-btn-group').on('click', '.btn', function(e){
      $(this)
        .addClass('active')
        .siblings().removeClass('active')
    })
  })
})(window.jQuery)