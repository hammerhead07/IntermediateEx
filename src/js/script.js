// ローディング判定
jQuery(window).on("load", function () {
  jQuery("body").attr("data-loading", "true");
});

jQuery(function () {
  // スクロール判定
  jQuery(window).on("scroll", function () {
    let scrollTop = jQuery(this).scrollTop();
    let windowHeight = jQuery(this).height();
    let documentHeight = jQuery(document).height();

    if (100 < scrollTop) {
      jQuery("body").attr("data-scroll", "true");
    } else {
      jQuery("body").attr("data-scroll", "false");
    }

    if (documentHeight - (windowHeight + scrollTop) <= 0) {
      jQuery("body").attr("data-scroll-bottom", "true");
    } else {
      jQuery("body").attr("data-scroll-bottom", "false");
    }
  });

  /* ドロワー */
  jQuery(".js-drawer").on("click", function (e) {
    e.preventDefault();
    let targetClass = jQuery(this).attr("data-target");
    let ariaControls = jQuery(this).attr("aria-controls");
    jQuery("." + targetClass).toggleClass("is-checked");

    if (jQuery("#" + ariaControls).attr("aria-hidden") === "true") {
      jQuery("#" + ariaControls).attr("aria-hidden", "false");
    } else {
      jQuery("#" + ariaControls).attr("aria-hidden", "ture");
    }

    if (jQuery(this).attr("aria-expanded") === "true") {
      jQuery(this).attr("aria-expanded", "false");
    } else {
      jQuery(this).attr("aria-expanded", "ture");
    }
    return false;
  });

  /* スムーススクロール */
  jQuery('a[href^="#"]').click(function () {
    let header = jQuery("#header").height();
    let speed = 300;
    let id = jQuery(this).attr("href");
    let target = jQuery("#" == id ? "html" : id);
    let position = jQuery(target).offset().top - header;
    if ("fixed" !== jQuery("#header").css("position")) {
      position = jQuery(target).offset().top;
    }
    if (0 > position) {
      position = 0;
    }
    jQuery("html, body").animate(
      {
        scrollTop: position
      },
      speed
    );
    return false;
  });

  // accordion を閉じておく
  /* jQueryが動作しなかった場合のためにCSSではdisplay none をせずにjqueryで閉じる */
  $('.js-accordion').each(function (index, element) {
    $(this).next().hide();
    $(this).addClass('-close');
  });
  // accordion
  $('.js-accordion').click(function () {
    $target = $(this).data("target");
    $(this).nextAll('.' + $target).slideToggle();
    $(this).toggleClass('-close');
  });

  /* 電話リンク */
  let ua = navigator.userAgent;
  if (ua.indexOf("iPhone") < 0 && ua.indexOf("Android") < 0) {
    jQuery('a[href^="tel:"]')
      .css("cursor", "default")
      .on("click", function (e) {
        e.preventDefault();
      });
  }


  // form の入力チェックを要整理

  /* formの入力確認 */
  let $submit = jQuery('#js-submit');
  jQuery('#js-form input, #js-form textarea').on('keyup', function () {
    if (
      jQuery('#js-form input[name="name"]').val() !== "" &&
      jQuery('#js-form input[type="email"]').val() !== "" &&
      jQuery('#js-form textarea').val() !== ""
    ) {
      // すべて入力されたとき
      $submit.prop('disabled', false);
    } else {
      // 入力されていないとき
      $submit.prop('disabled', true);
    }
  })

  // form validation
  (function() {
    var requireFlg = false;
    var privacyFlg = false;
    var $require = $( '#js-form .js-require' );
    var fillCount = 0;

    function setSubmitProp() {
      if( requireFlg && privacyFlg ) {
        $( '#js-submit' ).prop( 'disabled', false );
      } else {
        $( '#js-submit' ).prop( 'disabled', true );
      }
    }

    // 必須項目
    $require.on( 'blur', function() {
      if( $( this ).attr( 'id' ) === 'js-formKana' && !$( this ).val().match( /^([ァ-ン]|ー)+$/ ) ) {
        $( this ).val( '' );
        alert( '全角カタカナで入力してください。' )
      }

      $require.each( function() {
        var value = $( this ).val();

        if( ( value !== '' && value.match( /[^\s\t]/ ) ) ) {
          fillCount++;
        }
      });

      requireFlg = ( fillCount === $require.length ? true : false );

      setSubmitProp();
      fillCount = 0;
    });

    // プライバシーポリシー
    $( '#form-privacy' ).on( 'change', function() {
      privacyFlg =  ( $( this ).prop( 'checked' ) ? true : false );
      setSubmitProp();
    });

    // 送信時
    $( '#js-form' ).on( 'submit', function() {
      if( !( requireFlg && privacyFlg ) ) {
        alert( '入力に誤りがあります。' );
        return false;
      }
    });
  })();

});
