let baseW = 920;	//基準となるブレークポイント
let sppoint = 768;	//基準となるブレークポイント
let iOSviewportW = 0;
let ua = navigator.userAgent.toLowerCase();
let isiOS = (ua.indexOf("iphone") > -1) || (ua.indexOf("ipod") > -1) || (ua.indexOf("ipad") > -1);
if (isiOS) {
  iOSviewportW = document.documentElement.clientWidth;
}
function updateMetaViewport() {
  let viewportContent;
  let w = window.outerWidth;
  if (isiOS) {
    w = iOSviewportW;
  }
  if (w < sppoint) {
    viewportContent = "width=device-width,user-scalable=no,shrink-to-fit=yes";
  } else if (w < baseW) {
    viewportContent = "width=" + baseW + "px,user-scalable=no,shrink-to-fit=yes";
  } else {
    viewportContent = "width=device-width,user-scalable=no,shrink-to-fit=yes";
  }
  document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent);
}
//イベントハンドラ登録
window.addEventListener("resize", updateMetaViewport, false);
window.addEventListener("orientationchange", updateMetaViewport, false);
//初回イベント強制発動
let ev = document.createEvent("UIEvent");
ev.initEvent("resize", true, true)
window.dispatchEvent(ev);
