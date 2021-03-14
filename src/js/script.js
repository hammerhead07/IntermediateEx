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
      jQuery("#" + ariaControls).attr("aria-hidden", "true");
    }

    if (jQuery(this).attr("aria-expanded") === "true") {
      jQuery(this).attr("aria-expanded", "false");
    } else {
      jQuery(this).attr("aria-expanded", "true");
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

  /* 電話リンク */
  let ua = navigator.userAgent;
  if (ua.indexOf("iPhone") < 0 && ua.indexOf("Android") < 0) {
    jQuery('a[href^="tel:"]')
      .css("cursor", "default")
      .on("click", function (e) {
        e.preventDefault();
      });
  }

  /* ヘッダ */
  jQuery(window).on('load scroll', function () {
    if (jQuery('body').hasClass('home')) {
      const headerHeight = jQuery('.js-header').height();
      let position = jQuery(this).scrollTop();
      if (position > headerHeight * 1.1) {
        jQuery('.js-header').addClass('fixed');
        jQuery('.js-header').find('img').attr('src', './img/logo02.png')
      } else {
        jQuery('.js-header').removeClass('fixed');
        jQuery('.js-header').find('img').attr('src', './img/logo01.png')
      }
    } else {
      jQuery('.js-header').find('img').attr('src', './img/logo02.png')
    }
  });

  /* 画像スライダー */
  slider();

  /* モーダル */
  jQuery('.js-modal').on('click', function (e) {
    e.preventDefault();
    const target = jQuery(this).data('target');
    if (jQuery(`.${target}`).hasClass('open')) {
      jQuery(`.${target}`).fadeOut(300).removeClass('open');
    } else {
      jQuery(`.${target}`).fadeIn(300).addClass('open');
    }
    return false;
  });
});

/* トップページMV画像の切り替え b5y https://wemo.tech/1653 */
function slider() {
  const slide = jQuery('.fv-slider');
  const slideItems = slide.children('.fv-slider__img');
  const totalNum = slideItems.length - 1;
  const fadeTime = 2000;
  const IntervalTime = 5000;
  let actNum = 0, nowSlide, nextSlide;

  jQuery(slideItems[0]).addClass('show_ zoom_'); /* 最初に１枚めをフェードイン */
  setInterval(() => {
    nowSlide = slideItems[actNum];
    nextSlide = slideItems[(actNum < totalNum ? ++actNum : actNum = 0)];

    jQuery(nowSlide).removeClass('show_');
    jQuery(nextSlide).addClass('show_ zoom_');

    setTimeout(() => {
      jQuery(nowSlide).removeClass('zoom_');
    }, fadeTime);
  }, IntervalTime);
}
