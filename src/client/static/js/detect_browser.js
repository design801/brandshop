!(function () {
    var isChrome = !!window.chrome && !!window.chrome.webstore,
    isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    isFirefox = typeof InstallTrigger !== 'undefined',
    isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    isIE = /*@cc_on!@*/false || !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia,
    isBlink = (isChrome || isOpera) && !!window.CSS;
  
    if (isChrome) {
      document.querySelector('body').classList.add('chrome');
    }
    else if (isOpera) {
      document.querySelector('opera').classList.add('opera');
    }
    else if (isIE) {
      document.querySelector('body').classList.add('ie');
    }
    else if (isEdge) {
      document.querySelector('body').classList.add('edge');
    }
    else if (isFirefox) {
      document.querySelector('body').classList.add('firefox');
    }
    else if (isBlink) {
      document.querySelector('body').classList.add('blink');
    }
  })();